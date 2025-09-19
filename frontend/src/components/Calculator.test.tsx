import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from './Calculator'
import { calculatorAPI } from '@/lib/calculator-client'

// Mock the calculator API
jest.mock('../lib/calculator-client', () => ({
  calculatorAPI: {
    add: jest.fn(),
    subtract: jest.fn(),
    multiply: jest.fn(),
    divide: jest.fn(),
  },
}))

// Import after mocking
import { calculatorAPI } from '../lib/calculator-client'
const mockCalculatorAPI = calculatorAPI as jest.Mocked<typeof calculatorAPI>

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('应该正确渲染计算器界面', () => {
    render(<Calculator />)
    
    expect(screen.getByText('计算器')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('请输入第一个数字')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('请输入第二个数字')).toBeInTheDocument()
    expect(screen.getByText('计算')).toBeInTheDocument()
    expect(screen.getByText('清除')).toBeInTheDocument()
  })

  it('应该正确渲染所有运算符按钮', () => {
    render(<Calculator />)
    
    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText('-')).toBeInTheDocument()
    expect(screen.getByText('×')).toBeInTheDocument()
    expect(screen.getByText('÷')).toBeInTheDocument()
  })

  it('应该能够输入数字', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    
    expect(firstInput).toHaveValue(5)
    expect(secondInput).toHaveValue(3)
  })

  it('应该能够选择运算符', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    const subtractButton = screen.getByText('-')
    await user.click(subtractButton)
    
    expect(subtractButton).toHaveClass('bg-blue-500 text-white')
  })

  it('应该能够执行加法运算', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.add.mockResolvedValue({ result: 8, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(5, 3)
      expect(screen.getByText('5 + 3 = 8')).toBeInTheDocument()
    })
  })

  it('应该能够执行减法运算', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.subtract.mockResolvedValue({ result: 2, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const subtractButton = screen.getByText('-')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(subtractButton)
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(mockCalculatorAPI.subtract).toHaveBeenCalledWith(5, 3)
      expect(screen.getByText('5 - 3 = 2')).toBeInTheDocument()
    })
  })

  it('应该能够执行乘法运算', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.multiply.mockResolvedValue({ result: 15, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const multiplyButton = screen.getByText('×')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(multiplyButton)
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(mockCalculatorAPI.multiply).toHaveBeenCalledWith(5, 3)
      expect(screen.getByText('5 × 3 = 15')).toBeInTheDocument()
    })
  })

  it('应该能够执行除法运算', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.divide.mockResolvedValue({ result: 2, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const divideButton = screen.getByText('÷')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '6')
    await user.type(secondInput, '3')
    await user.click(divideButton)
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(6, 3)
      expect(screen.getByText('6 ÷ 3 = 2')).toBeInTheDocument()
    })
  })

  it('应该处理除零错误', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.divide.mockResolvedValue({ result: 0, error: '除数不能为零' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const divideButton = screen.getByText('÷')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '0')
    await user.click(divideButton)
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(screen.getByText('错误: 除数不能为零')).toBeInTheDocument()
    })
  })

  it('应该处理无效输入', async () => {
    const user = userEvent.setup()
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, 'abc')
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(screen.getByText('错误: 请输入有效的数字')).toBeInTheDocument()
    })
  })

  it('应该处理API错误', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.add.mockRejectedValue(new Error('网络错误'))
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(screen.getByText('错误: 计算失败')).toBeInTheDocument()
    })
  })

  it('应该显示加载状态', async () => {
    const user = userEvent.setup()
    // 创建一个永远不会resolve的Promise来模拟加载状态
    mockCalculatorAPI.add.mockImplementation(() => new Promise(() => {}))
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const calculateButton = screen.getByText('计算')
    
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)
    
    expect(screen.getByText('计算中...')).toBeInTheDocument()
    expect(calculateButton).toBeDisabled()
  })

  it('应该能够清除输入和结果', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.add.mockResolvedValue({ result: 8, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const calculateButton = screen.getByText('计算')
    const clearButton = screen.getByText('清除')
    
    // 输入数字并计算
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(screen.getByText('5 + 3 = 8')).toBeInTheDocument()
    })
    
    // 清除
    await user.click(clearButton)
    
    expect(firstInput).toHaveValue(null)
    expect(secondInput).toHaveValue(null)
    expect(screen.queryByText('5 + 3 = 8')).not.toBeInTheDocument()
  })

  it('应该在选择新运算符时清除结果', async () => {
    const user = userEvent.setup()
    mockCalculatorAPI.add.mockResolvedValue({ result: 8, error: '' })
    
    render(<Calculator />)
    
    const firstInput = screen.getByPlaceholderText('请输入第一个数字')
    const secondInput = screen.getByPlaceholderText('请输入第二个数字')
    const calculateButton = screen.getByText('计算')
    const subtractButton = screen.getByText('-')
    
    // 输入数字并计算
    await user.type(firstInput, '5')
    await user.type(secondInput, '3')
    await user.click(calculateButton)
    
    await waitFor(() => {
      expect(screen.getByText('5 + 3 = 8')).toBeInTheDocument()
    })
    
    // 选择新运算符
    await user.click(subtractButton)
    
    expect(screen.queryByText('5 + 3 = 8')).not.toBeInTheDocument()
  })
})