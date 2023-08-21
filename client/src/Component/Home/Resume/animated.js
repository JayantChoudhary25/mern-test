import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Animated({ progressRange }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const diff = (progressRange / 100) * 10; // Adjust speed based on progress range
        const newProgress = prevProgress + diff;

        if (newProgress >= progressRange) {
          clearInterval(interval);
          return progressRange;
        }

        return newProgress;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [progressRange]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} className='p-1' />
    </Box>
  );
}