import './ExperienceBox.css';
import '../box.css';
import { useEffect, useRef, useState } from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const ExperienceBox = ({yOffset, slideIn, mobile}) => {

    const list = useRef();
    const barRef = useRef();
    const detailsListRef = useRef();
    const [active, setActive] = useState(0);
    const [activeDetails, setActiveDetails] = useState();
    const [detailAnimationDelays, setDetailAnimationDelays] = useState([0, 0.1]);
    const [detailsShowing, setDetailsShowing] = useState(true);
    const yOffsetReq = mobile ? 161 : 451;

    const experience = {
        hexaware: {
            name: 'Hexaware',
            location: 'McLean, VA',
            title: 'Associate Software Engineer',
            from: 'February 2022',
            to: 'present',
            info: [
                "Completed specialized Java training provided by Hexaware.", 
                "Deployed to a project in service to a client. Developed web solutions for real estate organization using Java, JavaScript, and Hibernate."
            ]
        },
        castle_logistics: {
            name: 'Castle Logistics',
            location: 'Remote, WA',
            title: 'Full Stack Web Developer',
            from: 'June 2021',
            to: 'August 2021',
            info: [
                "Worked closely with client to design a functioning web application for mobile and desktop.",
                "Implemented necessary features including fillable forms, login and registration, and email systems.",
                "Designed and implemented the front end using the Java Spring framework, back end using MySQL.",
                "Deployed with AWS"
            ]
        },
        coding_dojo: {
            name: 'Coding Dojo',
            location: 'Bellevue, WA',
            title: 'Software Engineer in Training',
            from: 'January 2021',
            to: 'May 2021',
            info: [
                "Projects available on my GitHub.",
                "Shadowed craft experts and supervisors to learn a wide range of simple and complex techniques.",
                "Worked alongside senior team members to learn all related job tasks and roles.",
                "Maintained organization, cleanliness and safety in all work areas.",
                "Interacted with supervisor and various experts to address escalated issues.",
                "Collaborated on various projects and assignments via GitHub."
            ]
        }
        
    }

    useEffect(() => {
        setActiveDetails(experience.hexaware);
    }, [])

    useEffect(() => {
        
        let barElement = barRef.current;

        if(barElement) {
            barRef.current.style.top = list.current.children[active].offsetTop + list.current.children[active].offsetHeight / 15;
            barRef.current.style.height = list.current.children[active].offsetHeight;
        }
    }, [window.innerWidth, window.innerHeight])
    
    useEffect(() => {
        
        if(activeDetails) {
            getAnimationDelays();
        }
        setDetailsShowing(true);
            
    }, [activeDetails])


    const handleClick = (item) => {
        setActive(Object.keys(experience).indexOf(item));
        setActiveDetails(experience[item]);
        setDetailsShowing(false);
    }
    const getAnimationDelays = () => {
        let detailAnimDelays = [];

        let details = activeDetails.info;
        
        for(let i = 0; i < details.length; i++) {
            detailAnimDelays[i] = i * 0.1;
        }

        setDetailAnimationDelays(detailAnimDelays);

    }
    const fadeIn = (del) => {
        return {
            opacity: 1, 
            transition: {
                damping: 100, 
                duration: 1, 
                ease: "easeOut",
                delay: del
            }
        };
    }
    const slideUp = (detail) => {

        let animDelay = detailAnimationDelays[activeDetails.info.indexOf(detail)];

        return {
            y: 0,
            opacity: 1, 
            transition: {
                damping: 100, 
                duration: 0.7, 
                ease: "easeOut",
                delay: animDelay
            }
        };
    }

    const bar = !mobile ? () => {return <section ref={barRef} className='bar' style={{top: list.current.children[active].offsetTop + list.current.children[active].offsetHeight / 15, height: list.current.children[active].offsetHeight}}></section>}
                : () => {return <section ref={barRef} className='bar horizontal' style={{left: list.current.children[active].offsetLeft, width: list.current.children[active].offsetWidth}}></section>}


    return(<>
            <AnimatePresence>
                {yOffset > yOffsetReq && <motion.div className='eBox box' initial={{y: "8vh"}} animate={slideIn}>
                    <h2 className='subHeader'>Experience</h2>
                    {list.current && bar()}
                    <ul className='experienceList' ref={list}>
                        {Object.keys(experience).map((item, key) => {
                            return <li key={key} onClick={(e) => {handleClick(item)}}>{experience[item].name}</li>
                        })}
                    </ul>
                    {activeDetails && <div className='experienceDetails'>
                            <motion.p className='experienceTitle'>{activeDetails.title} @ <span className='bold'>{activeDetails.name}</span></motion.p>
                            <motion.p className='experienceFromTo' initial={{opacity: 0}} animate={fadeIn(0.2)}>{activeDetails.from} - {activeDetails.to}</motion.p>
                            {detailsShowing && <ul ref={detailsListRef} className="experienceDetailsList">
                                {activeDetails.info.map((detail, key) => {
                                    return <motion.li key={key} className='experienceDetail' initial={{y: "100px", opacity: 0}} animate={slideUp(detail)}>{detail}</motion.li>
                                })}
                            </ul>}
                    </div>}
                </motion.div>}`
            </AnimatePresence>
            
    </>)
}

export default ExperienceBox;