import Image from "next/image";

interface Banner {
  id: number;
  url: string;
}
interface ApiResponse {
  code: number;
  data: Banner[];
}

export default async function Page() {
  console.log("🕒 页面重新生成:", new Date().toLocaleTimeString());

  const res = await fetch("http://localhost:3001/community/banner", {
    next: { revalidate: 10 },
  });
  const result: ApiResponse = await res.json();

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">广告条（ISR 模式）</h1>

        {result.data.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-4 bg-white shadow rounded w-[200px] h-[150px] flex items-center justify-center"
          >
            <Image
              src={`http://127.0.0.1:3001${item.url}`}
              alt={`Banner ${item.id}`}
              width={600}
              height={200}
            />
          </div>
        ))}

        <p className="text-gray-500 mt-4 text-sm">
          页面生成时间：{new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
