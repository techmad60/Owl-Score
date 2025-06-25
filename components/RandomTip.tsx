// components/RandomTip.tsx
"use client";

import { useMemo } from "react";

const tips = [
  "Review notes daily.",
  "Teach someone else.",
  "Take short breaks.",
  "Stay hydrated.",
  "Organize your workspace.",
  "Use flashcards.",
  "Sleep well.",
  "Test yourself often.",
  "Summarize key points.",
  "Study in chunks.",
  "Limit distractions.",
  "Set study goals.",
  "Use mnemonic devices.",
  "Study in the morning.",
  "Make mind maps.",
  "Write things down.",
  "Use active recall.",
  "Stay consistent.",
  "Ask questions.",
  "Practice past papers.",
  "Prioritize hard topics.",
  "Reward yourself.",
  "Review before bed.",
  "Listen to focus music.",
  "Limit social media.",
  "Color-code notes.",
  "Stay positive.",
  "Try group study.",
  "Keep a planner.",
  "Visualize concepts.",
  "Do a quick recap.",
  "Study at the same time daily.",
  "Eat brain food.",
  "Start early.",
  "Stay curious.",
  "Take deep breaths.",
  "Break big tasks down.",
  "Don't cram.",
  "Find your peak focus time.",
  "Track your progress.",
  "Stay flexible.",
  "Don't multitask.",
  "Stay tidy.",
  "Ask for help.",
  "Highlight key info.",
  "Practice spaced repetition.",
  "Challenge yourself.",
  "Stay motivated.",
  "Focus on understanding."
];

export default function RandomTip() {
  const tip = useMemo(() => {
    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  return (
    <p className="text-sm text-secondary mt-12">
      💡 <span className="text-primary">Study Tip:</span> {tip}
    </p>
  );
}
