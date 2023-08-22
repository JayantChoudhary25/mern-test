import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState, useEffect, useRef } from 'react';

export default function Animated({ progressRange }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const diff = (progressRange / 100) * 10;
          const newProgress = prevProgress + diff;

          if (newProgress >= progressRange) {
            clearInterval(interval);
            return progressRange;
          }

          return newProgress;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isVisible, progressRange]);

  return (
    <Box
      sx={{
        width: '100%',
        overflow: 'hidden', // Hide overflow for animation
      }}
      className="animated-container"
      ref={containerRef}
    >
      <Box
        sx={{
          transform: isVisible ? 'translateX(0)' : 'translateX(-100%)', // Apply animation
          transition: 'transform 1s ease', // Add transition
        }}
      >
        <LinearProgress variant="determinate" value={progress} className="p-1" />
      </Box>
    </Box>
  );
}
