package validator

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	enTranslations "github.com/go-playground/validator/v10/translations/en"
)

var Myvalidator *validator.Validate
var Trans ut.Translator

func SetupValidator() {
	Myvalidator = validator.New()
	english := en.New()
	uni := ut.New(english, english)
	Trans, _ = uni.GetTranslator("en")
	enTranslations.RegisterDefaultTranslations(Myvalidator, Trans)

}
