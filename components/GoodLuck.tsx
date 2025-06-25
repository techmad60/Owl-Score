import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function GoodLuck() {
  const controls = useAnimation();

  const words = [
    { text: "All", color: "text-secondary" },
    { text: "the", color: "text-secondary" },
    { text: "best", color: "text-secondary" },
    { text: "mate!", color: "text-primary" },
  ];

  useEffect(() => {
    const sequence = async () => {
      // Ascending entrance
      for (let i = 0; i < words.length; i++) {
        await controls.start((index) =>
          index === i
            ? { opacity: 1, y: 0, transition: { duration: 0.25 } }
            : {}
        );
      }

      // Owl appears last
      await controls.start((index) =>
        index === "owl"
          ? { opacity: 1, y: 0, transition: { duration: 0.4 } }
          : {}
      );

      // Wait 0.5s
      await new Promise((res) => setTimeout(res, 500));

      // Descending exit
      for (let i = words.length - 1; i >= 0; i--) {
        await controls.start((index) =>
          index === i
            ? { opacity: 0, y: 20, transition: { duration: 0.4 } }
            : {}
        );
      }

      // Owl disappears last
      await controls.start((index) =>
        index === "owl"
          ? { opacity: 0, y: 20, transition: { duration: 0.4 } }
          : {}
      );
    };

    sequence();
  }, [controls]);
  return (
    <div className="flex flex-row items-center justify-center text-center mt-4 gap-2">
      <motion.div
        custom="owl"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        <Image
          src="/images/goodluck.svg"
          alt="Splash Image"
          width={60}
          height={60}
        />
      </motion.div>

      <p className="text-[2rem] text-secondary flex gap-2">
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            custom={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className={word.color}
            style={{ display: "inline-block" }}
          >
            {word.text}
          </motion.span>
        ))}
      </p>
    </div>
  );
}
