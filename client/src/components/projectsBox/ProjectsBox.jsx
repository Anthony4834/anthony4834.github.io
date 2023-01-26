import { AnimatePresence, motion } from "framer-motion";
import '../box.css';
import './ProjectsBox.css';
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import arrow from '../../arrow.png';

const ProjectsBox = ({slideIn, yOffset, mobile, subHeader}) => {

    const yOffsetReq = mobile ? 50 : 100;


    const settings = {
        dots: false,
        lazyLoad: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: mobile ? true : false,
        nextArrow: <img src={arrow} alt="" />,
        prevArrow: <img src={arrow} alt="" />
    };

    return(<><AnimatePresence>
        {yOffset >= yOffsetReq && <motion.div 
            className="box projectsBox"
            initial={{y: '8vh', opacity: 0, }}
            animate={{...slideIn, opacity: 1}}
            exit={{opacity: 0}}>
                <h2 className="subHeader">{subHeader}</h2>
                <Slider {...settings} centerPadding={0}>
                    <a href="http://54.202.53.15" target={"_blank"}><p className="ulDetails castle-logistics">
                        Designed and developed a full-stack
                        web application for a local logistics client using Java, MySQL, and JavaScript. <br/>Deployed with AWS.
                    </p></a>
                    <a href="https://github.com/Anthony4834/Bokemon" target={"_blank"}><p className="ulDetails bokemon">
                        Early development video game "Bokemon" using Java and PokeApi featuring 800+ monsters to battle and capture.
                        Based off an officially licensed game of a similar name.
                    </p></a>
                </Slider>
        </motion.div>}
    </AnimatePresence></>
    )
}

export default ProjectsBox;
