"use client";

import { useState } from "react";
import { calculatorAPI } from "@/lib/calculator-client";
import type { CalculationResponse } from "@/lib/calculator_pb";

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState<string>("");
  const [secondNumber, setSecondNumber] = useState<string>("");
  const [operator, setOperator] = useState<string>("+");
  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    const a = parseFloat(firstNumber);
    const b = parseFloat(secondNumber);

    if (isNaN(a) || isNaN(b)) {
      setResult({ result: 0, error: "请输入有效的数字" });
      return;
    }

    setIsLoading(true);
    try {
      let response: CalculationResponse;
      
      switch (operator) {
        case "+":
          response = await calculatorAPI.add(a, b);
          break;
        case "-":
          response = await calculatorAPI.subtract(a, b);
          break;
        case "×":
          response = await calculatorAPI.multiply(a, b);
          break;
        case "÷":
          response = await calculatorAPI.divide(a, b);
          break;
        default:
          response = { result: 0, error: "未知运算符" };
      }
      
      setResult(response);
    } catch (error) {
      setResult({ result: 0, error: "计算失败" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperator("+");
    setResult(null);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        计算器
      </h1>
      
      <div className="space-y-4">
        {/* 第一个数字输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            第一个数字
          </label>
          <input
            type="number"
            value={firstNumber}
            onChange={(e) => setFirstNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入第一个数字"
          />
        </div>

        {/* 运算符选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            运算符
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["+", "-", "×", "÷"].map((op) => (
              <button
                key={op}
                onClick={() => {
                  setOperator(op);
                  setResult(null);
                }}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  operator === op
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* 第二个数字输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            第二个数字
          </label>
          <input
            type="number"
            value={secondNumber}
            onChange={(e) => setSecondNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="请输入第二个数字"
          />
        </div>

        {/* 计算按钮 */}
        <div className="flex space-x-2">
          <button
            onClick={handleCalculate}
            disabled={isLoading}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 transition-colors font-medium"
          >
            {isLoading ? "计算中..." : "计算"}
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors font-medium"
          >
            清除
          </button>
        </div>

        {/* 结果显示 */}
        {result && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium text-gray-800 mb-2">计算结果</h3>
            {result.error ? (
              <div className="text-red-600 font-medium">
                错误: {result.error}
              </div>
            ) : (
              <div className="text-2xl font-bold text-green-600">
                {firstNumber} {operator} {secondNumber} = {result.result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}