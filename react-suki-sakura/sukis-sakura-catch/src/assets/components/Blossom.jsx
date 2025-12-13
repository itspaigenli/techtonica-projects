import React from "react";

function Blossom({ x, y }) {
  return (
    <div
      className="blossom"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      🌸
    </div>
  );
}

export default React.memo(Blossom);
