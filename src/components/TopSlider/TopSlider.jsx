import "./TopSlider.css";

export default function TopSlider({ text, darkened }) {
  const longArray = Array.from(Array(10));

  return (
    <div className="slider-container">
      <div className="scrolling">
        NOW AVAILABLE😵!!!!!!!!!!!
        <span className={darkened}>{text}</span>
        !!!!!!!!!!!
      </div>
      {longArray.map((item, idx) => (
        <div key={idx} className="scrolling" aria-hidden="true">
          NOW AVAILABLE😵!!!!!!!!!!!
          <span className={darkened}>{text}</span>
          !!!!!!!!!!!
        </div>
      ))}
    </div>
  );
}
