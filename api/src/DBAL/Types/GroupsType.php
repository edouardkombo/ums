<?php
namespace App\DBAL\Types;

use Fresh\DoctrineEnumBundle\DBAL\Types\AbstractEnumType;

final class GroupsType extends AbstractEnumType
{
    public const ROLE_A = 'ROLE_A';
    public const ROLE_B = 'ROLE_B';
    public const ROLE_C = 'ROLE_C';

    protected static $choices = [
        self::ROLE_A => 'ROLE_A',
        self::ROLE_B => 'ROLE_B',
        self::ROLE_C => 'ROLE_C',
    ];
}