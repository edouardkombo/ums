<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\Common\Collections\ArrayCollection;
use \Doctrine\Common\Collections\Collection;
use App\DBAL\Types\GenderType;
use App\DBAL\Types\GroupsType;
use Fresh\DoctrineEnumBundle\Validator\Constraints as DoctrineAssert;
use ApiPlatform\Core\Annotation\ApiSubresource;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"user_get"}},
 *     denormalizationContext={"groups"={"user_create"}},
 *     collectionOperations={
 *         "get"={"security"="has_role('ROLE_ADMIN')"},
 *         "post"
 *     },
 *     itemOperations={
 *         "get"={"access_control"="is_granted('MINE', previous_object)"},
 *         "put"={"access_control"="is_granted('MINE', previous_object)"},
 *         "delete"={"access_control"="is_granted('MINE', previous_object)"}
 *     },
 *     graphql={
 *          "query"={"access_control"="is_granted('MINE', previous_object)"},
 *          "delete"={"access_control"="is_granted('MINE', previous_object)"},
 *          "update"={"access_control"="is_granted('MINE', previous_object)"},
 *          "collection_query"={"access_control"="is_granted('MINE', previous_object)"},
 *          "create"
 *     },
 *     subresourceOperations={
 *          "api_users_skills_get_subresource"={"access_control"="is_granted('MINE', previous_object)"},
 *          "api_users_image_get_subresource"={"access_control"="is_granted('MINE', previous_object)"}
 *      }     
 * )
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ORM\Table(name="users")
 * @UniqueEntity(
 *     fields={"email"},
 *     message="entity.user.email.already.exists"
 * )
 */
class User implements UserInterface
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
     *     message="entity.user.firstname.invalid"
     * )
     * @Groups({"user_get","user_create","role_a","role_b","role_c"})
     */
    private $firstname;
    
    /**
     * @ORM\Column(type="string", length=50)
     * @Assert\Regex(
     *     pattern="/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/",
     *     match=true,
     *     message="entity.user.lastname.invalid"
     * )
     * @Groups({"user_get","user_create","role_a","role_b","role_c"})
     */
    private $lastname;
    
    /**
     * @ORM\Column(type="string", length=255, unique=true)
     * @Assert\Email(
     *     message="entity.user.email.invalid"
     * )
     * @Groups({"user_get","user_create","role_b","role_c"})
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=25, unique=true)
     * @Assert\Regex(
     *     pattern="/^[A-Za-z0-9_]$/",
     *     match=false,
     *     message="entity.user.username.invalid"
     * )
     * @Groups({"user_get","user_create","role_a","role_c"})
     */
    private $username;    

    /**
     * @ORM\Column(type="datetime")
     * @Assert\DateTime(
     *     message="entity.user.dob.invalid"
     * )
     * @Assert\LessThanOrEqual("-18 years")
     * @Groups({"user_get","user_create","role_a","role_b","role_c"})
     */
    private $dob;

    /**
     * @ORM\Column(type="string",length=12)
     * @Assert\Regex(
     *     pattern="/[^0-9]/",
     *     match=false,
     *     message="entity.user.telephone.invalid"
     * )
     * @Groups({"user_get","user_create","role_a","role_b"})
     */
    private $telephone;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(
     *     pattern="/^(?=.*[a-z])(?=.*\\d).{6,}$/i",
     *     match=false,
     *     message="entity.user.password.invalid"
     * )
     * @Groups({"user_create"})
     */
    private $password;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    private $isActive;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Gender", inversedBy="users")
     * @ORM\JoinColumn(nullable=true) 
     * @Groups({"user_get","user_create","role_a","role_b","role_c"})
     */
    private $gender;

    /**
     * We don't want to expose the internal user roles publicly (User, admin etc...)
     * We then add the custom roles (those defined by customers), "ROLE_A,ROLE_B,ROLE_C"
     * 
     * @ORM\ManyToOne(targetEntity="App\Entity\Group", inversedBy="users")
     * @ORM\JoinColumn(nullable=true) 
     * @Groups({"user_get","user_create","role_a","role_b","role_c"})
     */
    private $group;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Skill", inversedBy="users")
     * @ORM\JoinTable(
     *     name="user_skill",
     *     joinColumns={
     *         @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="skill_id", referencedColumnName="id")
     *     }
     * )
     * @ApiSubresource
     * @Groups({"user_get","user_create","role_a","role_b","role_c"}) 
     */
    private $skills;

    /**
     * @ORM\Column(type="json_array")
     */
    private $roles = array();

    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiSubResource
     * @ApiProperty(iri="http://schema.org/image")
     * @Groups({"user_get","user_create","role_a","role_b","role_c"}) 
     */
    public $image;

    public function __construct()
    {
	    $this->isActive = true;
        $this->skills = new ArrayCollection();
    }	    

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        $this->username = $email;

        return $this;
    }

    public function getDob(): ?\DateTimeInterface
    {
        return $this->dob;
    }

    public function setDob(\DateTimeInterface $dob): self
    {
        $this->dob = $dob;

        return $this;
    }

    public function getTelephone(): ?string
    {
	    return $this->telephone;    
    }

    public function setTelephone(string $telephone): self
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername(String $username): self
    {
        $this->username = $username;

        return $this;    
    }	    

    public function getSalt()
    {
        return null;
    }

    public function getPassword(): ?string
    {
	    return $this->password;    
    }

    public function setPassword(String $password): self
    {
	$this->password = $password;

        return $this;	
    }

    public function getIsActive(): ?string
    {
	    return $this->isActive;   
    }

    public function setIsActive(Bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getGender(): ?Gender
    {
        return $this->gender;
    }

    public function setGender(?Gender $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getGroup(): ?Group
    {
        return $this->group;
    }

    public function setGroup(?Group $group): self
    {
        $this->group = $group;

        //Add group name to internal roles
        $this->setRoles([$group->getName()]);

        return $this;
    } 

    public function getRoles(): ?array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        // allows for chaining
        return $this;
    }    

    public function eraseCredentials()
    {
    }


    /**
     * @return Collection|Skill[]
     */
    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): self
    {
        if (!$this->skills->contains($skill)) {
            $this->skills->add($skill);
            $skill->addUser($this);        
        }

        return $this;
    }

    public function removeSKill(Skill $skill): self
    {
        if ($this->skills->contains($skill)) {
            $this->skills->removeElement($skill);
            $skill->removeUser($this);
        }
        
        return $this;
    }

    public function getImage(): ?MediaObject
    {
	    return $this->image;   
    }

    public function setImage(?MediaObject $image): self
    {
        $this->image = $image;

        return $this;
    }
}
