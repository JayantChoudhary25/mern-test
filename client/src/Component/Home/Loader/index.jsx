import React, { useState, useEffect } from "react";

import "./style.css";
import hello_img from "../../Assets/hello.svg";

const Loader = () => {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="loader_main d-flex justify-content-center align-items-center text-center">
      {/* {isLoading && ( */}
      <div
        className={` ${
          isLoading ? "animate__fadeOutDown " : "animate__fadeInDown"
        } animate__animated animate__slow`}
      >
        <img
          src={hello_img}
          alt=""
          // style={{ animation: " 4s ease-in-out 0s 7 slideInFromLeft" }}
        />
      </div>
      {/* )} */}
    </section>
  );
};

export default Loader;
