package database

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func SetupDatabase() {
	db, err := sql.Open("mysql", "root@(127.0.0.1:3306)/test")
	if err != nil {
		panic(err)
	}

	query1 := `
		create table if not exists users (
			id int auto_increment,
			username varchar(16) unique not null,
			password varchar(16) not null,
			primary key (id)
		);`
	_, err = db.Exec(query1)
	if err != nil {
		panic(err)
	}

	query2 := `
		create table if not exists posts (
			id int auto_increment,
			userId int,
			createdAt timestamp default current_timestamp,
			content varchar(255) not null,
			primary key (id),
			foreign key (userId) references users (id) on delete cascade on update cascade 
		);`
	_, err = db.Exec(query2)
	if err != nil {
		panic(err)
	}
}
