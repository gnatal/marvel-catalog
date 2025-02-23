import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";

interface CarouselItem {
  image: string;
  title: string;
  url: string;
}

interface CarouselProps {
  items: CarouselItem[];
  title: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, title }) => {
    return (
      <div className={`relative w-screen h-screen p-4 bg-gray-900 ${styles["no-scrollbar"]}`}>
        <h2 className="text-2xl text-left font-bold text-white mb-4">
          {title}
        </h2>
        <div className="flex overflow-x-auto space-x-4 py-4">
          {items.map((item, index) => (
            <Link
              href={item.url}
              key={index}
              className="flex-shrink-0 p-4 w-48 bg-black rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={144}
                height={256}
                className="rounded-lg w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg text-white font-semibold">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  

export default Carousel;

