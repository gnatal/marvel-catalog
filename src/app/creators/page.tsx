import { getAllCreators } from "@/intergations/marvel/creators/getAll";
import Image from "next/image";

export default async function Home() {
  const creators = await getAllCreators();

  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {creators.map((creator) => (
          <div key={creator.id}>
            <p>{creator.fullName}</p>
            <Image
              src={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
              alt={creator.fullName}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
