import React, { useEffect } from "react";

function Test() {
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log(event.key);
      if (event.key === "Alt" && event.key === "Tab") {
        // ALT+TAB was pressed
        console.log("ALT+TAB pressed");
      } else if (event.key === "Control" && event.key === "Tab") {
        // CTRL+TAB was pressed
        console.log("CTRL+TAB pressed");
      } else if (event.key === "Escape") {
        // ESC was pressed
        console.log("ESC pressed");
      }
    };

    // Add the event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return <div>{/* Your app content */}</div>;
}

export default Test;
