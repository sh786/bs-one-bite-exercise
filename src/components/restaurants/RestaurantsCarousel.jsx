import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft
} from "@fortawesome/free-solid-svg-icons";
import "./Restaurants.scss";
import dave from "../../assets/dave.png";

const RestaurantsCarousel = ({ label, restaurants }) => {
  const [currentSubset, setCurrentSubset] = useState(
    [...restaurants].slice(0, 4)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCircular, setIsCircular] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1030);

  const throttledHandleWindowResize = () => {
    setIsMobile(window.innerWidth < 1030);
  };

  useEffect(() => {
    window.addEventListener("resize", throttledHandleWindowResize);
    console.log(`Current Index: ${currentIndex}`);
    if (isMobile) {
      setCurrentSubset([...restaurants]);
    } else {
      if (currentIndex >= restaurants.length - 3) {
        setCurrentSubset(
          [...restaurants]
            .slice(currentIndex, restaurants.length)
            .concat([...restaurants].slice(0, 3))
            .slice(0, 4)
        );
      } else {
        setCurrentSubset(
          [...restaurants].slice(currentIndex, currentIndex + 4)
        );
      }
    }
  }, [isMobile, currentIndex, restaurants]);

  const handleNext = event => {
    if (!isCircular) setIsCircular(true);
    if (currentIndex >= restaurants.length - 3) {
      setCurrentIndex(currentIndex - restaurants.length + 3);
    } else {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = event => {
    if (currentIndex <= 2) {
      setCurrentIndex(currentIndex + restaurants.length - 3);
    } else {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <React.Fragment>
      <h2>
        {label}{" "}
        <NavLink to="restaurants/see-all" className="see-all">
          <span>See all</span>
        </NavLink>
      </h2>
      <div className="restaurants-carousel-container">
        {currentSubset.map((rest, i) => {
          if (i < currentSubset.length - 1) {
            const restaurantItem = (
              <div className={"restaurant-carousel-item"} key={i}>
                <img
                  src={rest.imageUrl}
                  alt={rest.name}
                  className="restaurant-carousel-img"
                />
                <div className="after" />
                <div className="restaurant-carousel-info">
                  <span>{rest.name}</span>
                  <span className="restaurant-carousel-address">
                    {rest.address1}
                  </span>
                </div>
                <div className="restaurant-carousel-rating">
                  <img src={dave} alt="Dave" />
                  <span className="score">
                    {rest.reviewStats.dave.averageScore}
                  </span>
                </div>
                {i === 0 && (currentIndex !== 0 || isCircular) ? (
                  <div className="restaurant-carousel-next-prev">
                    <button
                      className="next-prev-button prev"
                      onClick={handlePrev}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  </div>
                ) : null}
              </div>
            );
            return restaurantItem;
          } else {
            return (
              <div className={"restaurant-carousel-item half"} key={i}>
                <img
                  src={rest.imageUrl}
                  alt={rest.name}
                  className="restaurant-carousel-img"
                />
                <div className="after" />
                <div className="restaurant-carousel-info">
                  <span>{rest.name}</span>
                  <span className="restaurant-carousel-address">
                    {rest.address1}
                  </span>
                </div>
                <div className="restaurant-carousel-rating">
                  <img src={dave} alt="Dave" />
                  <span className="score">
                    {rest.reviewStats.dave.averageScore}
                  </span>
                </div>
                <div className="restaurant-carousel-next-prev">
                  <button className="next-prev-button" onClick={handleNext}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
};

export default RestaurantsCarousel;
