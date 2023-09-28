package main

import (
	"fmt"
)

func main() {
	var lines []string
	var line string
	for {
		_, err := fmt.Scanln(&line)
		if err != nil {
			break
		}
		lines = append(lines, line)
	}
}