import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Logo from './partials/Logo';
import SearchBar from '../search';
var CryptoJS = require("crypto-js");

/* 
const decrypt = (username) => {

  // decrypt username
  let backAgain_username = urlCrypt.decryptObj(username);
  let bytes_username = CryptoJS.AES.decrypt(backAgain_username, 'my-secret-key@123');
  let decryptedData_username = JSON.parse(bytes_username.toString(CryptoJS.enc.Utf8));

} */

function myFunction() {
  let decryptedData_username = localStorage.getItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T');

  if (decryptedData_username) {

    //decrypted 
    var bytes = CryptoJS.AES.decrypt(decryptedData_username, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;

  }
  else
    return null;


}

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}



let isConnected = false;
const token = localStorage.getItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH');
//let username = localStorage.getItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T');
let username = myFunction();




token ? isConnected = true : isConnected = false;

const logOutHandler = () => {
  localStorage.clear();
  window.location = '/';
}


const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: isConnected,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {




  const [isActive, setIsactive] = useState(false);
  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />

          <SearchBar />

          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner" >
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="/" onClick={closeMenu}>Home</Link>
                    </li>
                    <li>
                      <Link to="/Aboutus" onClick={closeMenu}>About us </Link>
                    </li>
                    <li>
                      <Link to="/Blogs" onClick={closeMenu}>Write-ups </Link>
                    </li>



                    <li>
                      <Link to="/contactus" onClick={closeMenu}>Contact </Link>
                    </li>
                  </ul>
                  {!hideSignin ?
                    (
                      <>
                        <ul
                          className="list-reset header-nav-right" background='rgb(164, 177, 205)'
                        >
                          <li>
                            <Link to="/Auth#/sign-in" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Sign in</Link>
                          </li>
                          <li>
                            <Link to="/Auth#/sign-up" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Sign up</Link>
                          </li>

                        </ul>
                      </>
                    )
                    :
                    <>
                      <div className=''>
                        <h3 style={{ marginLeft: "2vw", marginTop: "10vh", marginBottom: "3px" }}>Hello {username} </h3>
                        <Link to="#" style={{ marginLeft: '135px' }} onClick={logOutHandler}>Log out</Link>


                      </div>

                    </>}
                </div>
              </nav>
            </>}

        </div>

      </div>

    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
