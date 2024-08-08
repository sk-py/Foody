// import { useState } from "react";
// import { useRouter } from "expo-router";

// const useDebouncedNavigation = () => {
//   const router = useRouter();
//   const [isDebouncing, setIsDebouncing] = useState(false);

//   const navigateWithDebounce = (pathName, params) => {
//     if (isDebouncing) return; // If currently debouncing, exit function

//     setIsDebouncing(true); // Set debouncing to true
//     router.push({
//       pathname: pathName,
//       query: params,
//     });

//     // Reset debouncing after 2 seconds
//     setTimeout(() => {
//       setIsDebouncing(false);
//     }, 2000);
//   };

//   return navigateWithDebounce;
// };

// export default useDebouncedNavigation;
