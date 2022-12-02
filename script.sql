Create database proyecto_programacion_web;
Create table users(
	id varchar(255) NOT NULL PRIMARY KEY,
    username varchar(255),
    password varchar(255),
    registered datetime,
    last_login datetime
);