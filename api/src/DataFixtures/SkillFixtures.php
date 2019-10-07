<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\Skill;

class SkillFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $values = ['unemployed', 'manager'];

        foreach ($values as $val) {
            $entity = new Skill();
            $entity->setName($val);
            $manager->persist($entity);
        }
        
        $manager->flush();
    }
}
