package user

import (
	validator "TecBook/utils"

	val2 "github.com/go-playground/validator/v10"
	"github.com/go-sql-driver/mysql"
)

type RegisterRequest struct {
	Username       string `validate:"required,alphanum,min=3,max=16"`
	Password       string `validate:"required,min=3,max=16"`
	RepeatPassword string `validate:"required,eqfield=Password"`
}

func Register(r RegisterRequest) string {
	err := validator.Myvalidator.Struct(r)

	if err != nil {
		for _, e := range err.(val2.ValidationErrors) {
			return e.Translate(validator.Trans)
		}
	}

	_, err = db.Exec(`insert into users (username, password) values (?, ?)`, r.Username, r.Password)
	if err != nil {
		if err.(*mysql.MySQLError).Number == 1062 {
			return "username already exists"
		}
		panic(err)
	}
}
