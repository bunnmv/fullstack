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
        
Make sure you have Docker and Docker Compose installed. After, move to the project backed directory (where the docker-compose.yml is) and run docker-compose up. That's it! You should see in the console that two docker containers are running, both the backend and db. 

`cd backend`

`docker-compose up`

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
- number
- type (HOME or MOBILE)

# PostgreSQL init-db
   
Inside the docker image for postgress there is a script that runs automatically upon first initialization of the container, or on every initiazation that is observed that the database is empty. For our benefit it was used this script to run another script that creates the tables automatically from a .sql pg-dump file. Hence, on the first try it will ran automatically but to update changes on the tables and initialization values it will be required that the script is ran again. In order to do so, it is required that the folder "data" is removed. This folder is a volume created on the docker image that matches the posgres db folder inside the docker, hence, removing it on the host, ( OS ) will also remove it inside the docker, which will in turn run the scritp on the first initialization since the db is empty.

A few useful commands are: 

`sudo rm -rf ./data/postgres/` # to remove the postgres folder in the host

`docker-compose rm -f` # to remove the docker images

# Node.js

The image copies the files from the host working directory and install the required dependencies based on the package.json file. Then, it runs an script that waits for the db to be prepared for connections before starting the server, the "wait-db.js" file. 

A few useful commands are: 

`docker-compose rm -f` # to remove the postgres folder in the host

`docker-compose build --no-cache` # to build the images without cached data. Hence, it forces a new build from scrath which takes longer but makes sure that any modification on the files are correctly updated to the images.

