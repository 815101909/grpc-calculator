import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          ConnectRPC 计算器
        </h1>
        <p className="text-center text-gray-600 mb-8">
          基于 Go + ConnectRPC 后端和 Next.js 前端的计算器应用
        </p>
        <Calculator />
      </div>
    </div>
  );
}
