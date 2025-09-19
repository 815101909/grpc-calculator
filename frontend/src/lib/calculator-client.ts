import { createPromiseClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { BinaryOperationRequest, CalculationResponse } from './calculator_pb';
import { CalculatorService } from './calculator_connect';

// 创建传输层
const transport = createConnectTransport({
  baseUrl: 'http://localhost:8080',
});

// 创建客户端
const calculatorClient = createPromiseClient(CalculatorService, transport);

// 导出便捷方法
export const calculatorAPI = {
  async add(a: number, b: number): Promise<CalculationResponse> {
    const request = new BinaryOperationRequest({ a, b });
    const response = await calculatorClient.add(request);
    return response;
  },

  async subtract(a: number, b: number): Promise<CalculationResponse> {
    const request = new BinaryOperationRequest({ a, b });
    const response = await calculatorClient.subtract(request);
    return response;
  },

  async multiply(a: number, b: number): Promise<CalculationResponse> {
    const request = new BinaryOperationRequest({ a, b });
    const response = await calculatorClient.multiply(request);
    return response;
  },

  async divide(a: number, b: number): Promise<CalculationResponse> {
    const request = new BinaryOperationRequest({ a, b });
    const response = await calculatorClient.divide(request);
    return response;
  },
};