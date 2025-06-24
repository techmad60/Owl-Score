"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // adjust timing as you like
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function WelcomePage() {
  const titleWords = ["Welcome", "to", "OwlScore!"];
  return (
    <div className="flex justify-center min-h-screen bg-background p-4 font-irish">
      <motion.div
        className="flex flex-col items-center text-center mt-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/images/welcome.svg"
            alt="Splash Image"
            width={200}
            height={100}
          />
        </motion.div>

        <motion.h1
          className="text-4xl text-secondary mt-4"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((wordText, idx) => {
            if (wordText === "OwlScore!") {
              return (
                <motion.span
                  key={idx}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={word}
                >
                  Owl
                  <span className="text-primary">Score!</span>
                </motion.span>
              );
            }

            return (
              <motion.span
                key={idx}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                variants={word}
              >
                {wordText}
              </motion.span>
            );
          })}
        </motion.h1>
        <motion.button
          className="bg-primary text-background px-6 py-3 rounded-sm mt-16 text-lg font-semibold hover:bg-primary/90 transition-all duration-200 cursor-pointer w-[93px] h-[46px] shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Start!
        </motion.button>
      </motion.div>
    </div>
  );
}
