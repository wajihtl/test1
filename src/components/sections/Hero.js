import React from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import video from "../video/Teaser.mp4"
import ReactPlayer from "react-player";

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {



  let isConnected = false;
  const token = localStorage.getItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH');
  token ? isConnected = true : isConnected = false;


  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Welcome to Securinets <span className="text-color-primary">Esprit</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="700">
                Securinets is the first national association for <span className="text-color-primary">cybersecurity</span> in Tunisia. <br></br>
                Welcome to <span className="text-color-primary">Esprit</span> branch's write-ups blog.</p>
              <div className="reveal-from-bottom" data-reveal-delay="600">

                {isConnected ? (
                  <>
                    < Button tag="a" color="primary" wideMobile href="/write">
                      Write your own
                    </Button>
                  </>
                ) :
                  <>
                    < Button tag="a" color="primary" wideMobile href="/Auth#/sign-up">
                      Get started
                    </Button>
                  </>
                }



              </div>
            </div>
            <div className="video">

              <ReactPlayer playing={true}
                playsinline
                url={video}
                loop={true}
                height='100%'
                width='100%'
              />
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;