<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Group;

class GroupFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $values = ['ROLE_A', 'ROLE_B', 'ROLE_C'];

        foreach ($values as $val) {
            $entity = new Group();
            $entity->setName($val);
            $manager->persist($entity);
        }
        
        $manager->flush();
    }
}
