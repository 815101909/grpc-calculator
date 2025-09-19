package main

import (
	"fmt"
	"log"
	"net/http"

	calculatorconnect "github.com/yourusername/grpc-calculator/gen/calculator/v1/calculatorconnect"
	"github.com/yourusername/grpc-calculator/internal/service"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	// 创建计算器服务实例
	calculatorSvc := service.NewCalculatorService()

	// 创建 ConnectRPC 处理器
	path, handler := calculatorconnect.NewCalculatorServiceHandler(calculatorSvc)

	// 创建 HTTP 服务器多路复用器
	mux := http.NewServeMux()
	
	// 直接处理每个服务方法
	mux.Handle("/calculator.v1.CalculatorService/Add", handler)
	mux.Handle("/calculator.v1.CalculatorService/Subtract", handler)
	mux.Handle("/calculator.v1.CalculatorService/Multiply", handler)
	mux.Handle("/calculator.v1.CalculatorService/Divide", handler)

	// 添加 CORS 支持
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Connect-Protocol-Version, Connect-Timeout-Ms")
			w.Header().Set("Access-Control-Expose-Headers", "Connect-Protocol-Version, Connect-Timeout-Ms")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	}

	// 应用 CORS 中间件
	finalHandler := corsHandler(mux)

	// 支持 HTTP/2 和 HTTP/1.1
	server := &http.Server{
		Addr:    ":8080",
		Handler: h2c.NewHandler(finalHandler, &http2.Server{}),
	}

	fmt.Println("计算器服务器启动在 http://localhost:8080")
	fmt.Println("ConnectRPC 服务路径:", path)

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("服务器启动失败: %v", err)
	}
}