import React from "react";
import style from "../styles/recipe.module.css";
import { Link } from "react-router-dom";

const Recipe = ({ title, calories, image }) => {
  const styles = {
    color: "#333",
    textDecoration: "none"
  };

  return (
    <div className={style.recipe}>
      <Link style={styles} to={`/recipes/${title}`}>
        <h1 className={style.title}>{title}</h1>
      </Link>
      <p className={style.calories}>{calories}</p>
      <img src={image} alt="" className={style.image} />
    </div>
  );
};

export default Recipe;
