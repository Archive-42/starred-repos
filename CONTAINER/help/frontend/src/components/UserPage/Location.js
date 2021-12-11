import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from "@googlemaps/js-api-loader"

import './Location.css'


const Location = (props) => {
  const person = useSelector(state => state.users.person)

  const mapOptions = {
    disableDefaultUI: true
  }

  const loader = new Loader({
    apiKey: props.apiKey,
    version: "weekly",
  });
  let map;
  const google = window.google = window.google ? window.google : {}
  loader.load().then(() => {
    const myLatLng = { lat: person.lat, lng: person.lng };
    map = new google.maps.Map(document.getElementById("location-body-map"), {
      center: myLatLng,
      zoom: 12,
      options: mapOptions
    });
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  });

  return (
    <div className='location-container'>
      <h1 className='location-title'>Location</h1>
      <div id='location-body-map'></div>
    </div>
  )
}

export default Location;