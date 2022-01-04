package main

import (
	"html/template"
	"net/http"

	validator "TecBook/utils"
)

func main() {
	validator.SetupValidator()

	fs := http.FileServer(http.Dir("static/"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	register := template.Must(template.ParseFiles("./templates/register.html"))
	login := template.Must(template.ParseFiles("./templates/login.html"))
	index := template.Must(template.ParseFiles("./templates/index.html"))

	http.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		register.Execute(w, nil)
	})

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		login.Execute(w, nil)
	})

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		index.Execute(w, nil)
	})

	http.ListenAndServe(":80", nil)
}
