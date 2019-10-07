<?php

namespace App\EventSubscriber;

use App\Entity\User;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Event\GetResponseEVent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserSubscriber implements EventSubscriberInterface {

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;
    private $tokenStorage;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder, TokenStorageInterface $tokenStorage)
    {
	    $this->passwordEncoder = $userPasswordEncoder;
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
	        KernelEvents::VIEW => ['setPassword', EventPriorities::POST_VALIDATE],
	        KernelEvents::REQUEST => ['gqlAcl', EventPriorities::PRE_READ],
	        KernelEvents::REQUEST => ['resolveMe', EventPriorities::PRE_READ],
        ];
    }

    public function setPassword(ViewEvent $event)
    {
        $user = $event->getControllerResult();

        if ($user instanceof User && $user->getPassword()) {
            $password = $this->passwordEncoder->encodePassword($user, $user->getPassword());
            $user->setPassword($password);
        }
    }

    /**
     * ApiPlatform does not provide a contextBuilder for GraphQl yet
     * This is a dirty temporary solution for ACL with GraphQl
     */
    public function gqlAcl(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        if ('api_graphql_entrypoint' !== $request->attributes->get('_route')) {
            return;
        }

        $user = $this->tokenStorage->getToken()->getUser();
        if ($user instanceof User) {
            if (in_array('ROLE_A', $user->getRoles())) {
                $user->setEmail('');
            } else if (in_array('ROLE_B', $user->getRoles())) {
                $user->setUsername('');
            } else if (in_array('ROLE_C', $user->getRoles())) {
                $user->setTelephone('');
            }
        }
    }

    //api/users/{id} becomes api/users/me
    public function resolveMe(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        if (!in_array($request->attributes->get('_route'), ['api_users_get_item', 'api_users_put_item', 'api_users_image_get_subresource', 'api_users_skills_get_subresource'])) {
            return;
        }

        if ('me' !== $request->attributes->get('id')) {
            return;
        }

        $user = $this->tokenStorage->getToken()->getUser();

        if (!$user instanceof User) {
            return;
        }

        $request->attributes->set('id', $user->getId());
    }    
}