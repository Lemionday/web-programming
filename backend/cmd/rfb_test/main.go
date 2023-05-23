package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/database"
	"github.com/theLemionday/web-programming/schematic"
)

var (
	admin = schematic.Account{
		Username: "admin",
		Password: "root1234",
		Center:   "adminDep",
	}
)

func main() {
	config := conf.LoadTestConfig()
	database.NewConnection(config)
	database.CheckConnection()
	defer database.CloseConnection()

	temp, err := schematic.Authenticate(admin.Username, admin.Password)
	if err != nil {
		log.Println(err)
	}
	// fmt.Println(temp)
	js, err := json.MarshalIndent(*temp, "", "    ")
	if err != nil {
		log.Println(err)
	}
	// fmt.Println(js)
	fmt.Printf("%s\n", js)
}
