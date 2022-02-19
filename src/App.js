import React, { useRef, useEffect } from 'react';
import { useLocation, Switch, Redirect, Route } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';
// Views 
import Home from './views/Home';
import Confirmation from './views/Confirmation';

import ContactForm from './components/contactform';
import Add from './views/write-up_page/Add';
import Login from './views/Sing-in/Login';
import About from "./components/sections/FeaturesSplit";
import Blogs from './views/BlogPage/Blogs';
import BlogPage from './views/BlogPage/BlogPage';
import Edit from './views/write-up_page/Edit';
import BlogsParCategory from './views/BlogPage/BlogsParCategory';


// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();
  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  let isConnected;
  const token = localStorage.getItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH');
  token ? isConnected = true : isConnected = false;
  //  isConnected ? console.timeLog("not connected") : window.location = '/contactus';
  return (

    <ScrollReveal

      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
          <Route exact path="/contactus">
            {isConnected ? <AppRoute component={ContactForm} layout={LayoutDefault} /> : <Redirect to="/Auth#/sign-up" />}
          </Route>
          <Route exact path="/write">
            {isConnected ? <AppRoute component={Add} layout={LayoutDefault} /> : <Redirect to="/Auth#/sign-up" />}
          </Route>
          <Route exact path="/Blogs/Edit/:id">
            {isConnected ? <AppRoute component={Edit} layout={LayoutDefault} /> : <Redirect to="/Auth#/sign-up" />}
          </Route>
          <AppRoute exact path="/Aboutus" component={About} layout={LayoutDefault} />
          <AppRoute exact path="/Blogs" component={Blogs} layout={LayoutDefault} />
          <AppRoute exact path="/Blogs/Category/:category" component={BlogsParCategory} layout={LayoutDefault} />
          <AppRoute exact path="/Blogs/:id" component={BlogPage} layout={LayoutDefault} />
          <AppRoute exact path="/Auth" component={Login} />
          <AppRoute exact path="/confirmation/:ActivateAccount" component={Confirmation} />


        </Switch>

      )}


    />


  );
}

export default App;


