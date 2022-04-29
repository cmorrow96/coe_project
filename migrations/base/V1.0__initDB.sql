CREATE TABLE user_type (
	id serial PRIMARY KEY,
	"description" varchar(100)
);

CREATE TABLE "user" (
    id serial PRIMARY KEY,
    user_type_id int NOT NULL,
    username varchar(100),
	"password" varchar(100),
    email_address varchar(100),
    forename varchar(100),
    surname varchar(100),
    about_me varchar(100),
    FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

CREATE TABLE developer (
	id serial PRIMARY KEY,
	"name" varchar(100)
);

CREATE TABLE publisher (
	id serial PRIMARY KEY,
	"name" varchar(100)
);

CREATE TABLE genre (
	id serial PRIMARY KEY,
	"name" varchar(100)
);

CREATE TABLE game (
	id serial PRIMARY KEY,
	created_by_id int NOT NULL,
	"name" varchar(100),
	developer_id int NOT NULL,
	publisher_id int NOT NULL,
	release_date date,
	"description" varchar(500),
	FOREIGN KEY (created_by_id) REFERENCES "user"(id),
	FOREIGN KEY (developer_id) REFERENCES developer(id),
	FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);

CREATE TABLE game_genre (
	id serial PRIMARY KEY,
	game_id int NOT NULL,
	genre_id int NOT NULL,
	FOREIGN KEY (game_id) REFERENCES game(id),
	FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE favourite_status (
	id serial PRIMARY KEY,
	"type" varchar(25)
);

CREATE TABLE favourite (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	game_id int NOT NULL,
	favourite_status_id int NOT NULL,
	rating varchar(2),
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	FOREIGN KEY (game_id) REFERENCES game(id),
	FOREIGN KEY (favourite_status_id) REFERENCES favourite_status(id)
);

CREATE TABLE comment (
	id serial PRIMARY KEY,
	user_id int NOT NULL,
	game_id int NOT NULL,
	post varchar(500),
	time_posted timestamp,
	FOREIGN KEY (user_id) REFERENCES "user"(id),
 	FOREIGN KEY (game_id) REFERENCES game(id)
);