import { useState, useEffect } from "react";
import "./VisitorCount.css";

export default function VisitorCount() {
  const [count, setCount] = useState(
    () => 123 + Math.floor(100 * Math.random())
  );

  useEffect(() => {
    const timer = setTimeout(
      () => setCount(count + 1),
      Math.ceil(10000 * Math.random())
    );
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="counter">
      <h2>000,000,{count}</h2>
      <h2>VISITORS</h2>
    </div>
  );
}
