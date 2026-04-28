import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  Github,
  Mail,
  Download,
  Trophy,
  Award,
  Medal,
  Briefcase,
  Linkedin,
  Instagram,
  FileText,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const projects = [
  {
    title: "SEHAT2.0",
    href: "https://github.com/Princ3mish/SEHAT2.0",
    tech: ["React.js", "JavaScript"],
  },
  {
    title: "NotGpt",
    href: "https://github.com/Princ3mish/NotGpt",
    tech: ["Node.js", "Express.js"],
  },
  {
    title: "SiteBuilder",
    href: "https://github.com/Princ3mish/SiteBuilder",
    tech: ["TypeScript", "React.js"],
  },
  {
    title: "Browsermcp",
    href: "https://github.com/Princ3mish/Browsermcp",
    tech: ["MCP", "LLM", "Package"],
  },
  {
    title: "Task-Manager",
    href: "https://github.com/Princ3mish/Task-Manager",
    tech: ["JavaScript", "Express.js"],
  },
  {
    title: "Practice-Nets",
    href: "https://github.com/Princ3mish/Practice-Nets",
    tech: ["Java", "Networking"],
  },
  {
    title: "SEHAT",
    href: "https://github.com/Princ3mish/SEHAT",
    tech: ["JavaScript", "React.js"],
  },
  {
    title: "Princ3mish",
    href: "https://github.com/Princ3mish/Princ3mish",
    tech: ["Markdown", "Config"],
  },
  {
    title: "randoms",
    href: "https://github.com/Princ3mish/randoms",
    tech: ["JavaScript", "Scripts"],
  },
];

