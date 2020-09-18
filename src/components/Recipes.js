import React, {useState, useEffect} from "react";
import style from "../styles/search.module.css";
import Loading from "./Loading";
import Preloader from "./Preloader";

import apple from "../images/apple.svg";
import banana from "../images/bananas.svg";
import orange from "../images/orange.svg";
import watermelon from "../images/watermelon.svg";

import {Link} from "react-router-dom";

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(search);
  const [loading, setLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => { 
    isLoading();
    hidePreloader();
  }, [search]);

  // Hide Preloader
  const hidePreloader = () => {
    setTimeout(() => { if(_e('.preloader')) _e(".preloader").classList.add("hide");}, 5000);
  };
  // Get DOM elements
  const _e = (elem) => {
    return document.querySelector(elem);
  };

  const getRecipes = async () => {
    if(search === ""){
      window.swal({
        title: "Oops!!",
        text: "Invalid recipe name!",
        icon: "info"
      })
    }
    const APP_ID = "ed707ad1";
    const APP_KEY = "e3a89a43c26726e0027532c409dcf78b";

    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    
    // console.log("response", await response.json());

    const data = await response.json();
    if (data.hits.length === 0) {
      window.swal({
        title: "Oops!!",
        text: "No result found for '" + search + "'",
        icon: "info"
      });
      setLoading(true);
      return false;
    } else {
      setRecipes(data.hits);
      setLoading(false);
      // Clear the query for the next search
      setQuery("");
      // console.log(data.hits);
    }
  };

  const onSearchChange = (val) => {
    // Update Search Value in the state
    setSearch(val);
  };

  const getSearch = (e) => {
    e.preventDefault();

    if (search !== "") {
       // Clear recipes list
    setRecipes([]);

    setLoading(true);
    getRecipes();

    setQuery(search);
    // setSearch("");

    setSearchMessage("Hunting down recipes, hang on!");
    } 
    else {
      window.swal({
        title: "Oops!",
        text: "Please Enter a Recipe Name",
        icon: "info"
      });
      return false;
    }
  };

  const isLoading = () => {
    if (loading === true) {
      setRecipes([]);
    }
  };


  return (
    <div className={style.search}>
      <Preloader />
      <Header />
      <Body 
      loading={loading} 
      recipes={recipes} 
      search={search}  
      getSearch={getSearch} 
      onSearchChange={onSearchChange}
      searchMessage ={searchMessage}
      />
    </div>
  )
}

const Header = () => {
  return(
    <div className={style.header}>
      <div className={style.bubbles}>
        <img src={apple} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={orange} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={banana} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={watermelon} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={apple} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={orange} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={banana} className={`${style.bubble} fab fa-apple`} alt="" />
      </div>
    </div>
  )
}

