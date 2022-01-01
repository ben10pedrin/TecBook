package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"

	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	"github.com/go-sql-driver/mysql"
)

func main() {
	db, _ := sql.Open("mysql", "root@(127.0.0.1:3306)/test")

	query := `
    create table if not exists users (
        id int auto_increment,
        username varchar(16) unique not null,
        password varchar(16) not null,
        primary key (id)
    );`

	db.Exec(query)

	registerTmpl := template.Must(template.ParseFiles("./templates/register.html"))

	type RegisterRequest struct {
		Username       string `validate:"required"`
		Password       string `validate:"required"`
		RepeatPassword string `validate:"required"`
	}

	v := validator.New()
	en := en.New()
	uni := ut.New(en, en)
	trans, _ := uni.GetTranslator("en")

	v.RegisterTranslation("required", trans,
		func(ut ut.Translator) error {
			return ut.Add("required", "{0} cannot be empty", true)
		},
		func(ut ut.Translator, fe validator.FieldError) string {
			t, _ := ut.T("required", fe.Field())
			return t
		})

	http.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodPost {
			req := RegisterRequest{
				Username:       r.FormValue("username"),
				Password:       r.FormValue("password"),
				RepeatPassword: r.FormValue("repeatPassword"),
			}

			err := v.Struct(req)
			for _, e := range err.(validator.ValidationErrors) {
				registerTmpl.Execute(w, e.Translate(trans))
				return
			}

			result, err := db.Exec(`insert into users (username, password) values (?, ?)`, req.Username, req.Password)
			if err != nil && err.(*mysql.MySQLError).Number == 1062 {
				registerTmpl.Execute(w, "username already exists")
				return
			}

			userID, _ := result.LastInsertId()
			fmt.Println(userID)

			http.Redirect(w, r, "https://google.com", http.StatusMovedPermanently)
		}

		registerTmpl.Execute(w, nil)
	})

	http.ListenAndServe(":80", nil)
}
