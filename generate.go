//go:build ignore

package main

import (
	"log"
	"os"
	"os/exec"
)

func main() {
	// 确保生成目录存在
	if err := os.MkdirAll("gen/calculator/v1", 0755); err != nil {
		log.Fatal(err)
	}

	// 生成 protobuf Go 代码
	cmd := exec.Command("protoc",
		"--go_out=.",
		"--go_opt=paths=source_relative",
		"--connect-go_out=.",
		"--connect-go_opt=paths=source_relative",
		"proto/calculator.proto")

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatal("Failed to generate protobuf code:", err)
	}

	log.Println("Successfully generated protobuf code")
}