const Body = ({ recipes, loading, search, getSearch, onSearchChange, searchMessage }) => {
  return(
    <div className={style.body}>
      <div className={style.main}>
        <div className={style.searchPane}>
          <SearchEngine search={search} getSearch={getSearch} onSearchChange={onSearchChange} />
        </div>
        <div className={style.resultPane}>
          <div className={style.resultPaneContent}>
            {
              recipes.length === 0 ? <NoRecipe searchMessage={searchMessage} /> : () => {
                recipes.map(recipe => {
                  return (<Recipe key={recipe.recipe.uri} recipe={recipe.recipe} />)
                })
              }
            }

            <Loading status={loading} />
            {
              recipes.map(recipe => {
                return (<Recipe key={recipe.recipe.uri} recipe={recipe.recipe} />)
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const Recipe = ({recipe}) => {
  const styledLink = {
    textDecoration: 'none'
  }
  
  return (
    <div className={style.recipe}>
      <div className={style.recipeName}><Link style={styledLink} to={`/recipes/${recipe.label}`}>{recipe.label}</Link></div>

      <div className={style.recipeBy}>{recipe.source}.</div>
      <img src={recipe.image} alt="" className={style.recipeImage} />

      <div className={style.recipeRow}>
        <div className={style.recipeCol}>
          <div className={style.recipeColTitle}>Cautions</div>
          <div className={style.recipeColSubtitle}>{recipe.cautions[0] || "N/A"}</div>
        </div>

        <div className={style.recipeCol}>
          <div className={style.recipeColTitle}>Time</div>
          <div className={style.recipeColSubtitle}>{recipe.totalTime} mins</div>
        </div>

        <div className={style.recipeCol}>
          <div className={style.recipeColTitle}>Calories</div>
          <div className={style.recipeColSubtitle}>{recipe.calories}</div>
        </div>
      </div>
    </div>
  )
};

const SearchEngine = ({ search, getSearch, onSearchChange }) => {
  const updateSearch = (e) => {
    // if (e.target.value === "") {
    //   window.swal({
    //     title: "Oops!!",
    //     text: "You must enter atleast one recipe name to search!",
    //     icon: "info"
    //   });
    //   return false;
    // } else {
      onSearchChange(e.target.value);
    // }
  };

  return (
    <div className={style.searchEngine}>
      <form onSubmit={getSearch}>
        <div className={style.formGroup}>
          <input type="text"  placeholder="Search" value={search} onChange={updateSearch} />
          <i className="fas fa-search"></i>
        </div>

        <label htmlFor="dishType">Dish Type</label>
        <Dropdown options={["Dish","Hungry","Today"]} id="dishType" />

        <label htmlFor="mealType">Meal Type</label>
        <Dropdown options={["Meal", "meal Type 2","Meal Type 3"]} id="MealType" />

        <label htmlFor="productType">Product Type</label>
        <Dropdown options={["Any", "Product 1","Product 2"]} id="productType" />

        <label htmlFor="culinarySetting">Culinary Setting</label>
        <Checkbox boxs={[["Home", "active"], "FoodService"]} id="culinarySetting" />

        <label htmlFor="Difficulty">Difficulty</label>
        <Checkbox boxs={[["Easy", "active"], "Medium", "Hard"]} id="Difficulty" />

        <button className={style.searchEngineSubmitButton}>Search</button>

      </form>
    </div>
  )
}

const Dropdown = ({options, id}) => {
  const [menu, setMenu] = useState("close");
  const [menuText, setMenuText] = useState(undefined);

  const handleClick = (e) => {
    if(menu === "close") {
      setMenu("open");
    }
    else {
      setMenu("close");
    }
  }

  const handleMenuClick = (e) => {
    window.swal({
      title: "Oops!",
      text: "This feature is still under development, come back soon!",
      icon: "info"
    });

    setMenuText(e.target.textContent);
    handleClick();
  }

  return (
    <div className={style.dropdown} id={id}>
      <div className={style.dropdownText} onClick={handleClick}>
        <div>{ menuText ? menuText : options[0]}</div>
        <i className="fa fa-angle-down"></i>
      </div>
      
      <div className={`${menu === "close" ? style.close : style.open} ${style.dropdownMenu}`}>
        {
          options.map( option => {
            return (<div key={option} className={style.menu} onClick={handleMenuClick}>{option}</div>)
          })
        }
      </div>
    </div>
  )
}

const Checkbox = ({boxs}) => {
  const handleClick = e => {
    let boxes = e.target.parentElement.querySelectorAll('[class*="search_box"]');
    boxes.forEach((box)=> {
      box.className = 'search_box__2VCRS';
    });
    e.target.className = 'search_boxActive__3pNJL search_box__2VCRS';

    window.swal({
      title: "Oops!",
      text: "This feature is still under development, come back soon!",
      icon: "info"
    });
  }

  return (
    <div className={style.checkbox}>
      {
        boxs.map(box => {
          if(typeof(box) === "object"){
            return (<div onClick={handleClick} key={box} className={typeof(box) == "object" ? style.boxActive + " " + style.box : style.box}>{box[0]}</div>)
          }
          else {
            return (<div onClick={handleClick} key={box} className={typeof(box) == "object" ? style.boxActive + " " + style.box : style.box}>{box}</div>)
          }
        })
      }
    </div>
  )
}

const NoRecipe = ({searchMessage}) => {
  return(
    <div className={style.noRecipe}>
      <i className="fas fa-cloud-meatball"></i>
      <h5>{ searchMessage ? searchMessage : "Your search result will show up here when it is ready!" }</h5>
    </div>
  )
}
export default Search;