import React from "react";
import "./Filters.css";

export function Filters({ value, setValue, selected, setSelected }) {
  return (
    <div className="filters-container d-flex justify-content-between">
      <span className="search-icon">
        <input
          placeholder="Filter Leads"
          className="search-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </span>
      <label className="switch">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => setSelected((prev) => !prev)}
        />
        <span className="slider"></span>
        <span className="slider-label">{!selected ? "Selected" : ""}</span>
      </label>
    </div>
  );
}
