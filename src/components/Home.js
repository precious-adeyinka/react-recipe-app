import React from "react";
import Preloader from "./Preloader";
import {Link} from "react-router-dom";

import style from "../styles/home.module.css";

const Home = () => {
  return (
    <div className="App">
      <Preloader />
      <div className={style.main}>
        <div className={style.layout}>
          <div className={style.col5}>
            <div className={style.logo}>
              K
            </div>

            <div className={style.social}>
              <div className={style.socialLink}>Facebook</div>
              <div className={style.socialLink}>Instagram</div>
              <div className={style.socialLink}>Twitter</div>
            </div>
          </div>
          <div className={style.col50}>
            <div className={style.wrapper}></div>
            <Navbar />
            <div className={style.content}>
              {/* <h1 className={style.title}>Kitchen Plaza</h1> */}
              <p>lorem ispum dononor ispum dononorispum dononorispum dononorispum dononorispum dononor
              ispum dononorispum dononorispum dononorispum dononorispum dononorispum dononor
              ispum dononorispum dononorispum dononor.</p>
            </div>
            {/* <div className={style.explore}>
              <span>Explore Our Recipes</span>
            </div> */}
          </div>
          <div className={style.col45}>
            <div className={style.play}><i className="fa fa-play"></i></div>
          </div>
        </div>
      </div>
      <div className={style.explore}>
        <span>Explore Our Recipes</span>
        <div className={style.exploreBtns}>
          <i className="fi-xnslxl-chevron-solid"></i>
          <i className="fi-xnsrxl-chevron-solid"></i>
          {/* <i className="fa fa-angle-left"></i> */}
          {/* <i className="fa fa-angle-right"></i> */}
        </div>
      </div>
      
      {/* Title */}
      <h1 className={style.title}>Kitchen Plaza</h1>
    </div>
  );
};

const Navbar = () => {
  const linkStyle = {
    textDecoration: 'none'
  }
  return(
    <nav className={style.nav}>
      {/* <a className={style.navLogo}>Logo</a> */}

      <ul className={style.navLinks}>
        <Link style={linkStyle} to="/home">
          <li className={style.navLink}>Home</li>
        </Link>
        <Link style={linkStyle} to="/about">
          <li className={style.navLink}>About</li>
        </Link>
        <Link style={linkStyle} to="/location">
          <li className={style.navLink}>Location</li>
        </Link>
        <Link style={linkStyle} to="/recipes">
          <li className={style.navLink}>Recipes</li>
        </Link>
        <Link style={linkStyle} to="/contact">
          <li className={style.navLink}>Contact</li>
        </Link>
      </ul>

      {/* <i className="fa fa-search"></i> */}
      <i className="fi-xnluhl-magnifying-glass"></i>
    </nav>
  );
};

export default Home;
