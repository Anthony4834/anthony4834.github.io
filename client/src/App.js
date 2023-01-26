import './App.css';
import { useEffect, useState } from 'react';
import IntroBox from './components/introBox/IntroBox';
import ProjectsBox from './components/projectsBox/ProjectsBox';
import arrow from './arrow.png';
import {AnimatePresence, motion} from 'framer-motion';
import ExperienceBox from './components/experienceBox/ExperienceBox';
import Footer from './components/footer/footer';
import AboutBox from './components/AboutBox/AboutBox';

function App() {

  const [yOffset, setYOffset] = useState(window.pageYOffset);
  const slideIn = {y: "0px", transition: {damping: 100, duration: "1", ease: "easeOut"}};
  const [mobile, setMobile] = useState(false);


  const updateScroll = () => {
    setYOffset(window.pageYOffset);
  }
  

  const arrowOffsetReq = () => {
    return mobile ? 50 : 100;
  }

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    setMobile(window.innerWidth < 720 ? true : false);
    document.title = "Anthony"
  }, [])

  const bouncingArrow = <AnimatePresence>
    <motion.img
      initial={{y: '0', opacity: 0.2}}
      animate={{y: '1vh', opacity: 1, transition: {
        repeat: Infinity,
        repeatType: 'reverse',
        duration: '1'
      }}}
      exit={{opacity: 0}}
      className='arrow' src={arrow}/>
  </AnimatePresence>

  return (
    <div className="App">
      {/* <p id="offset">{yOffset}</p> */}
      <IntroBox slideIn={slideIn} subHeader={"I build things with code"}/>
      {yOffset < arrowOffsetReq() && bouncingArrow}
      <ProjectsBox slideIn={slideIn} yOffset={yOffset} mobile={mobile} subHeader={"Projects"}/>
      <ExperienceBox yOffset={yOffset} slideIn={slideIn} mobile={mobile} subHeader={"Experience"}/>
      <AboutBox slideIn={slideIn} yOffset={yOffset} mobile={mobile} subHeader={"About"}/>
    </div>
  );
}

export default App;
