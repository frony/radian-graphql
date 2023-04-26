include .env
.EXPORT_ALL_VARIABLES:

# Database commands

db-start:
	docker run -d -it --name ${DB_CONTAINER_NAME} -e POSTGRES_PASSWORD=${DB_PASSWORD} -p 127.0.0.1:${DB_PORT}:5432/tcp postgres

db-stop:
	docker stop ${DB_CONTAINER_NAME}
