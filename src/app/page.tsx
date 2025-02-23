import Carousel from "@/components/carrousel";
import { getAllCharacters } from "@/intergations/marvel/characters/getAll";
import { getAllComics } from "@/intergations/marvel/comics/getAll";
import { getAllEvents } from "@/intergations/marvel/events/getAll";
import { getAllSeries } from "@/intergations/marvel/series/getAll";

export default async function Home() {
  const characters = await getAllCharacters();
  const comics = await getAllComics();
  const events = await getAllEvents();
  const series = await getAllSeries();

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Carousel
        items={characters.map((character) => {
          return {
            image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            title: character.name,
            url: `/characters/${character.id}`,
          }
        })}
        title="Characters"
      />
      <Carousel
        items={comics.map((comic) => {
          return {
            image: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            title: comic.title,
            url: `/comics/${comic.id}`,
          }
        })}
        title="Comics"
      />
      <Carousel
        items={events.map((event) => {
          return {
            image: `${event.thumbnail.path}.${event.thumbnail.extension}`,
            title: event.title,
            url: `/events/${event.id}`,
          }
        })}
        title="Events"
      />
      <Carousel
        items={series.map((serie) => {
          return {
            image: `${serie.thumbnail.path}.${serie.thumbnail.extension}`,
            title: serie.title,
            url: `/series/${serie.id}`,
          }
        })}
        title="Series"
      />
    </div>
  );
}
