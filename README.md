<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Challenge Films for try catch
This is a challenge for project

## Docker commands
`docker rm $(docker ps -aq) && docker system prune -f` Remueve todos los contenedores
`sudo docker rmi -f $(docker images -a -q)` Remueve todas las imagenes

## Documentation at

`/api/v1/docs#/default/FilmsController_findAll`

## Watch live Docs

`http://52.202.2.211/api/v1/docs`

##
`sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <id>` inspect ip of container