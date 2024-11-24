import { useState, useEffect, RefObject } from 'react';

const useOnImageLoad = (ref: RefObject<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    const imageLoaded = ref.current;

    imageLoaded.addEventListener('load', (e) => setIsLoaded((e.target as HTMLImageElement).complete), {
      once: true,
    });

    imageLoaded.addEventListener('error', (e) => setIsLoaded((e.target as HTMLImageElement).complete), {
      once: true,
    });
  }, [ref]);

  return isLoaded;
};

export default useOnImageLoad;
