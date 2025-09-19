package service

import (
	"context"

	"connectrpc.com/connect"
	calculatorv1 "github.com/yourusername/grpc-calculator/gen/calculator/v1"
)

// CalculatorService 实现计算器服务
type CalculatorService struct{}

// NewCalculatorService 创建新的计算器服务实例
func NewCalculatorService() *CalculatorService {
	return &CalculatorService{}
}

// Add 执行加法运算
func (s *CalculatorService) Add(
	ctx context.Context,
	req *connect.Request[calculatorv1.BinaryOperationRequest],
) (*connect.Response[calculatorv1.CalculationResponse], error) {
	a := req.Msg.GetA()
	b := req.Msg.GetB()
	result := a + b

	response := &calculatorv1.CalculationResponse{
		Result: result,
		Error:  "",
	}

	return connect.NewResponse(response), nil
}

// Subtract 执行减法运算
func (s *CalculatorService) Subtract(
	ctx context.Context,
	req *connect.Request[calculatorv1.BinaryOperationRequest],
) (*connect.Response[calculatorv1.CalculationResponse], error) {
	a := req.Msg.GetA()
	b := req.Msg.GetB()
	result := a - b

	response := &calculatorv1.CalculationResponse{
		Result: result,
		Error:  "",
	}

	return connect.NewResponse(response), nil
}

// Multiply 执行乘法运算
func (s *CalculatorService) Multiply(
	ctx context.Context,
	req *connect.Request[calculatorv1.BinaryOperationRequest],
) (*connect.Response[calculatorv1.CalculationResponse], error) {
	a := req.Msg.GetA()
	b := req.Msg.GetB()
	result := a * b

	response := &calculatorv1.CalculationResponse{
		Result: result,
		Error:  "",
	}

	return connect.NewResponse(response), nil
}

// Divide 执行除法运算
func (s *CalculatorService) Divide(
	ctx context.Context,
	req *connect.Request[calculatorv1.BinaryOperationRequest],
) (*connect.Response[calculatorv1.CalculationResponse], error) {
	a := req.Msg.GetA()
	b := req.Msg.GetB()

	// 检查除零错误
	if b == 0 {
		response := &calculatorv1.CalculationResponse{
			Result: 0,
			Error:  "除数不能为零",
		}
		return connect.NewResponse(response), nil
	}

	result := a / b

	response := &calculatorv1.CalculationResponse{
		Result: result,
		Error:  "",
	}

	return connect.NewResponse(response), nil
}