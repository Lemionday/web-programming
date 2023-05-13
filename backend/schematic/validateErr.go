package schematic

import "github.com/go-playground/validator/v10"

var validate = validator.New()

type ErrorValidate struct {
	FailedField string
	Tag         string
	Value       string
}
