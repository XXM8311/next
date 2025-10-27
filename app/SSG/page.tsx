import Image from "next/image";
interface banner {
  id: number;
  url: string;
}

interface ApiResponse {
  code: number;
  data: banner[];
}

export default async function Page() {
  const res = await fetch("http://localhost:3001/community/banner", {});

  const result: ApiResponse = await res.json();
  console.log(result);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">广告条（SSG）</h1>
        {result.data.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-4 bg-white shadow rounded w-[200px] h-[150px] flex items-center justify-center gap-6"
          >
            <Image
              src={`http://127.0.0.1:3001${item.url}`}
              alt={`Banner ${item.id}`}
              width={600}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
