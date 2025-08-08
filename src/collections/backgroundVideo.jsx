import React from "react";

export default function BackgroundVideo() {
  return (
    <>
        <div className="overlay"/>
            <video
            autoPlay
            muted
            loop
            playsInline
            className="background-video"
            >
            <source src="/bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </>

  );
}
