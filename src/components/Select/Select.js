import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Select.css";

export function Select({ data, placeholder, selectedItem, onSelect }) {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const close = (e) => {
      if (ref.current !== e.target) {
        setShow(false);
      }
    };
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
    };
  }, []);

  const toggle = useCallback(() => {
    setShow((prev) => !prev);
  }, [setShow]);

  return (
    <>
      <div ref={ref} onClick={toggle} className="select">
        {selectedItem.id ? selectedItem.name : placeholder}
      </div>
      <input
        required
        type="number"
        title="Please select an option"
        onInvalid={(e) => {
          if (!e.target.value)
            e.target.setCustomValidity("Please select an option");
          else {
            e.target.setCustomValidity("");
            e.preventDefault();
          }
        }}
        className="hidden-input"
        defaultValue={selectedItem.id}
      />
      {show && (
        <div className="option-container">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={(e) => onSelect(item, e)}
              id={item.id}
              className={`option ${
                selectedItem.id === item.id ? "option-selected" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
