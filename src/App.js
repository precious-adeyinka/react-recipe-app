import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./styles.css";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import RecipePage from "./components/RecipePage";

const App = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(search);
  const [recipes, setRecipes] = useState([]);
  const [appbg, setAppbg] = useState("");
  const [loading, setLoading] = useState(false);

  let swal = () => {};

  // When page reloads
  useEffect(() => {
    // getRecipes();
    isLoading();
    randBg();
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
    const APP_ID = "ed707ad1";
    const APP_KEY = "e3a89a43c26726e0027532c409dcf78b";

    const response = await fetch(
      `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    
    // console.log("response", await response.json());

    const data = await response.json();
    if (data.hits.length === 0) {
      swal({
        title: "Oops!!",
        text: "No result found for '" + search + "'",
        icon: "info"
      }).then(() => {
        swal({
          title: "Default Action",
          text: "Loading default data",
          icon: "info"
        });
      });
      setLoading(true);
      return false;
    } else {
      setRecipes(data.hits);
      setLoading(false);
      // Clear the query for the next search
      // setQuery("");
      // console.log(data.hits);
    }
  };

  const onSearchChange = (val) => {
    // Update Search Value in the state
    setSearch(val);
  };

  const getSearch = (e) => {
    e.preventDefault();

    setLoading(true);
    setAppbg(search);
    getRecipes();

    setQuery(search);
    setSearch("");


    // if (search !== "") {
    //   setAppbg(search);
    //   setQuery(search);
    //   setSearch("");

    //   setLoading(true);
    //   getRecipes();
    // } 
    // else {
    //   swal({
    //     title: "Oops!",
    //     text: "Please Enter a Recipe Name",
    //     icon: "info"
    //   });
    //   return false;
    // }
  };

  const isLoading = () => {
    if (loading === true) {
      setRecipes([]);
    }
  };

  const randBg = async () => {
    // Pixabay
    const pixabay_key = "9477522-97445c9e7a005cf194f485133";
    // const unsplashAccessKey =
    //   "42749ea869383232452b6922577d5d1ace437090b3255d7e8f62ecde663020f7";
    // const unsplashSecretKey =
    // "c1b12406d7fe4fe556547279abe2e01f8db7364b8138055f2ee05a6a5ccc3b46";

    // const keyword = [
    //   "burger",
    //   "peanut",
    //   "hotdog",
    //   "pizza",
    //   "chicken",
    //   "bread",
    //   "icecream",
    //   "fish",
    //   "cat",
    //   "meat"
    // ];
    const keyword = [
      "recipe"
    ];
    const imageTerm =
      query === ""
        ? keyword[Math.floor(Math.random() * keyword.length)]
        : query;
    // console.log(imageTerm);
    // Unsplash API
    // const response = await fetch(
    //   `https://api.unsplash.com/photos/random?query=${imageTerm}&orientation=landscape`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Accept-Version": "v1",
    //       Authorization: `Client-ID ${unsplashAccessKey}`
    //     }
    //   }
    // );

    // Pixabay API
    const response = await fetch(
      `https://pixabay.com/api/?q=${imageTerm}&min_width=768&image_type=photo&key=${pixabay_key}`,
      {
        method: "GET"
      }
    );
    const result = await response.json();
    if (result.hits.length > 0) {
      const bg = result.hits[0].largeImageURL;
      // console.log(bg);
      setAppbg(bg);
    } else {
      setAppbg(
        "https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_960_720.png"
      );
    }
  };

  return (
    <Router>
      <Switch>
      <Route
        path='/' exact
        render={(props) => (
          <Home  
            search={search}
            recipes={recipes}
            loading={loading}
            getSearch={getSearch}
            onSearchChange={onSearchChange}
            appbg={appbg}
          />
        )}
      />
        <Route path="/recipes" exact component={Recipes} />
        <Route path="/recipes/:name" component={RecipePage} />
      </Switch>
    </Router>
  );
};

export default App;
