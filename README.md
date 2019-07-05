# fullstack

Fully functional user operations CRUD application developed on Node.js, React.js and PostgreSQL and docked with docker compose. React.js is built with react-creat-app and the static files are served on Node.js while communicating with a database service that uses the Postgress image.

# Installation

Clone, or download the project directory.

# Usage
    fullstack/
    ├── backend/
      ├── docker-compose.yml      # Docker compose file responsible for creating the backend and database images.
      ├── Dockerfile              # Dockerfile responsible for controlling the Node.js image.
      ├── src/                    # Source files (alternatively `lib` or `app`)
        ├── build                 # React.js static files after build
        ├── config                # Express, Server and database config files
        ├── controllers           # Database tables controllers (Here the SQL queries are executed)
        ├── services              # Express services and midlewares for the REST API
        └── routes                # Express routes that matches user requests to API calls
        
Make sure you have Docker and Docker Compose installed. After, move to the project backed directory (where the docker-compose.yml is) and run docker compose up. That's it! You should see in the console that two docker containers are running, both the backend and db. 

- Node.js       -> PORT      - 4000
- Postgress SQL -> PORT      - 5432

# TRY IT!
Visit http://localhost:4000/ and you should see the application running. Ready to play around!!

# Database

Bellow are listed the user tables:

USER
- name
- CPF
- email
- Day of Birth
- Date added

ADDRESS
- street
- zipcode
- neighborhood
- city
- State

PHONE
- cellphone and/or phone

# Database table commands

    # create database named fullstack
    
    create database fullstack;

- Create user table (NOTE: "user" with "" because user is a reserved keyword for the users table inside postgres
    
        create table "user"
        (
            name       varchar(30)               not null,
            email      varchar(30)               not null,
            cpf        varchar(14)               not null,
            id         serial                    not null
                constraint user_pk
                    primary key,
            date_added date default CURRENT_DATE not null,
            birth_date date                      not null
        );

        alter table "user"
            owner to postgres;

        create unique index user_id_uindex
            on "user" (id);

        create unique index user_cpf_uindex
            on "user" (cpf);
  
- Create phone table
    
        create table "user"
        (
            name       varchar(30)               not null,
            email      varchar(30)               not null,
            cpf        varchar(14)               not null,
            id         serial                    not null
                constraint user_pk
                    primary key,
            date_added date default CURRENT_DATE not null,
            birth_date date                      not null
        );

        alter table "user"
            owner to postgres;

        create unique index user_id_uindex
            on "user" (id);

        create unique index user_cpf_uindex
            on "user" (cpf);
            
- Create address table

        create table address
        (
            id           serial      not null
                constraint address_pk
                    primary key,
            street       varchar(50) not null,
            number       varchar(10) not null,
            zip_code     varchar(9)  not null,
            state        varchar(20) not null,
            neighborhood varchar(50) not null,
            city         varchar(50) not null,
            user_id      integer     not null
                constraint address_user_id_fk
                    references "user"
                    on delete cascade
        );

        alter table address
            owner to postgres;

        create unique index address_id_uindex
            on address (id);
