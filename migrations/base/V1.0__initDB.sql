CREATE TABLE user_type (
	id int NOT NULL,
	"description" varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE "user" (
	id int NOT NULL,
	user_type_id int NOT NULL,
	username varchar(100),
	email_address varchar(100),
	forename varchar(100),
	surname varchar(100),
	about_me varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

CREATE TABLE developer (
	id int NOT NULL,
	"name" varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE publisher (
	id int NOT NULL,
	"name" varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE genre (
	id int NOT NULL,
	"name" varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE game (
	id int NOT NULL,
	created_by_id int NOT NULL,
	title varchar(100),
	developer_id int NOT NULL,
	publisher_id int NOT NULL,
	release_date date,
	"description" varchar(500),
	PRIMARY KEY (id),
	FOREIGN KEY (created_by_id) REFERENCES "user"(id),
	FOREIGN KEY (developer_id) REFERENCES developer(id),
	FOREIGN KEY (publisher_id) REFERENCES publisher(id)
);

CREATE TABLE game_genre (
	id int NOT NULL,
	game_id int NOT NULL,
	genre_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (game_id) REFERENCES game(id),
	FOREIGN KEY (genre_id) REFERENCES genre(id)
);

CREATE TABLE favourite_status (
	id int NOT NULL,
	"type" varchar(25),
	PRIMARY KEY (id)
);

CREATE TABLE favourite (
	id int NOT NULL,
	user_id int NOT NULL,
	game_id int NOT NULL,
	favourite_status_id int NOT NULL,
	rating int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id),
	FOREIGN KEY (game_id) REFERENCES game(id),
	FOREIGN KEY (favourite_status_id) REFERENCES favourite_status(id)
);

CREATE TABLE comment (
	id int NOT NULL,
	user_id int NOT NULL,
	game_id int NOT NULL,
	user_text varchar(500),
	time_created timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES "user"(id),
 	FOREIGN KEY (game_id) REFERENCES game(id)
);