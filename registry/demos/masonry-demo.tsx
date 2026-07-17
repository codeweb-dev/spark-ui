import { Masonry } from "@/registry/spark-ui/masonry";

const ITEMS = [
  { id: "1", img: "/images/trail-1.jpg", height: 400 },
  { id: "2", img: "/images/trail-2.jpg", height: 250 },
  { id: "3", img: "/images/trail-3.jpg", height: 600 },
  { id: "4", img: "/images/trail-4.jpg", height: 350 },
  { id: "5", img: "/images/trail-5.jpg", height: 300 },
  { id: "6", img: "/images/trail-1.jpg", height: 450 },
  { id: "7", img: "/images/trail-2.jpg", height: 320 },
  { id: "8", img: "/images/trail-3.jpg", height: 400 },
];

export default function MasonryDemo() {
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
      colorShiftOnHover={false}
    />
  );
}
