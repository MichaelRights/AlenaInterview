import React from "react";
import "./Leader.css";

export function Leader({
  leader,
  onClick = () => {},
  onDoubleClick = () => {},
  onRemove = () => {},
}) {
  let { id, role, selected, email, phone, firstName, lastName, organization } =
    leader;

  return (
    <div
      onClick={() => {
        onClick(leader);
      }}
      onDoubleClick={() => onDoubleClick(leader)}
      className={`card-container ${selected ? "card-selected" : ""}`}
    >
      <div className="card-content">
        <p>
          {firstName} {lastName}
        </p>
        <p>
          {role}/{organization}
        </p>
        <p>{email}</p>
        <p>{phone}</p>
      </div>
      <div
        onClick={(e) => {
          onRemove(id);
          e.stopPropagation();
        }}
        className="card-close"
      >
        ✖
      </div>
    </div>
  );
}
