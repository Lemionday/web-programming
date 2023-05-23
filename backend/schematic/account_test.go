package schematic

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestAddAccounts(t *testing.T) {
	testSetup()
	admin := Account{
		Username: "admin",
		Password: "root1234",
		Center:   "adminDep",
	}

	err := AddAccount(&admin)
	assert.NoError(t, err)

	admin1, err := Authenticate(admin.Username, admin.Password)
	assert.NoError(t, err)
	assert.Equal(t, admin.Username, admin1.Username)
}
