# gRPC Calculator

一个基于 gRPC 和 Next.js 构建的现代计算器应用，展示了前后端分离架构和 gRPC-Web 通信。

## 项目特性

- 🚀 **现代技术栈**: Go + gRPC 后端，Next.js + TypeScript 前端
- 🔗 **gRPC-Web 通信**: 使用 Connect-RPC 实现高效的前后端通信
- 📱 **响应式设计**: 基于 Tailwind CSS 的现代 UI 界面
- 🛡️ **类型安全**: 通过 Protocol Buffers 确保前后端类型一致性
- ⚡ **实时计算**: 输入数字时自动计算，无需点击按钮，支持加法、减法、乘法、除法运算
- 🧪 **完整测试**: 前后端单元测试覆盖，确保代码质量

## 技术架构

### 后端 (Go)
- **框架**: Connect-RPC
- **协议**: Protocol Buffers (proto3)
- **服务**: gRPC 计算器服务
- **端口**: 8080

### 前端 (Next.js)
- **框架**: Next.js 15 + React 19
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **通信**: gRPC-Web (Connect-RPC)
- **端口**: 3000

## 快速开始

### 前置要求
- Go 1.24+
- Node.js 18+
- npm 或 yarn

### 安装和运行

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/grpc-calculator.git
   cd grpc-calculator
   ```

2. **启动后端服务**
   ```bash
   go mod tidy
   go run cmd/server/main.go
   ```
   后端服务将在 http://localhost:8080 启动

3. **启动前端应用**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   前端应用将在 http://localhost:3000 启动

4. **访问应用**
   打开浏览器访问 http://localhost:3000
   
   **使用说明**: 输入两个数字并选择运算符，计算结果会自动显示，无需点击计算按钮。

## 项目结构

```
grpc-calculator/
├── cmd/
│   └── server/
│       └── main.go          # 服务器入口
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js 应用路由
│   │   ├── components/      # React 组件
│   │   │   └── Calculator.test.tsx  # 组件单元测试
│   │   └── lib/             # gRPC 客户端代码
│   │       └── calculator-client.test.ts  # API 客户端测试
│   ├── proto/               # 前端 Proto 文件
│   ├── jest.config.js       # Jest 测试配置
│   ├── jest.setup.js        # Jest 设置文件
│   └── package.json
├── internal/
│   └── service/
│       ├── calculator.go    # 计算器服务实现
│       └── calculator_test.go  # 服务单元测试
├── proto/
│   └── calculator.proto     # Protocol Buffers 定义
├── go.mod
└── README.md
```

## API 接口

计算器服务提供以下 gRPC 方法：

- `Add(a, b)` - 加法运算
- `Subtract(a, b)` - 减法运算
- `Multiply(a, b)` - 乘法运算
- `Divide(a, b)` - 除法运算

### 请求格式
```protobuf
message BinaryOperationRequest {
  double a = 1;
  double b = 2;
}
```

### 响应格式
```protobuf
message CalculationResponse {
  double result = 1;
  string error = 2;
}
```

## 开发指南

### 运行测试

**后端测试**
```bash
# 运行所有后端测试
go test ./internal/service -v

# 运行测试并查看覆盖率
go test ./internal/service -cover
```

**前端测试**
```bash
cd frontend

# 运行所有测试
npm test

# 运行测试并监听文件变化
npm run test:watch

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 修改 Proto 文件

1. 编辑 `proto/calculator.proto`
2. 重新生成代码：
   ```bash
   # 后端
   go generate ./...
   
   # 前端
   cd frontend
   npx buf generate
   ```

### 添加新的计算功能

1. 在 `proto/calculator.proto` 中添加新的 RPC 方法
2. 在 `internal/service/calculator.go` 中实现服务逻辑
3. 在 `internal/service/calculator_test.go` 中添加单元测试
4. 在前端 `src/lib/calculator-client.ts` 中添加客户端方法
5. 在 `src/lib/calculator-client.test.ts` 中添加客户端测试
6. 在 `src/components/Calculator.tsx` 中添加 UI 支持
7. 在 `src/components/Calculator.test.tsx` 中添加组件测试

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！