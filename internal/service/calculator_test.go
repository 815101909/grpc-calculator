package service

import (
	"context"
	"testing"

	"connectrpc.com/connect"
	calculatorv1 "github.com/yourusername/grpc-calculator/gen/calculator/v1"
)

func TestCalculatorService_Add(t *testing.T) {
	service := NewCalculatorService()
	ctx := context.Background()

	tests := []struct {
		name     string
		a        float64
		b        float64
		expected float64
	}{
		{"正数相加", 5.0, 3.0, 8.0},
		{"负数相加", -5.0, -3.0, -8.0},
		{"正负数相加", 5.0, -3.0, 2.0},
		{"零相加", 0.0, 5.0, 5.0},
		{"小数相加", 1.5, 2.5, 4.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
				A: tt.a,
				B: tt.b,
			})

			resp, err := service.Add(ctx, req)
			if err != nil {
				t.Fatalf("Add() error = %v", err)
			}

			if resp.Msg.Result != tt.expected {
				t.Errorf("Add() = %v, want %v", resp.Msg.Result, tt.expected)
			}

			if resp.Msg.Error != "" {
				t.Errorf("Add() error = %v, want empty string", resp.Msg.Error)
			}
		})
	}
}

func TestCalculatorService_Subtract(t *testing.T) {
	service := NewCalculatorService()
	ctx := context.Background()

	tests := []struct {
		name     string
		a        float64
		b        float64
		expected float64
	}{
		{"正数相减", 5.0, 3.0, 2.0},
		{"负数相减", -5.0, -3.0, -2.0},
		{"正负数相减", 5.0, -3.0, 8.0},
		{"零相减", 5.0, 0.0, 5.0},
		{"小数相减", 3.5, 1.5, 2.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
				A: tt.a,
				B: tt.b,
			})

			resp, err := service.Subtract(ctx, req)
			if err != nil {
				t.Fatalf("Subtract() error = %v", err)
			}

			if resp.Msg.Result != tt.expected {
				t.Errorf("Subtract() = %v, want %v", resp.Msg.Result, tt.expected)
			}

			if resp.Msg.Error != "" {
				t.Errorf("Subtract() error = %v, want empty string", resp.Msg.Error)
			}
		})
	}
}

func TestCalculatorService_Multiply(t *testing.T) {
	service := NewCalculatorService()
	ctx := context.Background()

	tests := []struct {
		name     string
		a        float64
		b        float64
		expected float64
	}{
		{"正数相乘", 5.0, 3.0, 15.0},
		{"负数相乘", -5.0, -3.0, 15.0},
		{"正负数相乘", 5.0, -3.0, -15.0},
		{"零相乘", 5.0, 0.0, 0.0},
		{"小数相乘", 2.5, 4.0, 10.0},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
				A: tt.a,
				B: tt.b,
			})

			resp, err := service.Multiply(ctx, req)
			if err != nil {
				t.Fatalf("Multiply() error = %v", err)
			}

			if resp.Msg.Result != tt.expected {
				t.Errorf("Multiply() = %v, want %v", resp.Msg.Result, tt.expected)
			}

			if resp.Msg.Error != "" {
				t.Errorf("Multiply() error = %v, want empty string", resp.Msg.Error)
			}
		})
	}
}

func TestCalculatorService_Divide(t *testing.T) {
	service := NewCalculatorService()
	ctx := context.Background()

	tests := []struct {
		name        string
		a           float64
		b           float64
		expected    float64
		expectedErr string
	}{
		{"正数相除", 6.0, 3.0, 2.0, ""},
		{"负数相除", -6.0, -3.0, 2.0, ""},
		{"正负数相除", 6.0, -3.0, -2.0, ""},
		{"小数相除", 7.5, 2.5, 3.0, ""},
		{"除零错误", 5.0, 0.0, 0.0, "除数不能为零"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
				A: tt.a,
				B: tt.b,
			})

			resp, err := service.Divide(ctx, req)
			if err != nil {
				t.Fatalf("Divide() error = %v", err)
			}

			if resp.Msg.Result != tt.expected {
				t.Errorf("Divide() = %v, want %v", resp.Msg.Result, tt.expected)
			}

			if resp.Msg.Error != tt.expectedErr {
				t.Errorf("Divide() error = %v, want %v", resp.Msg.Error, tt.expectedErr)
			}
		})
	}
}

func TestNewCalculatorService(t *testing.T) {
	service := NewCalculatorService()
	if service == nil {
		t.Error("NewCalculatorService() returned nil")
	}
}

// 基准测试
func BenchmarkCalculatorService_Add(b *testing.B) {
	service := NewCalculatorService()
	ctx := context.Background()
	req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
		A: 5.0,
		B: 3.0,
	})

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, err := service.Add(ctx, req)
		if err != nil {
			b.Fatal(err)
		}
	}
}

func BenchmarkCalculatorService_Divide(b *testing.B) {
	service := NewCalculatorService()
	ctx := context.Background()
	req := connect.NewRequest(&calculatorv1.BinaryOperationRequest{
		A: 6.0,
		B: 3.0,
	})

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, err := service.Divide(ctx, req)
		if err != nil {
			b.Fatal(err)
		}
	}
}