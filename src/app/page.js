import Image from "next/image";

export default function Home() {
  return (
    <div  className="bg-video">
      <video muted autoPlay loop src="/bg-video.mp4" alt="background"/>
    </div>
        );
}
