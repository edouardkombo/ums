<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Security;

class UserVoter extends Voter
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, ['MINE'])
            && $subject instanceof \App\Entity\User;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        
        // if the user is anonymous, do not grant access
	    if (!$user instanceof UserInterface) {
            $uri = $_SERVER['REQUEST_URI'];
            return ('/graphql' === $uri) ? false : VoterInterface::ACCESS_DENIED;		
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'MINE':
                // logic to determine if the user can EDIT
		        // return true or false
                if ($this->security->isGranted('ROLE_ADMIN') || $subject->getId() === $user->getId()) {
                    return true;
                }
                break;
        }

        return false;
    }
}
