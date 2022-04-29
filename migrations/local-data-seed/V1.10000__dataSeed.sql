insert into "user" (user_type_id, username, password, email_address, forename, surname, about_me)
values (1, 'test', 'pTest', 'test_email@email.com', 'tForename', 'tSurname', 'This is a test user');

insert into "user" (user_type_id, username, password, email_address, forename, surname, about_me)
values (1, 'test2', 'pTest2', 'test2_email@email.com', 'tForename2', 'tSurname2', 'This is a test user2');

insert into genre (name)
values ('testGenre');

insert into genre (name)
values ('testGenre2');

insert into developer (name)
values ('testDev');

insert into developer (name)
values ('testDev2');

insert into publisher (name)
values ('testPub');

insert into publisher (name)
values ('testPub2');

insert into game (created_by_id, name, developer_id, publisher_id, release_date, description)
values (1, 'testGame', 1, 1, '2022-04-28', 'This is a test game');

insert into game (created_by_id, name, developer_id, publisher_id, release_date, description)
values (2, 'testGame2', 1, 1, '2022-04-28', 'This is a test game');

insert into game_genre (game_id, genre_id)
values (1, 1);

insert into game_genre (game_id, genre_id)
values (2, 1);

insert into favourite (user_id, game_id, favourite_status_id, rating)
values (1, 1, 1, '10');

insert into favourite (user_id, game_id, favourite_status_id, rating)
values (2, 2, 2, '10');

insert into comment (user_id, game_id, post, time_posted)
values (1, 1, 'This is a test post', '2022-04-29 15:39:42');

insert into comment (user_id, game_id, post, time_posted)
values (2, 2, 'This is a test post', '2022-04-29 12:42:51');