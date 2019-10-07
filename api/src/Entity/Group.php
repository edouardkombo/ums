<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\Common\Collections\Collection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Doctrine\Common\Collections\ArrayCollection;

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
 *     },
 *     subresourceOperations={
 *          "api_groups_users_get_subresource"={"security"="has_role('ROLE_ADMIN')"}
 *      }      
 * )
 * @ORM\Entity(repositoryClass="App\Repository\GroupRepository")
 * @ORM\Table(name="groups")
 * @UniqueEntity(
 *     fields={"name"},
 *     message="entity.group.name.already.exists"
 * )
 */
class Group
{
    /**
     * @var int|null
     *
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     * @ORM\Id
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=20)
     * @Assert\Regex(
     *     pattern="/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/",
     *     match=true,
     *     message="entity.group.name.invalid"
     * )
     */
    private $name;

    /**
    * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="group")
    * @ApiSubResource(maxDepth=1)
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
            $this->users[] = $user;
            $user->setGroup($this);
        }
        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getGroup() === $this) {
                $user->setGroup(null);
            }
        }
        return $this;
    }    
}