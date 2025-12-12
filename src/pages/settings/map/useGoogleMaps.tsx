//  "use client"
// import { useState, useEffect } from 'react';

// export const useGoogleMaps = () => {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [loadError, setLoadError] = useState<string | null>(null);

//   useEffect(() => {
//     if (window.google) {
//       setIsLoaded(true);
//       return;
//     }

//     const script = document.createElement('script');
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//     script.async = true;
//     script.defer = true;
    
//     script.onload = () => setIsLoaded(true);
//     script.onerror = () => setLoadError('Google Maps failed to load');

//     document.head.appendChild(script);

//     return () => {
      
//     };
//   }, []);

//   return { isLoaded, loadError };
// };