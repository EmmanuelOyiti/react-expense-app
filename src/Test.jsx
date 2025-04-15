import React, { useState, useEffect } from "react";
import "./test.css";

const Test = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="wrapper" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
      <span style={{ fontWeight: "bold" }}>
        {darkMode ? "Dark" : "Light"}
      </span>
    </div>
  );
};

export default Test;
