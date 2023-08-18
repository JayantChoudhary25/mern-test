import React, { useState, useEffect } from "react";
import hero_vid from "../../Assets/hero_vid.mp4";
import Loader from "../Loader";
import "./style.css";

const Video = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    },3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <video
            width="100%"
            autoPlay
            loop
            muted
            style={{ height: "100%" }}
            id="myVideo"
          >
            <source src={hero_vid} type="video/mp4" />
          </video>

        </>
      )}
    </div>
  );
};

export default Video;
