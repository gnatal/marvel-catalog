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
    <div className={`relative w-screen py-6 px-4 bg-black ${styles["no-scrollbar"]}`}>
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 inline-block">
          {title}
        </h2>
        <div className="h-px flex-grow ml-4 bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-transparent"></div>
      </div>
      
      <div className={`w-full flex overflow-x-auto space-x-6 py-4 ${styles["no-scrollbar"]}`}>
        {items.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className="group flex-shrink-0 p-1 w-52 bg-gray-900 rounded border border-cyan-900 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-cyan-900/30 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            
            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-r from-fuchsia-500/20 to-cyan-500/20"></div>
            
            <div className="relative z-10 p-0.5">
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={208}
                  height={224}
                  className="rounded w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
                <div className={`absolute inset-0 bg-[url('/scanline.png')] opacity-10 group-hover:opacity-30 transition-opacity z-20 ${styles.scanline}`}></div>
              </div>
              
              <div className="p-3 bg-gray-900">
                <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="h-0.5 w-1/2 mt-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400"></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Carousel;