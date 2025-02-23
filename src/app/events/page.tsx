import { getAllEvents } from "@/intergations/marvel/events/getAll";
import Image from "next/image";

export default async function Home() {
  const events = await getAllEvents();
  
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {events.map((event) => (
          <div key={event.id}>
            <p>{event.title}</p>
            <Image
              src={`${event.thumbnail.path}.${event.thumbnail.extension}`}
              alt={event.title}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
