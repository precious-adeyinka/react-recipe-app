import React from "react";
import style from "../styles/preloader.module.css";
import apple from "../images/apple.svg";
import banana from "../images/bananas.svg";
import orange from "../images/orange.svg";
import watermelon from "../images/watermelon.svg";

const Preloader = () => {
  return (
    <div className={`preloader ${style.preloader}`}>
      <div className={style.bubbles}>
        <img src={apple} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={orange} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={banana} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={watermelon} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={apple} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={orange} className={`${style.bubble} fab fa-apple`} alt="" />
        <img src={banana} className={`${style.bubble} fab fa-apple`} alt="" />
      </div>

      {/* <div className={style.title}>Hunting Down Recipes...</div> */}
    </div>
  )
}
export default Preloader;