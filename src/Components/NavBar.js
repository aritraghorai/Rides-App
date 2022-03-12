import React from "react";
import userLogo from "../assets/userName.svg";
import "../Style/NavBar.scss";
export default function NavBar(props) {
  const { name, url } = props.user;
  return (
    <>
      <nav className="NavBar">
        <div className="brandLogo">Edvora</div>
        <div className="user">
          <div className="UserName">{`${name ?? "Aritra Ghorai"}`}</div>
          <div className="userLogo">
            <img src={url ?? userLogo} alt="" />
          </div>
        </div>
      </nav>
    </>
  );
}
