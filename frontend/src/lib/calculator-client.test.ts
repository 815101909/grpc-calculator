// Mock the calculator client module
jest.mock('./calculator-client', () => ({
  calculatorAPI: {
    add: jest.fn(),
    subtract: jest.fn(),
    multiply: jest.fn(),
    divide: jest.fn(),
  },
}))

// Import after mocking
import { calculatorAPI } from './calculator-client'

// Get the mocked functions
const mockCalculatorAPI = calculatorAPI as jest.Mocked<typeof calculatorAPI>

describe('Calculator API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('add', () => {
    it('应该正确调用加法API', async () => {
      const mockResponse = { result: 8, error: '' }
      mockCalculatorAPI.add.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.add(5, 3)
      
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(5, 3)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理加法API错误', async () => {
      const mockError = new Error('网络错误')
      mockCalculatorAPI.add.mockRejectedValue(mockError)
      
      await expect(calculatorAPI.add(5, 3)).rejects.toThrow('网络错误')
    })

    it('应该处理负数加法', async () => {
      const mockResponse = { result: -8, error: '' }
      mockCalculatorAPI.add.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.add(-5, -3)
      
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(-5, -3)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理小数加法', async () => {
      const mockResponse = { result: 4.5, error: '' }
      mockCalculatorAPI.add.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.add(1.5, 3.0)
      
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(1.5, 3.0)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('subtract', () => {
    it('应该正确调用减法API', async () => {
      const mockResponse = { result: 2, error: '' }
      mockCalculatorAPI.subtract.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.subtract(5, 3)
      
      expect(mockCalculatorAPI.subtract).toHaveBeenCalledWith(5, 3)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理减法API错误', async () => {
      const mockError = new Error('服务器错误')
      mockCalculatorAPI.subtract.mockRejectedValue(mockError)
      
      await expect(calculatorAPI.subtract(5, 3)).rejects.toThrow('服务器错误')
    })

    it('应该处理负数减法', async () => {
      const mockResponse = { result: -2, error: '' }
      mockCalculatorAPI.subtract.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.subtract(-5, -3)
      
      expect(mockCalculatorAPI.subtract).toHaveBeenCalledWith(-5, -3)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('multiply', () => {
    it('应该正确调用乘法API', async () => {
      const mockResponse = { result: 15, error: '' }
      mockCalculatorAPI.multiply.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.multiply(5, 3)
      
      expect(mockCalculatorAPI.multiply).toHaveBeenCalledWith(5, 3)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理乘法API错误', async () => {
      const mockError = new Error('连接超时')
      mockCalculatorAPI.multiply.mockRejectedValue(mockError)
      
      await expect(calculatorAPI.multiply(5, 3)).rejects.toThrow('连接超时')
    })

    it('应该处理零乘法', async () => {
      const mockResponse = { result: 0, error: '' }
      mockCalculatorAPI.multiply.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.multiply(5, 0)
      
      expect(mockCalculatorAPI.multiply).toHaveBeenCalledWith(5, 0)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理小数乘法', async () => {
      const mockResponse = { result: 7.5, error: '' }
      mockCalculatorAPI.multiply.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.multiply(2.5, 3.0)
      
      expect(mockCalculatorAPI.multiply).toHaveBeenCalledWith(2.5, 3.0)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('divide', () => {
    it('应该正确调用除法API', async () => {
      const mockResponse = { result: 2, error: '' }
      mockCalculatorAPI.divide.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.divide(6, 3)
      
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(6, 3)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理除法API错误', async () => {
      const mockError = new Error('请求失败')
      mockCalculatorAPI.divide.mockRejectedValue(mockError)
      
      await expect(calculatorAPI.divide(6, 3)).rejects.toThrow('请求失败')
    })

    it('应该处理除零错误响应', async () => {
      const mockResponse = { result: 0, error: '除数不能为零' }
      mockCalculatorAPI.divide.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.divide(5, 0)
      
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(5, 0)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理小数除法', async () => {
      const mockResponse = { result: 2.5, error: '' }
      mockCalculatorAPI.divide.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.divide(7.5, 3.0)
      
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(7.5, 3.0)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理负数除法', async () => {
      const mockResponse = { result: -2, error: '' }
      mockCalculatorAPI.divide.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.divide(-6, 3)
      
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(-6, 3)
      expect(result).toEqual(mockResponse)
    })
  })

  describe('客户端初始化', () => {
    it('应该正确初始化API客户端', () => {
      expect(calculatorAPI).toBeDefined()
      expect(calculatorAPI.add).toBeDefined()
      expect(calculatorAPI.subtract).toBeDefined()
      expect(calculatorAPI.multiply).toBeDefined()
      expect(calculatorAPI.divide).toBeDefined()
    })
  })

  describe('边界情况测试', () => {
    it('应该处理极大数值', async () => {
      const mockResponse = { result: 2e10, error: '' }
      mockCalculatorAPI.add.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.add(1e10, 1e10)
      
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(1e10, 1e10)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理极小数值', async () => {
      const mockResponse = { result: 2e-10, error: '' }
      mockCalculatorAPI.add.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.add(1e-10, 1e-10)
      
      expect(mockCalculatorAPI.add).toHaveBeenCalledWith(1e-10, 1e-10)
      expect(result).toEqual(mockResponse)
    })

    it('应该处理无穷大', async () => {
      const mockResponse = { result: Infinity, error: '' }
      mockCalculatorAPI.divide.mockResolvedValue(mockResponse)
      
      const result = await calculatorAPI.divide(1, 0)
      
      expect(mockCalculatorAPI.divide).toHaveBeenCalledWith(1, 0)
      expect(result).toEqual(mockResponse)
    })
  })
})