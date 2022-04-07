CREATE TABLE user_type (
	id int NOT NULL,
	user_type varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE app_user (
	id int NOT NULL,
	user_type_id int NOT NULL,
	username varchar(100),
	email_address varchar(100),
	first_name varchar(100),
	surname varchar(100),
	about_me varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (user_type_id) REFERENCES user_type(id)
);

CREATE TABLE developer (
	id int NOT NULL,
	dev_name varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE publisher (
	id int NOT NULL,
	pub_name varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE genre (
	id int NOT NULL,
	genre_name varchar(100),
	PRIMARY KEY (id)
);

CREATE TABLE game (
	id int NOT NULL,
	app_user_id int NOT NULL,
	title varchar(100),
	developer_id int NOT NULL,
	publisher_id int NOT NULL,
	genre_id int NOT NULL,
	game_description varchar(500),
	PRIMARY KEY (id),
	FOREIGN KEY(app_user_id) REFERENCES app_user(id),
	FOREIGN KEY(developer_id) REFERENCES developer(id),
	FOREIGN KEY(publisher_id) REFERENCES publisher(id),
	FOREIGN KEY(genre_id) REFERENCES genre(id)
);

CREATE TABLE favourite_status (
	fav_status varchar(100),
	PRIMARY KEY (fav_status)
);

CREATE TABLE favourite (
	id int NOT NULL,
	app_user_id int NOT NULL,
	game_id int NOT NULL,
	fav_status  varchar(100),
	rating varchar(100),
	PRIMARY KEY (id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id),
	FOREIGN KEY (game_id) REFERENCES game(id),
	FOREIGN KEY (fav_status) REFERENCES favourite_status(fav_status)
);

CREATE TABLE comment (
	id int NOT NULL,
	app_user_id int NOT NULL,
	game_id int NOT NULL,
	comment_text varchar(500),
	comment_time timestamp,
	PRIMARY KEY (id),
	FOREIGN KEY (app_user_id) REFERENCES app_user(id),
 	FOREIGN KEY (game_id) REFERENCES game(id)
);