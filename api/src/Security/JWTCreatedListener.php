<?php

namespace App\Security;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Serializer;

class JWTCreatedListener {

    /**
     * Adds additional data to the generated JWT
     *
     * @param JWTCreatedEvent $event
     *
     * @return void
     */
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        /** @var $user \AppBundle\Entity\User */
        $user = $event->getUser();

        $encoder = new JsonEncoder();
        $defaultContext = [
            AbstractNormalizer::CIRCULAR_REFERENCE_HANDLER => function ($object, $format, $context) {
                return $object->getId();
            },
        ];
        $normalizer = new ObjectNormalizer(null, null, null, null, null, null, $defaultContext);
        $serializer = new Serializer([$normalizer], [$encoder]);

        $encodedUser = $serializer->serialize($user, 'json', ['ignored_attributes' => ['password'], 'skip_null_values' => true]);

        // merge with existing event data
        /** @todo retrieve all user details dynamically without doing an additional query to the database */
        $payload = array_merge(
            $event->getData(),
            [
                'user' => [
                    'firstname' => $user->getFirstname(),
                    'lastname' => $user->getLastname(),
                    'gender' => $user->getGender()->getId(),
                    'group' => $user->getGroup()->getId(),
                    'skills' => $user->getSkills(),
                    'username' => $user->getUsername(),
                    'email' => $user->getEmail(),
                    'roles' => $user->getRoles(),
                    'telephone' => $user->getTelephone(),
                    'dob' => $user->getDob(),
                    'image' => $user->getImage(), 
                ]
            ]
        );

        $event->setData($payload);
    }
}