import React, { useMemo, useState } from "react";
import Footer from "./Footer";
import "./app.css";

const sections = [
  { id: "section1", content: "Section 1", color: "#FF5733" },
  { id: "section2", content: "Section 2", color: "#33FF57" },
  { id: "section3", content: "Section 3", color: "#3357FF" },
  { id: "section4", content: "Section 4", color: "#f3e744" },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);

  const handleScroll = useMemo(() => {
    let isScrolling = false; // 디바운스 처리를 위한 변수
    return (event: React.WheelEvent, currentSection: number) => {
      if (isScrolling) return;
      if (event.deltaY > 0) {
        // 아래스크롤
        if (currentSection < sections.length) {
          // currentSection === sections.length 이면 footer가 보이는 상태
          setCurrentSection(currentSection + 1);
        }
      } else {
        // 위로스크롤
        if (currentSection > 0) {
          setCurrentSection(currentSection - 1);
        }
      }

      isScrolling = true;
      setTimeout(() => (isScrolling = false), 500);
    };
  }, []);

  const transform =
    currentSection === sections.length
      ? `translateY(-${(currentSection - 1) * 100 + 20}vh)` //footer: 20vh
      : `translateY(-${currentSection * 100}vh)`;

  return (
    <div className="App" onWheel={(e) => handleScroll(e, currentSection)}>
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="section"
          style={{
            transform,
            backgroundColor: section.color,
          }}
        >
          {section.content}
        </div>
      ))}
      <div className="footer-wrapper" style={{ transform }}>
        <Footer />
      </div>
    </div>
  );
}
