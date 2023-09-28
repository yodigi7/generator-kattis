package main

import (
	"fmt"
)

func main() {
	var line int
	fmt.Scanln(&line)
	var lines []string
	for i := 0; i < line; i++ {
		var temp string
		fmt.Scanln(&temp)
		lines = append(lines, temp)
	}
}