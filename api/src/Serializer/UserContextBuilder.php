<?php

namespace App\Serializer;

use ApiPlatform\Core\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use App\Entity\User;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Role\RoleHierarchyInterface;
use Symfony\Component\Security\Core\Role\Role;

final class UserContextBuilder implements SerializerContextBuilderInterface
{
    private $decorated;
    private $authorizationChecker;
    private $roleHierarchy;

    public function __construct(SerializerContextBuilderInterface $decorated, AuthorizationCheckerInterface $authorizationChecker, RoleHierarchyInterface $roleHierarchy)
    {
        $this->decorated = $decorated;
        $this->authorizationChecker = $authorizationChecker;
        $this->roleHierarchy = $roleHierarchy;
    }

    public function createFromRequest(Request $request, bool $normalization, ?array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $resourceClass = $context['resource_class'] ?? null;

        $roles = $this->getLambdaRoles($this->roleHierarchy->getReachableRoles([new Role('ROLE_ADMIN')]));

        if ($resourceClass === User::class && isset($context['groups']) && $this->authorizationChecker->isGranted('ROLE_USER')) {
            foreach ($roles as $key => $val) {
                if ($this->authorizationChecker->isGranted(strtoupper($val))) {
                    if ($normalization) {
                        $context['groups'] = $val;
                    } else {
                        $context['groups'][] = $val;
                    }
                }
            }
        }

        return $context;
    }

    public function getLambdaRoles(Array $roles): array
    {
        foreach ($roles as $key => $val) {
            if (in_array($val->getRole(), ['ROLE_ADMIN', 'ROLE_USER'])) {
                unset($roles[$key]);
                continue;
            }
            $roles[$key] = strtolower($val->getRole());
        }

        return $roles;
    }
}
