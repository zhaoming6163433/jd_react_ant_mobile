import React, { useState, useEffect } from 'react';
import emitter from "utils/ev"
function handel(msg){
    console.log("callMe:"+msg)
}
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    console.log(222)
    document.title = `You clicked ${count} times`;
    emitter.addListener("callMe",handel);
    return () => {
        console.log(111)
        emitter.removeListener("callMe",handel);
    };
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
export default  Example;