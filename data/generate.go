package main

import (
	"bufio"
	"fmt"
	"math/rand"
	"os"
	"time"
)

// Generate number from min (included) to max (not included)
func RandomUniqueSeq(min, max int) []int {
	if (max-min)%10 != 0 {
		fmt.Printf("Range is not a multiple of 10\n, min=%d\tmax=%d", min, max)
	}
	rand.Seed(time.Now().Unix())
	random_list := rand.Perm(max - min)

	for i := range random_list {
		random_list[i] += min
	}

	return random_list
}

func writeSeqToFile(seq []int, min, max int) {
	fo, err := os.Create("output/output.txt")
	if err != nil {
		panic(err)
	}
	defer func() {
		if err := fo.Close(); err != nil {
			panic(err)
		}
	}()

	w := bufio.NewWriter(fo)
	fmt.Fprintf(w, "# from=%d, to=%d, length=%d\n", min, max, max-min)
	w.Flush()

	count := 0
	for _, v := range seq {
		if count == 9 {
			count = 0
			fmt.Fprintf(w, "%d\n", v)
			w.Flush()
			continue
		}
		count += 1
		fmt.Fprintf(w, "%d ", v)
	}

}

const (
	from = 10
	to   = 30
)

func main() {
	temp_list := RandomUniqueSeq(from, to)
	writeSeqToFile(temp_list, from, to)
}
