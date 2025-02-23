import { getAllSeries } from "@/intergations/marvel/series/getAll";
import Image from "next/image";

export default async function Series() {
  const series = await getAllSeries();
  
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {series.map((serie) => (
          <div key={serie.id}>
            <p>{serie.title}</p>
            <Image
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt={serie.title}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
