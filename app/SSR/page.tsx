interface Announcement {
  id: number;
  time: string;
  name: string;
}

interface ApiResponse {
  code: number;
  data: Announcement[];
}

export default async function Page() {
  const res = await fetch("http://localhost:3001/community/announcementList", {
    cache: "no-store",
  });

  const result: ApiResponse = await res.json();
  console.log(result);

  const list = Array.isArray(result.data) ? result.data : [];

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">公告列表（SSR）</h1>

        <ul>
          {list.map((item) => (
            <li key={item.id} className="mb-4 p-4 bg-white shadow rounded">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
