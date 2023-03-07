import { motion, AnimatePresence } from "framer-motion";

const PopUp = ({ title, body, btnText, btnFunc, bodyCls, secBtnText, secBtnFunc }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={"parent-box"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="winner"
      >
        <motion.div
          key={"child-box"}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="text"
        >
          <motion.h2
            initial={{ scale: 0, y: 100 }}
            animate={{
              scale: 1,
              y: 0,
              transition: {
                y: { delay: 0.7 },
                duration: 0.7,
              },
            }}
          >
            {title}
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                delay: 1.3,
                duration: 0.2,
              },
            }}
            className={bodyCls}
          >
            {body}
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { delay: 1.5, duration: 0.3 },
            }}
          >
            <button onClick={() => btnFunc()}>{btnText}</button>;
            {secBtnText && secBtnFunc && <button onClick={() => secBtnFunc()}>{secBtnText}</button>}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PopUp;
