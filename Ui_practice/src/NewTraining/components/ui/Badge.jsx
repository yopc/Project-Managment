// import React from 'react'

// const Badge = ({ children, variant })=> {
//    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full font-medium";
//     const variantStyles = variant === "destructive" 
//       ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
//       : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";   
 
//     return (
//       <span className={`${baseStyles} ${variantStyles}`}>
//         {children}
//       </span>
    
//   )
// }

// export default Badge

import React from "react";

const Badge = ({ children, variant }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-3 py-1 rounded-full font-medium text-xs whitespace-nowrap flex-shrink-0";

  const variantStyles =
    variant === "destructive"
      ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";

  return (
    <span className={`${baseStyles} ${variantStyles}`}>
      {children}
    </span>
  );
};

export default Badge;


