/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import MenuSection from "./Components/MenuSection";
import NavBar from "./Components/NavBar";
import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function App() {
  const [statesForMenu, setStatesForMenu] = useState(new Set());
  const [citysForMenu, setcitysForMenu] = useState(new Set());

  //*Use State For Menu UnderLine
  const [Active, setActive] = useState({ bu1: true, bu2: false, bu3: false });
  //*Use State For Fetch Ride Data From Api
  const [Data, setData] = useState([]);
  //*Use State For Fetch User Data From Api
  let userDataRef = useRef().current;
  const [user, setUser] = useState({});
  //*Change Filter State
  const [filter, setfilter] = useState(false);
  //*Filter Change Function
  const chageStateOfFilter = () => {
    setfilter(!filter);
  };
  //*For City Search
  const [citySearch, setCitySearch] = useState(" ");
  //*For Search State
  const [stateSearch, setStateSearch] = useState(" ");

  //*Search

  const searchFil = () => {
    if (!filter) return [];
    let newFilData = Data.filter((element) => {
      if (citySearch === "" || stateSearch === "")
        return element.city === citySearch || element.state === stateSearch;
      return element.city === citySearch && element.state === stateSearch;
    });
    return newFilData;
  };
  //*Search Function

  //*Fetch User Data Function
  const fetchUser = async () => {
    const data = await fetch("https://assessment.api.vweb.app/user");
    let userData = await data.json();
    userDataRef = userData;
    setUser(userDataRef);
  };
  //*Fetch Data Function
  const fetchData = async () => {
    let data = await fetch("https://assessment.api.vweb.app/rides");
    const parsedata = await data.json();
    const newData = await sortData(parsedata);
    const state = new Set();
    const city = new Set();
    newData.forEach((element) => {
      state.add(element.state);
      city.add(element.city);
    });
    setStatesForMenu(state);
    setcitysForMenu(city);
    setData(newData);
  };
  //* Sort Data Function
  const sortData = (d) => {
    const newData = d.sort((a, b) => {
      return sortParam(a.station_path) - sortParam(b.station_path);
    });

    return newData;
  };
  //*Get Sorting param function
  const sortParam = (arr, path = userDataRef.station_code) => {
    let minN = 10000;
    for (let a of arr) {
      minN = Math.min(Math.abs(path - a), minN);
    }
    return minN;
  };

  //*Use Effect Hook For Data Call After Component Mount

  useEffect(() => {
    fetchUser();
    fetchData();
  }, []);

  return (
    <div className="App">
      <NavBar user={user}></NavBar>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MenuSection
              filter={filter}
              state={statesForMenu}
              city={citysForMenu}
              hasFilter={chageStateOfFilter}
              data={filter ? searchFil(Data) : Data}
              changeActiveButtom={setActive}
              activeButtom={Active}
              setSC={setCitySearch}
              setSS={setStateSearch}
            />
          }
        />
        <Route
          exact
          path="/upcoming-rides"
          element={
            <MenuSection
              filter={filter}
              state={statesForMenu}
              city={citysForMenu}
              hasFilter={chageStateOfFilter}
              data={Data}
              changeActiveButtom={setActive}
              activeButtom={Active}
              setSC={setCitySearch}
              setSS={setStateSearch}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
