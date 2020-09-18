import React from "react";

const Loading = ({ status }) => {
  return (
    <div>
      {/* <h3>{status === true ? "Hunting Down Your Recipes..." : ""}</h3> */}
      {/* <div className={`spinner ${status === true ? "show" : "hide"}`}></div> */}
      {status ? (
        <div className="spinner show"></div>
      ) : (
        <div className="spinner hide"></div>
      )}
    </div>
  );
};

export default Loading;
