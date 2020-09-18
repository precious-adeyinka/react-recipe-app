import React, { useState, useEffect } from "react";
import style from "../styles/recipepage.module.css";
import {Link} from "react-router-dom";
import Form from "./Form";
import Loading from "./Loading";

const RecipePage = ({ match }) => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecipe();
  }, []);

  const swal = () => {};

  const getRecipe = async (searchTerm) => {
    setLoading(true);

    const APP_ID = "ed707ad1";
    const APP_KEY = "e3a89a43c26726e0027532c409dcf78b";

    const term = searchTerm ? searchTerm : match.params.name;

    const response = await fetch(
      `https://api.edamam.com/search?q=${term}&app_id=${APP_ID}&app_key=${APP_KEY}`
    ).catch((err) => {
      console.log("Error fetching from recipes - ", err);
    });

    const data = await response.json();
    // console.log(data, "Data");

    if (data.hits.length === 0) {
      swal({
        title: "Oops!!",
        text: "No result found for '" + match.params.name +"'",
        icon: "info"
      }).then(() => {
        swal({
          title: "Default Action",
          text: "Loading default data",
          icon: "info"
        });
      });
    } else {
      setRecipe(data.hits[0].recipe);
      setLoading(false);
    }
  };

  return (
    <div className={style.recipePage}>
      <div className={style.container}>
        <Header title={recipe.label} getRecipe={getRecipe} loading={loading} />
        <div className={style.row}>
        {/* Left */}
          <div className={style.col}>
            <h1 className={style.recipeTitle}>{recipe.label}</h1>
            <div className={style.recipeRating}>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <p className={style.recipeDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>
            {/* Time */}
            <div className={style.recipeTime}>
              <i className="fas fa-clock"></i> <span>&nbsp;{recipe.totalTime} mins</span>
            </div>
            <div className={style.recipeTime}>
              <i className="fas fa-seedling"></i> <span>&nbsp;{recipe.calories} (Kcal)</span>
            </div>
            <div className={style.recipeTime}>
              <i className="fas fa-exclamation-triangle"></i> <span>&nbsp;{recipe.cautions ? recipe.cautions : 'N/A'} </span>
            </div>
          </div>
          {/* Middle */}
          <div className={style.col}>
            <img src={recipe.image} className={style.recipeImage} alt="" />
          </div>
          {/* Right */}
          <div className={style.col}>
            <div className={style.dietLabels}>
              <span>Diet Labels</span>
              {
                recipe && recipe.healthLabels ? 
                recipe.healthLabels.slice().map((label, indx) => <div key={indx}> {label} </div>) : null
              }
            </div>

            <div className={style.ingredients}>
              <span>Ingredients</span>
              {
                recipe && recipe.ingredientLines ? 
                recipe.ingredientLines.slice().map((label, indx) => <div key={indx}> {label} </div>) : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Header Component
const Header = ({title, getRecipe, loading}) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    getRecipe(search);
    // setSearch("");
  }

  return (
    <nav className={style.nav}>
      <Link to="/recipes">
        <button type="button" className={style.navArrow}><i className="fas fa-arrow-left"></i></button>
      </Link>

      <h3 className={style.navTitle}>{title}</h3>

      <form onSubmit={handleSubmit}>
        <Loading status={loading} />
        <input className={style.headerForm} type="search" placeholder="Search Recipes..." value={search} onChange={handleChange} />
        <button className={style.headerBtn} type="submit">Search <i className= {`fas fa-search ${style.navSearch}`}></i></button>
      </form>
    </nav>
  )
}

export default RecipePage;
