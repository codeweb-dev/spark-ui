import { Masonry, type MasonryItem } from "@/registry/spark-ui/masonry";

type CardItem = MasonryItem & { title: string; description: string };

const ITEMS: CardItem[] = [
  {
    id: "1",
    img: "/images/trail-1.jpg",
    height: 400,
    title: "Ridge Line",
    description: "Golden hour above the clouds.",
  },
  {
    id: "2",
    img: "/images/trail-2.jpg",
    height: 280,
    title: "Cliffside",
    description: "Where the trail meets the sky.",
  },
  {
    id: "3",
    img: "/images/trail-3.jpg",
    height: 460,
    title: "Canopy Walk",
    description: "Deep into the old growth.",
  },
  {
    id: "4",
    img: "/images/trail-4.jpg",
    height: 340,
    title: "Shoreline",
    description: "Sunset over open water.",
  },
  {
    id: "5",
    img: "/images/trail-5.jpg",
    height: 420,
    title: "Switchback",
    description: "Every turn, a new view.",
  },
  {
    id: "6",
    img: "/images/trail-1.jpg",
    height: 300,
    title: "Summit",
    description: "Above the tree line.",
  },
];

export default function MasonryCardsDemo() {
  return (
    <Masonry
      items={ITEMS}
      className="max-w-5xl"
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="bottom"
      scaleOnHover
      hoverScale={0.95}
      blurToFocus
      renderItem={(item) => (
        <div className="group relative size-full">
          <img
            src={item.img}
            alt=""
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
            <p className="text-sm font-semibold text-white">{item.title}</p>
            <p className="text-xs leading-relaxed text-white/70">
              {item.description}
            </p>
          </div>
        </div>
      )}
    />
  );
}
