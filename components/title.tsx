import React from "react";

interface TitleProps {
    
}
 
const Title: React.FC<TitleProps> = ( { children } ) => {
    return ( 
        <h1 className="text-xl font-bold pb-4">
         { children }
       </h1>
     );
}
 
export default Title;
