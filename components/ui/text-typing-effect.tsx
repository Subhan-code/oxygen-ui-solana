"use client";

import { useState, useEffect } from "react";

const useTypingEffect = (
  text: string,
  duration: number,
  isTypeByLetter = false
) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [prevText, setPrevText] = useState(text);

  if (prevText !== text) {
    setPrevText(text);
    setCurrentPosition(0);
  }

  const items = isTypeByLetter ? text.split("") : text.split(" ");

  useEffect(() => {
    if (currentPosition >= items.length) return;

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPosition, items.length, duration]);

  return items.slice(0, currentPosition).join(isTypeByLetter ? "" : " ");
};

const texts = [
  "This is a simple text typing effect in React",
  "This effect is created using React Hooks",
  "We can use this effect to create a typing effect for your portfolio",
  "We can also use this effect to create a typing effect for your resume",
  "or for your blog",
  "or for your landing page",
  "let's go",
];

const TIME_TO_FADE = 300;
const TIME_INTERVAL = 3000;
const TIME_PER_LETTER = 100;

export const TextTypingEffectWithTextsFadeOut = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [fadeText, setFadeText] = useState(true);
  const [fadeCircle, setFadeCircle] = useState(true);
  const textToShow = useTypingEffect(texts[textIndex], TIME_PER_LETTER, false);

  const timeToTypeText = texts[textIndex].split(" ").length * TIME_PER_LETTER;

  useEffect(() => {
    const circleTimeout = setTimeout(() => {
      setFadeCircle(false);
    }, timeToTypeText + 1000);

    const textTimeout = setTimeout(() => {
      setFadeText(false);

      setTimeout(() => {
        setTextIndex((prevIndex) =>
          prevIndex >= texts.length - 1 ? 0 : prevIndex + 1
        );
        setFadeCircle(true);
        setFadeText(true);
      }, TIME_TO_FADE);
    }, TIME_INTERVAL);

    return () => {
      clearTimeout(circleTimeout);
      clearTimeout(textTimeout);
    };
  }, [textIndex, timeToTypeText]);

  return (
    <div
      className={`inline-block font-medium text-lg text-black transition-all duration-300 dark:text-white ${
        fadeText ? "opacity-100 translate-y-0" : "translate-y-2 opacity-0"
      }`}
      key={textIndex}
    >
      <span>
        {textToShow}
        <span
          className={`ml-2 inline-block h-2.5 w-2.5 rounded-full bg-black transition-transform duration-300 dark:bg-white ${
            fadeCircle ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </span>
    </div>
  );
};

export default TextTypingEffectWithTextsFadeOut;
