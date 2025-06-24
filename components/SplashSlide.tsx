"use client";
import Image from "next/image";
import { motion } from "framer-motion";

interface SplashSlideProps {
  image: string;
  title?: string;
  description?: string;
  highlight: string;
  isFirst: boolean;
  onSwipe: (direction: number) => void;
}

const wordContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // adjust delay between words
    },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SplashSlide({
  image,
  title,
  description,
  highlight,
  isFirst,
  onSwipe,
}: SplashSlideProps) {
  const words = description ? description.split(" ") : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-white mt-20 absolute top-0 left-0 w-full"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, info) => {
        if (info.offset.x > 10) onSwipe(-1);
        else if (info.offset.x < -10) onSwipe(1);
      }}
    >
      <Image
        src={image}
        alt="Splash Image"
        width={isFirst ? 300 : 200}
        height={isFirst ? 300 : 200}
        className="mb-6"
      />

      {isFirst && title ? (
        <motion.div
          className="absolute top-76 font-irish text-[2.5rem] text-cyan text-center flex flex-wrap justify-center"
          variants={wordContainer}
          initial="hidden"
          animate="visible"
        >
          {title
            .replace(highlight, "")
            .split(" ")
            .map((word, idx) => (
              <motion.span key={idx} variants={wordItem}>
                {word}
              </motion.span>
            ))}
          <motion.span variants={wordItem} className="text-primary">
            {highlight}
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          className="mt-16 text-secondary font-irish text-center px-4 text-3xl leading-relaxed flex flex-wrap justify-center"
          variants={wordContainer}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordItem}
              className={`mr-1 ${
                word.includes(highlight) ? "text-primary font-semibold" : ""
              }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
