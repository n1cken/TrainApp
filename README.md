# Trainapp

## Project structure
 * [provisioning](./provisioning) - _Ansible-playbook for provisioning the application_
   * [group_vars](./provisioning/group_vars)
   * [templates](./provisioning/templates)
 * [backend](./backend) - _Rest API code base_
   * [node_modules](./backend/node_modules)
   * [routes](./backend/routes)
   * [db](./backend/db)
   * [scripts](./backend/scripts) - _Useful scripts for backend, such as seeding database_
 * [frontend](./frontend) - _The web client code base_
     * [public](./frontend/public)
     * [src](./frontend/src)
     * [node_modules](./frontend/node_modules)

## Frameworks
The project is built using:
- [ExpressJS](https://expressjs.com)
- [VueJS](https://vuejs.org) & [Vuetify](https://vuetifyjs.com)
- [Sqlite](https://sqlite.org) with [Sequelize](https://sequelize.org) (ORM)

The application can both be tested and deployed into production using the docker images or docker files located in either `backend` or `frontend` directory.
More information about the use of [Docker](https://docker.com) can be found [here](#run-&-build-with-docker).

### Frontend
Frotend is built using both [VueJS](https://vuejs.org) and [Vuetify](https:://vuetifyjs.com).

### Backend
Backend is built using [ExpressJS](https://expressjs.com) & [Sqlite](https://sqlite.org) our database at the moment, _might change in future_  
We are also utilising [Sequelize](https://sequelize.org) for our ORM.



## Standards
Currently there isn't really any code standard used, there is an issue that is assigned to try to utilize some standard Issue: G2-214

## Setup development Enviornment
Requirements for running the project is:
- [NodeJS](https://nodejs.org) installed.
- [NPM](https://npmjs.com) installed.
- [VueCli](https://cli.vuejs.org/) installed.

Not required but useful _tools_:
- [Ansible](https://ansible.com) - For provisioning
- [Docker](https://docker.com) or _other contianer runtimes_ - For building the images 
- [Sqlite](https://sqlite.org) - For working with sqlite.

### Run backend
1. Open [backend folder](./backend) in terminal
2. Install npm dependencies with `npm run install`
  a. Seed the database with `npm run seed`- optional
3. Start backend with `npm run serve`

### Run frontend
1. Open [frontend folder](./frontend) in terminal
2. Install npm dependencies with `npm run install`
3. Start backend with `npm run serve`

### Seeding of database
Database is seeded with help of a _simple_ script written in `JavaScript`, data is parsed with help of yml _(Not the most optimal solution, but it works)._ The script is found under `backend/scripts`.
To add data to the seeding script modify `backend/scripts/seed-data.yml`, each "object" is its own table, and there after representated.  
To run the seeding script execute `npm run seed` from the `backend` directory.  Please notice that this will *DELETE* all current data and overwrite it with the seeding data.

## Run & build with docker
The recomended way to either deploy or test the application is with [Docker](https://docker.com) or another container runtime,  due to easy of setup with containers.
There is both a [Backend](https://github.com/n1cken/TrainApp/pkgs/container/trainapp%2Fbackend) & [Frontend](https://github.com/n1cken/TrainApp/pkgs/container/trainapp%2Ffrontend) image, provided by the "developers", that will _mostly_ be a stable release.

### Backend
[Dockerfile](backend/Dockerfile)  
The backend image is built using the [nginx:lts-alpine](https://hub.docker.com/_/nginx), to achive a small and secure image without any thing extra required.  

#### Enviorment varaibles
- `PORT`: Specifed port the application will run on (default: 3000)
- `DBPATH`: Path to sqlite database (default: database/traindb.sqlite)
- `EMAIL`: Email used to send confirmation mails (default: none)
- `EMAIL_PASSWD`: Password to email used to send confirmation mails (default: none)

#### Persistent database
Database is located under `/app/${DBPATH}` in the container. To achive a presistent database over restarts mount `/app/${DBPATH}` to preferd path on host.

#### Run image
```bash
$ docker run --name trainapp-api --rm -d -p 3000:3000 ghcr.io/n1cken/trainapp/backend:latest
```

### Frontend
[Dockerfile](frontend/Dockerfile)  
The frontend image is built using a mutli-stage build with both [node:lts-alpine](https://hub.docker.com/_/node) & [nginx-stable-alpine](https://hub.docker.com/_/nginx)

#### Enviornment variables
- `VUE_APP_API_URL`: API url to backend (default: https://api.trainapp.letnh.dev) _Might not work correctly due current implementation of image_

#### Change environment variable during build
Current workaround is to build image with your own API url.
```
$ docker build --build-arg VUE_APP_API_URL=${url} -t ${tag} .
```

### Run image
```bash
$ docker run --name trainapp-web --rm -d -p 80:80 ghcr.io/n1cken/trainapp/frontend:latest
```

## Deployment
Recommended way of deployment is with Docker Images.  
There is also a [Ansible](https://ansible.com) playbook located in [provisioning](provisioning).  
That deploys the whole application on [Alpine Linux](https://alpinelinux.org) using the "Offical" images.
