import Image from "next/image";
import Link from "next/link";

interface CarouselItem {
  image: string;
  title: string;
  url: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div className="relative">
      <div className="flex overflow-x-auto space-x-4 py-4">
        {items.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className="flex-shrink-0 w-64 bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <Image src={item.image} alt={item.title} width={100} height={200} />
            <div className="p-4">
              <h3 className="text-lg text-white font-semibold text-gray-800">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

