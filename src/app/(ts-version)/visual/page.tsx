"use client";
import Lightning from "@/components/Lightning";
export default function Page() {
  return (
    <section>
      <div className="min-w-full min-h-full fixed z-0 ">
        <Lightning
          hue={30}
          xOffset={-1.5}
          speed={0.5}
          intensity={0.3}
          size={4}
        />
      </div>
      <div className="z-10">tcapuchasfdhaskj</div>
    </section>
  );
}
