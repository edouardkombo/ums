# ums
Micro-services architecture using Api-platform + Symfony4 + React + VueJs

# Welcome !

The purpose of this project is to build a small user management template in microservices with good practices and predictability pattern for a more efficient use of generators.

I believe unpredictability is dangerous, and the role of a Head Of Development / CTO / Dev Team Leader is to find predictable patterns, build a well design template that will be generated instead of letting developers build code (forms, api endpoints) manually.

This microservices project is using:

 - Event-driven Api using Api-platform & Symfony 4 using REST + GraphQl
 - A back-end in React using React-admin
 - A front-end using VueJs
 - Varnish
 - Nginx
 - Http2 Proxy
 - PostgreSql
 - Docker

Each service is running using its own port and can be hosted in a separate server depending on your needs.


# Live test

To test the current code in live (Connexion is not secured, allow anyway):

 - Admin: [http://185.247.117.219:81](http://185.247.117.219:81/) 
			(email: admin@site.com / password: password123)
 - Rest Endpoint: [[http://185.247.117.219:8080/](http://185.247.117.219:8080/)] 
 - GraphQl Endpoint: [[http://185.247.117.219:8080/graphql](http://185.247.117.219:8080/graphql)] 
 - Frontend (VueJs): [[http://185.247.117.219:83](http://185.247.117.219:83)] 

As a user, you can use the admin and the frontend and modify data as you wish.

# Play with the api independently

Authentication:

    POST => http://185.247.117.219:8080/auth => {email: xxxx, password: xxxx}
    RESPONSE => {token: "xxxxxxx"}
    #Use this token in all your requests through "Authorization: Bearer _YOUR_TOKEN_"

A graphQl query example accessible to non authenticated users

    #Retrieve all genders, groups, skills
    => http://185.247.117.219:8080/graphql
    query{
     genders(first: 10){
	    edges {
	      cursor
	      node {
	        id
	        name
	      }
	    }
	    pageInfo {
	      endCursor
	      hasNextPage
	    }
	    totalCount
	  }
	  groups(first: 10){
	    edges {
	      cursor
	      node {
	        name
	      }
	    }
	    pageInfo {
	      endCursor
	      hasNextPage
	    }
	    totalCount
	  }
	  skills(first: 10){
	    edges {
	      cursor
	      node {
	        name
	      }
	    }
	    pageInfo {
	      endCursor
	      hasNextPage
	    }
	    totalCount
	  }
	}

# Security features

 1. Admin can manage everything except uploading images in administration panel (React-admin additional development)
 2. User can only access and manage its own data and relations
 3. User can retrieve his data through "/users/me" (Rest only)
 4. User comes with three basic "public" roles (ROLE_A, ROLE_B, ROLE_C) managed by the api
 5. Users with ROLE_A can retrieve everything except "email"
 6. Users with ROLE_B can retrieve everything except "username"
 7. Users with ROLE_C can retrieve everything except "telephone"
 8. NO ROLE (even admin) CAN RETRIEVE HASHED PASSWORD



## Installation guide
Download this repository somewhere in your server (eg: /var/www/{repo}).

 - cd /var/www
 - git clone https://github.com/edouardkombo/ums
 - Install Docker [https://docs.docker.com/install/](https://docs.docker.com/install/)
 - Install Docker-compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
 - Install Yarn && npm
 - cd /var/www/ums
 - docker-compose pull # Download the latest versions of the pre-built images
 - docker-compose up -d # Running in detach mode
 - docker-compose exec php bin/console doctrine:fixtures:load #Load dummy content (groups, genders, skills and admin user with (email: admin@site.com / password: password123)
 - cd client-vue
 - yarn install && yarn start (Can't manage yet to ship it with Docker, so we need to start it manually for now)
 
**IMPORTANT: Replace in the project all the occurences of  http://185.247.117.219 by your own IP** 

More infos: [https://api-platform.com/docs/distribution/](https://api-platform.com/docs/distribution/)


# Potential bugs

 1. I noticed that sometimes (randomly) when login, the api sends a 401 unauthorized with "JWT bad credentials" (resetting password through admin makes it work again)
 2. in the front and admin, I didn't implement yet a feature to detect on each query if the user token is still valid, in order to redirect to login page. As a consequence, if you are logged in too long, the token expires and when you will execute an action, it will trigger an error without logging you off.
 
 
## Author
Edouard Kombo (@edouardkombo)


