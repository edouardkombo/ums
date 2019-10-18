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
use Gedmo\Mapping\Annotation as Gedmo;

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
 *          "api_genders_users_get_subresource"={"security"="has_role('ROLE_ADMIN')"}
 *      }    
 * )
 * @ORM\Entity(repositoryClass="App\Repository\GenderRepository")
 * @ORM\Table(name="genders")
 * @Gedmo\TranslationEntity(class="App\Entity\Translation\GenderTranslation")
 * @UniqueEntity(
 *     fields={"name"},
 *     message="entity.gender.name.already.exists"
 * )
 */
class Gender
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
     * @Gedmo\Translatable
     * @ORM\Column(type="string", length=20)
     * @Assert\Regex(
     *     pattern="/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/",
     *     match=true,
     *     message="entity.gender.name.invalid"
     * )
     */
    private $name;

    /**
    * @ORM\OneToMany(targetEntity="App\Entity\User", mappedBy="gender")
    * @ApiSubResource(maxDepth=1)
    */
    private $users;
  
    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     * @Gedmo\Slug(fields={"name"})
     */
    private $slug;
  
    /**
     * @var Locale
     *
     * @Gedmo\Locale
     */
    private $locale;

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
            $user->setGender($this);
        }
        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getGender() === $this) {
                $user->setGender(null);
            }
        }
        return $this;
    }
  
    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }
  
    public function getLocale(): ?string
    {
        return $this->locale;
    }

    public function setLocale(string $locale): self
    {
        $this->locale = $slug;

        return $this;
    }
}