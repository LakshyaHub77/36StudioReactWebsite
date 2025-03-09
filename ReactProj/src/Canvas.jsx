import React, { useEffect, useRef, useState } from "react";
import canvasImage from "./canvasImage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);
  useGSAP(() => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      repeat: -1,
      ease: "none",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
    gsap.to(canvasRef.current, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.inOut",
    });
  });

  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = canvasImage[index.value];
    image.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      ctx.scale(scale, scale);

      ctx.drawImage(image, 0, 0, canvas.offsetHeight, canvas.offsetWidth);
    };
  }, [index]);

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.floor(Math.random().toFixed(1))}
      ref={canvasRef}
      className="absolute"
      style={{
        width: `${size * 1.4}px`,
        height: `${size * 1.4}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex,
      }}
      id="canvas"
    ></canvas>
  );
}

export default Canvas;
