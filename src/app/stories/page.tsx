import { getAllStories } from "@/intergations/marvel/stories/getAll";

export default async function Home() {
  const stories = await getAllStories();
  
  return (
    <div className="">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
        {stories.map((story) => (
          <div key={story.id}>
            <h2>{story.title}</h2>
            <p>{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
