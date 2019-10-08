import React, { useState, useEffect } from "react";
import RestaurantsCarousel from "./RestaurantsCarousel";
import "./Restaurants.scss";

const Restaurants = ({ loc }) => {
  // NOTE: Given the param limit of 100 given I will not change that
  // request, but the carousel would likely incorporate lazy loading
  // with smaller limit values and resultsPage param

  const [restaurants, setRestaurants] = useState({});
  const [isRestaurantsLoaded, setIsRestaurantsLoaded] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch(
        `https://api.onebite.app/venue?lat=${loc.lat}&lon=-${
          loc.lon
        }&limit=100&dave=1&scoreMin=9`
      );

      response.json().then(data => {
        setRestaurants(data);
        setIsRestaurantsLoaded(true);
      });
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="restaurants-content">
      <h1>Top Pizza Restaurants</h1>
      {isRestaurantsLoaded ? (
        <RestaurantsCarousel
          label="Dave's Favorites"
          restaurants={restaurants}
        />
      ) : (
        <p>Loading restaurants...</p>
      )}
    </div>
  );
};

export default Restaurants;
