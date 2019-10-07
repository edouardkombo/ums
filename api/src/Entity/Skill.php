<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;
use \Doctrine\Common\Collections\Collection;

/**
 * @ApiResource(
 *     collectionOperations={
 *         "get",
 *         "post"={"security"="has_role('ROLE_ADMIN')"}
 *     },
 *     itemOperations={
 *         "get"={"security"="has_role('ROLE_USER')"},
 *         "put"={"security"="has_role('ROLE_ADMIN')"},
 *         "delete"={"security"="has_role('ROLE_ADMIN')"}
 *     },
 *     graphql={
 *          "query"={"security"="has_role('ROLE_USER')"},
 *          "delete"={"security"="has_role('ROLE_ADMIN')"},
 *          "update"={"security"="has_role('ROLE_ADMIN')"},
 *          "collection_query"={"security"="has_role('ROLE_ADMIN')"},
 *          "create"={"security"="has_role('ROLE_ADMIN')"}
 *     }     
 * )
 * @ORM\Entity(repositoryClass="App\Repository\SkillRepository")
 * @ORM\Table(name="skills")
 * @UniqueEntity(
 *     fields={"name"},
 *     message="entity.skill.name.already.exists"
 * )
 */
class Skill
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\Regex(
     *     pattern="/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/",
     *     match=true,
     *     message="entity.skill.name.invalid"
     * )
     */
    private $name;

    /**
    * @ORM\ManyToMany(targetEntity="App\Entity\User", mappedBy="skills")
    */
    private $users;
    
    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->addSkill($this);        
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeSkill($this);
        }

        return $this;
    }
}
