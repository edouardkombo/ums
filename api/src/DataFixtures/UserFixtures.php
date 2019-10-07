<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class UserFixtures extends Fixture
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;
    
    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
	    $this->passwordEncoder = $userPasswordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $entity = new User();
        $entity->setFirstname('Admin');
        $entity->setLastname('Admin');
        $entity->setUsername('admin_admin01');
        $entity->setEmail('admin@site.com');
        $entity->setDob((new \DateTime())->setDate(1986, 9, 30));
        $entity->setTelephone('79248626');
        $entity->setRoles(['ROLE_ADMIN']);

        $password = $this->passwordEncoder->encodePassword($entity, 'password123');

        $entity->setPassword($password);
        $manager->persist($entity);

        $manager->flush();
    }
}
