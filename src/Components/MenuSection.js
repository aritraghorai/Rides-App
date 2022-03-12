import React from "react";
import filter_logo from "../assets/filterLogo.svg";
import "../Style/MenuSection.scss";
import { Link } from "react-router-dom";
import CardView from "./CardView";
import Filter from "./Filter";
export default function MenuSection(props) {
  const { bu1, bu2, bu3 } = props.activeButtom;
  const filter = (ci, st) => {
    props.setSC(ci);
    props.setSS(st);
  };
  return (
    <div>
      <div className="container">
        <menu className="menu">
          <div>
            <ul className="left-menu">
              <li
                onClick={() => {
                  props.changeActiveButtom({
                    bu1: true,
                    bu2: false,
                    bu3: false,
                  });
                }}
                className={`menus ${bu1 ? "active" : ""}`}
              >
                <Link to="/">Nearest rides ({props.data.length})</Link>
              </li>
              <li
                onClick={() => {
                  props.changeActiveButtom({
                    bu1: false,
                    bu2: true,
                    bu3: false,
                  });
                }}
                className={`menus ${bu2 ? "active" : ""}`}
              >
                <Link to="/upcoming-rides">Upcoming rides</Link>
              </li>
              <li
                onClick={() => {
                  props.changeActiveButtom({
                    bu1: false,
                    bu2: false,
                    bu3: true,
                  });
                }}
                className={`menus ${bu3 ? "active" : ""}`}
              >
                <Link to="/">Past rides</Link>
              </li>
            </ul>
          </div>
          <div className="right-menu">
            <div className="filter-logo">
              <img
                src={filter_logo}
                alt=""
                onClick={() => {
                  props.hasFilter();
                }}
              />
              <div className="filter">
                <Filter
                  showFilter={props.filter}
                  city={props.city}
                  state={props.state}
                  setSearch={filter}
                />
              </div>
            </div>
            <div
              className="filter-name"
              onClick={() => {
                props.hasFilter();
              }}
            >
              Filters
            </div>
          </div>
        </menu>
        <div className="destinations">
          {props.data.map((ele) => {
            return <CardView data={ele} key={ele.id + ele.station_path} />;
          })}
        </div>
      </div>
    </div>
  );
}
