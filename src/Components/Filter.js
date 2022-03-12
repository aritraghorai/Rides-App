import React, { useEffect, useState } from "react";
import "../Style/Filter.scss";
export default function Filter(props) {
  useEffect(() => {
    search();
  });
  const [citySearch, setCitySearch] = useState("");
  //*For Search State
  const [stateSearch, setStateSearch] = useState("");
  const search = () => {
    props.setSearch(citySearch, stateSearch);
  };
  return (
    <>
      {props.showFilter && (
        <div className="fl">
          <div className="name">Filter</div>
          <select
            name="State"
            id="State"
            onChange={(e) => {
              setStateSearch(e.target.value);
            }}
            required
          >
            <option value="">State</option>
            {[...props.state].map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          <select
            name="City"
            id="City"
            onChange={(e) => {
              setCitySearch(e.target.value);
            }}
            required
          >
            <option value="">City</option>
            {[...props.city].map((ele) => {
              return (
                <option key={ele} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
}
