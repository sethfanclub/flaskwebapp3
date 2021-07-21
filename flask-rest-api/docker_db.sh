sudo docker run --name postgres_db -dp 5432:5432 -e POSTGRES_PASSWORD=silverCade02 -e POSTGRES_DB=app -v ./db-data:/var/lib/postgresql/data/ postgres:13.3
