"use client";

import GoodLuck from "@/components/GoodLuck";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import html2canvas from "html2canvas";
import Image from "next/image";
import RandomTip from "@/components/RandomTip";
import { RxDownload } from "react-icons/rx";
type Course = { unit?: number; grade: string };

export default function GPAHome() {
  const [courses, setCourses] = useState<Course[]>([
    { unit: undefined, grade: "" },
  ]);
  const [gpa, setGpa] = useState<string>("0.00");
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCourse = () => {
    setCourses([...courses, { unit: undefined, grade: "" }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length === 1) return;
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const updateCourse = <K extends keyof Course>(
    index: number,
    field: K,
    value: Course[K]
  ) => {
    const updated = [...courses];
    updated[index][field] = value;
    setCourses(updated);
  };

  const calculateGPA = () => {
    let points = 0;
    let units = 0;

    const gradeToPoint = (grade: string) => {
      switch (grade.toUpperCase()) {
        case "A":
          return 5;
        case "B":
          return 4;
        case "C":
          return 3;
        case "D":
          return 2;
        case "E":
          return 1;
        case "F":
          return 0;
        default:
          return 0;
      }
    };

    for (const course of courses) {
      if (!course.unit || !course.grade) {
        setGpa("0.00");
        setTotalPoints(0);
        setTotalUnits(0);
        return;
      }
      points += gradeToPoint(course.grade) * course.unit;
      units += course.unit;
    }

    const audio = new Audio("/audio/generate-hoot.mp3");
    audio.play();
    setTotalPoints(points);
    setTotalUnits(units);
    setGpa(units ? (points / units).toFixed(2) : "0.00");
    setIsModalOpen(true);
  };

  // Inside your component:
  const modalRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (modalRef.current) {
      const canvas = await html2canvas(modalRef.current, {
        backgroundColor: null, // keeps transparent corners if your card has rounded edges
        scale: 2, // higher quality image
      });
      const link = document.createElement("a");
      link.download = "gpa-result.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };


  return (
    <div className="relative flex flex-col justify-start items-center min-h-screen bg-background p-4 font-irish">
      <GoodLuck />

      <div className="flex flex-col mt-12">
        <h1 className="text-3xl text-secondary mb-4 text-center">
          GPA Calculator
        </h1>

        {courses.map((course, idx) => (
          <div key={idx} className="flex gap-2 mb-3 items-center">
            <select
              value={course.unit ?? ""}
              onChange={(e) =>
                updateCourse(idx, "unit", parseInt(e.target.value))
              }
              className="border border-primary bg-secondary rounded p-2 w-32"
            >
              <option value="" disabled hidden>
                Select unit load
              </option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} unit{i + 1 > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <select
              value={course.grade || ""}
              onChange={(e) => updateCourse(idx, "grade", e.target.value)}
              className="border border-primary bg-secondary rounded p-2 w-32"
            >
              <option value="" disabled hidden>
                Select grade
              </option>
              {["A", "B", "C", "D", "E", "F"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>

            <button
              onClick={() => removeCourse(idx)}
              className="text-bg hover:opacity-80 text-sm bg-primary p-2 rounded-lg cursor-pointer"
            >
              <FaXmark className="text-xl" />
            </button>
          </div>
        ))}

        <button
          onClick={addCourse}
          className="bg-primary text-background px-4 py-2 cursor-pointer rounded w-fit mt-4 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none"
        >
          Add Course
        </button>

        <button
          onClick={calculateGPA}
          className="bg-primary text-background px-4 py-2 cursor-pointer rounded w-fit mt-32 shadow-[0_4px_0_0_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none mx-auto"
        >
          Generate
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} // CLOSE ON OVERLAY CLICK
            />

            <motion.div
              ref={modalRef}
              className="fixed top-1/2 left-1/2 z-50 bg-background p-6 rounded-lg shadow-lg text-center w-72 h-[27.5rem] "
              initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close X */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-4 right-2 bg-primary text-background rounded-full p-1 hover:bg-primary/90 transition cursor-pointer"
              >
                <FaXmark className="text-xl" />
              </button>
              <Image
                src="/images/wizardowl.svg"
                alt="Splash Image"
                width={80}
                height={80}
                className="mb-2 mx-auto"
              />
              <div className="flex flex-col space-y-4">
                <h2 className="text-2xl mb-2 text-secondary">
                  Owl<span className="text-primary">Score</span>
                </h2>
                <p className="text-lg text-secondary">
                  Total Points :{" "}
                  <span className="text-primary">{totalPoints}</span>
                </p>
                <p className="text-lg text-secondary">
                  Total Unit Load :{" "}
                  <span className="text-primary">{totalUnits}</span>
                </p>
                <p className="text-lg text-secondary">
                  GPA : <span className=" text-primary">{gpa}</span>
                </p>
              </div>
              <RandomTip />
              <div className="flex gap-2 justify-center mt-12 cursor-pointer">
                <RxDownload className="text-white" onClick={downloadImage} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
