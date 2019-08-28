import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Basket from '../components/basket/basket';
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';
import MobileNavigation from '../components/ui/mobile/MobileNavigation';

const PublicRoute = ({ userType, isAuth, component: Component, path, ...rest }) => (
  <Route 
      {...rest} 
      component={(props) => {
        const { from } = props.location.state || { from: { pathname: '/' } }; 

        return (
          isAuth && userType === 'admin'
          ? (
            <Redirect to="/dashboard"/>
          ) 
          : (isAuth && userType === 'client') && (path === '/signup' || path === '/signin' || path === '/forgot_password')
          ? (
            <Redirect to={from}/>
          ) 
          : (
            <>
              {window.screen.width <= 480 ? (<MobileNavigation path={path} />) : <Navigation path={path} />}
              <Basket />
              <main className="content">
                <Component {...props} />
              </main>
              <Footer />
            </>
          )
        );
      }}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && !!auth.type,
  userType: auth.type
});

export default connect(mapStateToProps)(PublicRoute);
