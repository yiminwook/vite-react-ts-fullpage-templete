// src/App.js
import React, { useState } from "react";
import "./app.css";
import Footer from "./Footer";

const sections = [
  { id: "section1", content: "Section 1", color: "#FF5733" },
  { id: "section2", content: "Section 2", color: "#33FF57" },
  { id: "section3", content: "Section 3", color: "#3357FF" },
  { id: "section4", content: "Section 4", color: "rgba(1,1,1,0.2)" },
];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [footerScroll, setFooterScroll] = useState(0);

  const handleScroll = (event: React.WheelEvent) => {
    if (currentSection === sections.length && footerScroll) {
    }
    if (isScrolling) return;

    if (event.deltaY > 0) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
      }
    } else {
      if (currentSection > 0) {
        setCurrentSection(currentSection - 1);
      }
    }

    setIsScrolling(true);
    setTimeout(() => setIsScrolling(false), 500);
  };

  return (
    <div className="App" onWheel={handleScroll}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="section"
          style={{
            transform: `translateY(-${currentSection * 100}vh)`,
            backgroundColor: section.color,
          }}
        >
          {section.content}
        </div>
      ))}
    </div>
  );
}

export default App;
