import React from "react";
// import location_pic from "../assets/location_pic.svg";
import "../Style/CardView.scss";
export default function CardView(props) {
  const {
    map_url,
    id,
    origin_station_code,
    station_path,
    date,
    city,
    state,
    destination_station_code,
  } = props.data;

  return (
    <div className="card">
      <div className="location-pic">
        <img src={map_url} alt="" />
      </div>
      <div className="details">
        <div className="ride-id">
          <p>Ride Id:</p> {id}
        </div>
        <div className="Origin-Station">
          <p>Origin Station:</p>
          {origin_station_code}
        </div>
        <div className="station-path">
          <p>station_path :</p>
          {JSON.stringify(station_path)}
        </div>
        <div className="date">
          <p>Date:</p>
          {date}
        </div>
        <div className="distance">
          <p>Distance :</p> {destination_station_code - origin_station_code}
        </div>
      </div>
      <div className="location-details">
        <div className="cityName">{city}</div>
        <div className="state-name">{state}</div>
      </div>
    </div>
  );
}
