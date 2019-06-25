# ifx-sessioncount-check
Check informix session count and trigger alert 

How setup.

1) create env.list with relevant informix credentials and sql query
2) Build the Docker: docker-compose -f docker/docker-compose.yml build ifx-sessioncount-check
3) Run the docker : docker run -ti --rm --env-file <path to env.list> ifx-sessioncount-check:latest

