package main

import (
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/antchfx/htmlquery"
)

func buildUrl(page int) *url.URL {
	req, err := http.NewRequest("GET", "https://www.tratencongty.com", nil)
	if err != nil {
		log.Fatal(err)
	}
	q := req.URL.Query()            // Get a copy of the query values.
	q.Add("page", fmt.Sprint(page)) // Add a new value to the set.
	req.URL.RawQuery = q.Encode()   // Encode and assign back to the original query.
	return req.URL
}

func crawlPage(page int) {
	url := buildUrl(page)
	doc, err := htmlquery.LoadURL(url.String())
	if err != nil {
		panic(err)
	}
	// Find all news item.
	list, err := htmlquery.QueryAll(doc, "//a[starts-with(text(),'CÔNG')]/text()")
	if err != nil {
		panic(err)
	}
	for _, n := range list {
		// a := htmlquery.FindOne(n, "//a")
		// if a != nil {
		// fmt.Printf("%s\n", htmlquery.InnerText(n), htmlquery.SelectAttr(a, "href"))
		fmt.Println(n.Data[9:])
		// }
	}
}

func main() {
	for i := 1; i <= 100; i++ {
		// url := buildUrl(i)
		// fmt.Print(url)
		crawlPage(i)
	}
}
