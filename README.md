# Trainapp

## Techincal overview

### Frameworks
The project is built using:
- [ExpressJS]()
- [VueJS]() & [Vuetify]()
- [Sqlite]() with [Sequelize]() (ORM)

The application can both be tested and deployed into production using the docker images or docker files located in either `backend` or `frontend` directory.
More information about the use of [Docker]() can be found [here](#run-&-build-with-docker).

#### Frontend
Frotend is built using both [VueJS]() and [Vuetify]().

#### Backend
Backend is built using [ExpressJS]() & [Sqlite] as database.
We are also utilising [Sequelize]() for our ORM.


### Project overview
*To Be Written*

### Standards
*To Be Written*

### Setup development Enviornment
*To be Updated*
<ol>
<li> Open intergrated terminal inside vuefrontend folder</li>
<li> "npm install"</li>
<li> "npm run serve"</li>
<li> Open intergrated terminal inside the backend folder</li>
<li> "npm install"</li>
<li> "npm run serve"</li>
</ol>

>Obs! database and frontend folder is just temporary!

#### Seeding of database
Database is seeded with help of a _simple_ script written in `JavaScript`, data is parsed with help of yml _(Not the most optimal solution, but it works)._ The script is found under `backend/scripts`.
To add data to the seeding script modify `backend/scripts/seed-data.yml`, each "object" is its own table, and there after representated.  
To run the seeding script execute `npm run seed` from the `backend` directory.  Please notice that this will *DELETE* all current data and overwrite it with the seeding data.

### Run & build with docker
The recomended way to either deploy or test the application is with [Docker](https://docker.com) or another container runtime,  due to easy of setup with containers.
There is both a [Backend](https://github.com/n1cken/TrainApp/pkgs/container/trainapp%2Fbackend) & [Frontend](https://github.com/n1cken/TrainApp/pkgs/container/trainapp%2Ffrontend) image, provided by the "developers", that will _mostly_ be a stable release.

#### Backend
[Dockerfile](backend/Dockerfile)  
The backend image is built using the [nginx:lts-alpine](https://hub.docker.com/_/nginx), to achive a small and secure image without any thing extra required.  

##### Enviorment varaibles
- PORT: Specifed port the application will run on (default: 3000)
- DBPATH: Path to sqlite database (default: database/traindb.sqlite)
- EMAIL: Email used to send confirmation mails (default: none)
- EMAIL_PASSWD: Password to email used to send confirmation mails (default: none)

##### Persistent database
Database is located under `/app/${DBPATH}` in the container. To achive a presistent database over restarts mount `/app/${DBPATH}` to preferd path on host.

##### Run image
```bash
$ docker run --name trainapp-api --rm -d -p 3000:3000 ghcr.io/n1cken/trainapp/backend:latest
```

#### Frontend
[Dockerfile](frontend/Dockerfile)  
The frontend image is built using a mutli-stage build with both [node:lts-alpine](https://hub.docker.com/_/node) & [nginx-stable-alpine](https://hub.docker.com/_/nginx)

##### Enviornment variables
- VUE_APP_API_URL: API url to backend (default: https://api.trainapp.letnh.dev) _Might not work correctly due current implementation of image_

##### Change environment variable during build
Current workaround is to build image with your own `API_URL`.
```
$ docker build --build-arg VUE_APP_API_URL=${url} -t ${tag} .
```

#### Run image
```bash
$ docker run --name trainapp-web --rm -d -p 80:80 ghcr.io/n1cken/trainapp/frontend:latest
```

### Deployment
*To Be Written*
