"use client";
import { React, useEffect, useRef, useState } from "react";

export default function LoadingScreenWithBackgroundVideo() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleReady = () => setIsVideoReady(true);
    videoEl.addEventListener("canplaythrough", handleReady, { once: true });

    return () => {
      videoEl.removeEventListener("canplaythrough", handleReady);
    };
  }, []);

  return (
    <>
      {!isVideoReady && (
        <div className="loading-screen">
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
      )}
        <div className="overlay"/>
        <video
          ref={videoRef}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
    </>
  );
}