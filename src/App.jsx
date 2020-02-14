import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Restaurants from './components/restaurants/Restaurants';
import Header from './components/header/Header';

const App = () => {
  // At this level, we would likely want to fetch user's loc data
  // and pass down to children... I'll just mock that concept below.
  // Likely would actually be fetched from a Redux store (or other
  // state management implementation)
  const [userLoc, setUserLoc] = useState({});
  const [isUserLocLoaded, setIsUserLocLoaded] = useState(false);

  const mockLoc = {
    lat: 40.74,
    lon: -73.98,
  };

  useEffect(() => {
    const getUserLoc = async () => {
      // mock 5ms userLoc fetch
      const response = await setTimeout(() => {
        setUserLoc(mockLoc);
        setIsUserLocLoaded(true);
      }, 5);
    };

    getUserLoc();
  }, [mockLoc]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        {isUserLocLoaded ? (
          <Switch>
            <Redirect from='/' to='/restaurants' />
            <Redirect from='/bs-one-bite-exercise' to='/restaurants' />
            <Route
              path={['/restaurants', '/restaurants/:category']}
              exact
              render={() => <Restaurants loc={userLoc} />}
            />
            <Route render={() => <p>No route matched.</p>} />
          </Switch>
        ) : (
          <p>Loading user location...</p>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
