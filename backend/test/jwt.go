package main

import (
	"fmt"

	"github.com/theLemionday/web-programming/schematic"
)

func main() {
	if schematic.Admin > schematic.AuthorizedFromRegistryCenter {
		fmt.Println("hello")
	}
}
