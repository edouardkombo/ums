<?php

namespace App\Repository;

use App\Entity\Locale;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

final class LocaleRepository
{
    private $repository;
  
    /**
     * @var string
     */
    private $parametersDefaultLocale;
  
    /**
     * @var array
     */
    private $parametersAvailableLocales;
  
    public function __construct(string $parametersDefaultLocale, array $parametersAvailableLocales, EntityManager $entityManager)
    {
        //parent::__construct($registry, Locale::class);
        $this->repository = $entityManager->getRepository(Locale::class);
        $this->parametersDefaultLocale = $parametersDefaultLocale;
        $this->parametersAvailableLocales = $parametersAvailableLocales;
    }
  
    /**
     * Return defaultLocale code
     * @return string
     */
    public function getDefaultLocale()
    {
        $defaultLocale = $this->parametersDefaultLocale;
        $dbDefaultLocale = $this->repository->findOneBy(array('isDefault'=>true));
        if($dbDefaultLocale){
            $defaultLocale = $dbDefaultLocale->getCode();
        }
        return $defaultLocale;
    }
  
    /**
     * Return array of availableLocale code
     * @return array
     */
    public function getAvailableLocales()
    {
        $qb = $this->repository->createQueryBuilder('l');
        $qb->select('l.code AS locales');
        $result = $qb->getQuery()->getResult();
        $availableLocales = array_map(function($el){ return $el['locales']; }, $result);
        if(empty($availableLocales)){
            $availableLocales = $this->parametersAvailableLocales;
        }
        return $availableLocales;
    }
}