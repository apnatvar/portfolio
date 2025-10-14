import React from "react";
import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { SiApplemusic, SiChessdotcom } from "react-icons/si";
import { FaLinkedin, FaGithub, FaInstagram, FaFile } from "react-icons/fa6";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SocialItem = {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SOCIAL_DATA: SocialItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/apnatva-singh-rawat/",
    icon: FaLinkedin,
  },
  { label: "GitHub", href: "https://github.com/apnatvar/", icon: FaGithub },
  {
    label: "Instagram",
    href: "https://instagram.com/nattupi/",
    icon: FaInstagram,
  },
  {
    label: "Apple Music",
    href: "https://music.apple.com/profile/nattupi",
    icon: SiApplemusic,
  },
  {
    label: "Chess.com",
    href: "https://www.chess.com/member/nattupi",
    icon: SiChessdotcom,
  },
];

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}: {
  glitchColors: string[];
  glitchSpeed: number;
  smooth: boolean;
  characters?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);

  const fontSize = 15;
  const charWidth = 8;
  const charHeight = 15;

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current!.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(
            startRgb,
            endRgb,
            letter.colorProgress
          );
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext("2d");
    resizeCanvas();
    animate();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current as number);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!canvasRef.current) return;
      gsap.fromTo(
        canvasRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "linear",
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top 40%",
            end: "top top", // or "+=100vh" for a fixed distance
            scrub: 1,
          },
        }
      );
    }, canvasRef);
    return () => ctx.revert();
  });

  return (
    <section className="relative max-w-full h-[100dvh] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute z-10 top-0 left-0 h-full w-full bg-background"
      />
      <div className="relative z-11 w-full h-full text-shadow-lg py-15 px-10 md:px-30 bg-gradient-to-b from-background to-transparent via-background/20">
        <Card className="bg-background/75 ring-1 ring-green-600 rounded-4xl h-full backdrop-blur-[1px] content-center justify-around gap-0">
          <CardHeader>
            <p
              className="text-xs text-center text-muted-foreground"
              id="contactme"
            >
              Connect to My Mainframe
            </p>
          </CardHeader>
          <CardContent>
            <ul className="w-full m-auto p-4 text-md flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8 md:text-gray-400">
              {SOCIAL_DATA.map((s) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.label}
                    className="flex items-center gap-1 justify-center mb-5"
                  >
                    <Icon className="" aria-hidden />
                    <Link
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-green-600"
                    >
                      {s.label}
                    </Link>
                  </li>
                );
              })}
              <li
                key="CV"
                className="flex items-center gap-2 justify-center mb-5"
              >
                <FaFile className="" aria-hidden />
                <Link
                  href="./ApnatvaSinghRawatCV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-green-600"
                  download="./ApnatvaSinghRawatCV.pdf"
                >
                  CV
                </Link>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-center text-muted-foreground mx-auto">
              Inspired by The Matrix
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default LetterGlitch;
