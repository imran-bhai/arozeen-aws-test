"use client";

import { useEffect, useRef, useState } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";

const VideoPlayer = ({ src }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleVideoEnd = () => {
      videoRef.current.play();
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        src={src}
        muted={isMuted}
        className="w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      ></video>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4 rounded-full py-3 px-12 border-2">
        <button
          onClick={togglePlayPause}
          className="bg-gray-200 rounded-full p-2"
        >
          {isPlaying ? (
            <PauseIcon className="w-6 h-6 text-black" />
          ) : (
            <PlayIcon className="w-6 h-6 text-black" />
          )}
        </button>
        <button onClick={toggleMute} className="bg-gray-200 rounded-full p-2">
          {isMuted ? (
            <SpeakerXMarkIcon className="w-6 h-6 text-black" />
          ) : (
            <SpeakerWaveIcon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
