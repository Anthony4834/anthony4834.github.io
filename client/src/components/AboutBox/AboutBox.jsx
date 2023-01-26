import { AnimatePresence, motion } from 'framer-motion';
import './AboutBox.css';

const AboutBox = ({slideIn, yOffset, mobile, subHeader}) => {

    const yOffsetReq = mobile ? 50 : 976;

    return (
        <>
            <AnimatePresence>
                {yOffset > yOffsetReq && <motion.div className='aboutBox box' initial={{y: "8vh"}} animate={slideIn}>
                    <h2 className='subHeader'>{subHeader}</h2>
                    <p>A paragraph is a self-contained unit of discourse in writing dealing with a particular point or idea. Though not required by the orthographic conventions of any language with a writing system, paragraphs are a conventional means of organizing extended segments of prose. Wikipedia</p>
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export default AboutBox;