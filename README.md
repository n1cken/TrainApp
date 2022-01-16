# Trainapp

## Techincal overview

### Frameworks
*To Be Written*

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
*To Be Written*

### Run & build with docker
*To be Updated*
When we `build` for production, we are using an [nginx:lts-alpine](https://hub.docker.com/_/nginx) to achive both a smaller and easier to maintain image.

```bash
$ cd vuefrontend
$ docker build -t <image> .
$ docker run -p 80:80 <image>
```

#### Frontend Image
Due to the current project setup, it isn't possible to change the `VUE_APP_API_URL` varaible after the image is built. If you want to change the variable, the image need to be built with `--build-arg` option when building.
```bash
docker build --build-arg VUE_APP_API_URL={url} -t {tag} .
```
Default will be `http://api.trainapp.letnh.dev`

#### Backend Image
When restarting the backend docker image the database will always be reseeded

### Deployment
*To Be Written*