const skills = [
  { name: "Node.js", slug: "nodedotjs" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Express.js", slug: "express" },
  { name: "Nest.js", slug: "nestjs" },
  { name: "PHP", slug: "php" },
  { name: "Laravel", slug: "laravel" },
  { name: "MySQL", slug: "mysql" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Cassandra", slug: "apachecassandra" },
  { name: "ClickHouse", slug: "clickhouse" },
  { name: "Git", slug: "git" },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "RabbitMQ", slug: "rabbitmq" },
  { name: "React.js", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Tailwind", slug: "tailwindcss" },
];

const achievements = [
  {
    emoji: "🏆",
    title: "LeetCode Knight",
    description:
      "Achieved Knight status on LeetCode — consistently solving medium and hard problems across arrays, graphs, DP, and system design. Ranked in the top competitive coders on the platform.",
    href: "https://leetcode.com/u/Princ3M/",
    linkLabel: "View LeetCode Profile",
  },
  {
    emoji: "🥈",
    title: "Runner-Up — Advaya National Hackathon",
    description:
      "Secured 2nd place among 102 competing teams. Built an AI-driven healthcare portal using the MERN stack and Gemini API under 24 hours, impressing judges with real-world utility and technical depth.",
    href: "https://github.com/Princ3mish/SEHAT2.0",
    linkLabel: "View Project",
  },
  {
    emoji: "🥇",
    title: "1st Place — TOPCODERS DSA Competition",
    description:
      "Won first place out of 514 participants at JSSATE Bengaluru's inter-college DSA championship. Demonstrated mastery in algorithmic problem-solving under timed competitive conditions.",
    href: "https://github.com/Princ3mish",
    linkLabel: "View GitHub",
  },
];

const workExperience = [
  {
    role: "IT Intern",
    company: "NTPC Limited, Patratu",
    period: "Jan 2026 – Feb 2026",
    bullets: [
      "Analyzed enterprise IT infrastructure including MPLS, core servers, and departmental switches across departments.",
      "Assessed an ASP.NET MVC application in C#/SQL Server that reduced manual communication time by 80%.",
      "Documented network topology and server configurations for future infrastructure audits.",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Engineering — Information Science",
    institution: "JSS Academy of Technical Education, Bengaluru",
    period: "July 2023 – July 2027",
    bullets: [
      "CGPA: 8.75 / 10.0",
      "Studying core CS fundamentals alongside building real-world AI and full-stack projects.",
      "Active participant in hackathons and coding competitions — 1st place at TOPCODERS-DSA (514 participants), Runner-up at Advaya National Hackathon (102 teams).",
    ],
  },
  {
    degree: "Class 12 — CBSE",
    institution: "Birla School Pilani, Rajasthan",
    period: "2022",
    bullets: [
      "Percentage: 94.6%",
      "Strong academic foundation in Science and Mathematics, laying the groundwork for engineering and problem-solving.",
    ],
  },
  {
    degree: "Class 10 — CBSE",
    institution: "St. Joseph's School, Rihand, Uttar Pradesh",
    period: "2020",
    bullets: [
      "Percentage: 97.2%",
      "Consistently top-performing student with a strong grasp of core subjects from an early stage.",
    ],
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [openExp, setOpenExp] = useState<number | null>(null);
  const [openEdu, setOpenEdu] = useState<number | null>(null);

  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = [
      "Full Stack Developer",
      "AI/ML Enthusiast",
      "Competitive Programmer",
    ];
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    if (!currentRole) return;

    if (!isDeleting && typedText === currentRole) {
      const timeoutId = setTimeout(() => setIsDeleting(true), 1500);
      return () => clearTimeout(timeoutId);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setTypedText(
        currentRole.substring(0, typedText.length + (isDeleting ? -1 : 1)),
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Prince Mishra.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-4 h-8 max-w-lg tracking-tight text-muted-foreground 2xl:text-2xl"
              >
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-2 pt-6"
            >
              <Link
                href="https://github.com/Princ3mish"
                target="_blank"
                passHref
              >
                <Button>
                  <Github className="mr-2 h-4 w-4" /> GitHub Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.open("https://drive.google.com/drive/folders/1GO-hKM7snIUxQQv2pdHKVI3wK4ih-LbD?usp=sharing", "_blank")}
              >
                <Download className="mr-2 h-4 w-4" /> Resume
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 hidden h-full w-full xl:mt-0 xl:flex"
          >
            <Suspense fallback={<span>Loading...</span>}>
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col items-center"
          >
            {/* Profile photo overlapping card top */}
            <div className="relative z-10 mb-[-48px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/prince.jpg"
                alt="Prince Mishra"
                className="h-28 w-28 rounded-full border-4 border-background object-cover shadow-xl"
              />
            </div>

            {/* Card */}
            <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-8 pb-8 pt-16 text-center">
              <h2 className="text-3xl font-black uppercase tracking-widest text-white">
                Prince Mishra
              </h2>

              {/* Role strip */}
              <div className="mt-4 flex items-center justify-start text-sm text-muted-foreground">
                <span className="mr-1 text-primary font-mono">&gt;_</span>
                <span>
                  {typedText}
                  <span className="animate-blink">|</span>
                </span>
              </div>

              {/* Bio */}
              <p className="mt-5 text-left text-sm leading-relaxed text-muted-foreground">
                I&apos;m Prince Mishra, a developer from Bengaluru with a habit
                of picking hard problems and refusing to put them down. My work
                spans AI-driven telehealth, generative platforms, and enterprise
                tooling — built with the MERN stack, sprinkled with OpenAI, and
                held together by a deep obsession with performance. When I&apos;m
                not coding, I&apos;m on LeetCode making sure the fundamentals
                never get rusty.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href="#projects" passHref>
                  <Button variant="outline">See My Work</Button>
                </Link>
                <Link href="#contact" passHref>
                  <Button>Get In Touch</Button>
                </Link>
              </div>

              {/* Social icons */}
              <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground">
                <Link
                  href="https://github.com/Princ3mish"
                  target="_blank"
                  passHref
                  className="hover:text-foreground transition-colors"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/pmish04"
                  target="_blank"
                  passHref
                  className="hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/princ3_msh?igsh=azF5aThhMHQxZWxt"
                  target="_blank"
                  passHref
                  className="hover:text-foreground transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="https://drive.google.com/drive/folders/1GO-hKM7snIUxQQv2pdHKVI3wK4ih-LbD?usp=sharing"
                  target="_blank"
                  passHref
                  className="hover:text-foreground transition-colors"
                >
                  <FileText className="h-5 w-5" />
                </Link>
                <Link
                  href="mailto:princ3mish@gmail.com"
                  passHref
                  className="hover:text-foreground transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Work Experience
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              My professional journey in software engineering and technology
            </p>

            <div className="mt-10 w-full max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {workExperience.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenExp(openExp === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <Briefcase className="h-5 w-5 shrink-0 text-white/40" />
                      <div>
                        <p className="font-bold text-white">{item.role}</p>
                        <p className="text-sm text-amber-400">{item.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="hidden sm:block">{item.period}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          openExp === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {openExp === i && (
                    <div className="border-t border-white/10 px-6 pb-5 pt-4">
                      <p className="mb-2 text-xs text-muted-foreground sm:hidden">
                        {item.period}
                      </p>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {item.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Education
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              My academic background and qualifications
            </p>

            <div className="mt-10 w-full max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {education.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenEdu(openEdu === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <GraduationCap className="h-5 w-5 shrink-0 text-white/40" />
                      <div>
                        <p className="font-bold text-white">{item.degree}</p>
                        <p className="text-sm text-amber-400">{item.institution}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="hidden sm:block">{item.period}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform ${
                          openEdu === i ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  {openEdu === i && (
                    <div className="border-t border-white/10 px-6 pb-5 pt-4">
                      <p className="mb-2 text-xs text-muted-foreground sm:hidden">
                        {item.period}
                      </p>
                      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                        {item.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed=".4"
            className="my-32 flex flex-col items-center"
          >
            <h2 className="mb-2 text-4xl font-bold tracking-tight text-white">
              Projects
            </h2>
            <p className="mb-12 text-muted-foreground">
              My open source projects and contributions
            </p>

            <div className="grid w-full max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <Link
                  key={i}
                  href={project.href}
                  target="_blank"
                  passHref
                  className="flex h-36 flex-col rounded-[1.25rem] border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xl font-bold tracking-tight text-white">
                      {project.title}
                    </span>
                    <Github className="h-5 w-5 text-white/70 transition-colors group-hover:text-white" />
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <div className="flex flex-col py-6">
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                ⚡ Skills
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                My Tech Stack.
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7"
            >
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${skill.slug}/white`}
                    alt={skill.name}
                    className="mb-3 h-10 w-10"
                  />
                  <span className="text-center text-xs font-medium text-foreground">
                    {skill.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col items-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Achievements
            </h2>
            <p className="mt-2 text-muted-foreground">
              Milestones, awards, and competitive wins
            </p>

            <div className="mt-12 grid w-full max-w-5xl gap-5 md:grid-cols-3">
              {achievements.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  target="_blank"
                  passHref
                  className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <span className="mb-4 text-4xl">{item.emoji}</span>
                  <h3 className="mb-3 text-lg font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-primary underline-offset-2 group-hover:underline">
                    {item.linkLabel} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-32">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
          >
            <h2 className="text-center text-4xl font-bold tracking-tight text-white">
              Get in Touch
            </h2>
            <p className="mt-2 text-center text-muted-foreground">
              Interested in connecting? Feel free to reach out
            </p>

            <div className="mt-10 flex flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:flex-row">
              {/* Left panel */}
              <div className="flex flex-col justify-center gap-6 border-b border-white/10 p-10 md:w-2/5 md:border-b-0 md:border-r">
                <h3 className="text-3xl font-black uppercase tracking-wide text-white">
                  LET&apos;S CONNECT
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fill in the form to start a conversation.
                </p>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="text-base">📍</span> Bengaluru, India
                  </span>
                  <Link
                    href="mailto:princ3mish@gmail.com"
                    className="flex items-center gap-2 hover:text-foreground transition-colors"
                  >
                    <Mail className="h-4 w-4" /> princ3mish@gmail.com
                  </Link>
                </div>
              </div>

              {/* Right panel — form */}
              <div className="flex-1 p-10">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Subject"
                  />
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Hi! Let's talk about..."
                  />
                  <Button variant="outline" className="w-fit">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
