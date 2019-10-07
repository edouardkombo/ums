<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Gender;

class GenderFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $values = ['female', 'male'];

        foreach ($values as $val) {
            $entity = new Gender();
            $entity->setName($val);
            $manager->persist($entity);
        }

        $manager->flush();
    }
}
