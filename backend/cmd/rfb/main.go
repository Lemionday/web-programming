package main

import (
	"github.com/theLemionday/web-programming/conf"
	"github.com/theLemionday/web-programming/server"
)

func main() {
	config := conf.LoadConfig()
	server.Start(config)
}
