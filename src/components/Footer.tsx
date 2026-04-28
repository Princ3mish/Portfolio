import Link from "next/link";

import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram, FileText, Mail } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by{" "}
            <Link
              href="https://github.com/Princ3mish"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              Prince Mishra
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} IST</p>
          </span>
        </span>
        <div className="flex items-center space-x-6 text-muted-foreground">
          <Link href="https://github.com/Princ3mish" target="_blank" passHref className="hover:text-foreground transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/pmish04" target="_blank" passHref className="hover:text-foreground transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://www.instagram.com/princ3_msh?igsh=azF5aThhMHQxZWxt" target="_blank" passHref className="hover:text-foreground transition-colors">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://drive.google.com/drive/folders/1GO-hKM7snIUxQQv2pdHKVI3wK4ih-LbD?usp=sharing" target="_blank" passHref className="hover:text-foreground transition-colors">
            <FileText className="h-5 w-5" />
            <span className="sr-only">Resume</span>
          </Link>
          <Link href="mailto:princ3mish@gmail.com" passHref className="hover:text-foreground transition-colors">
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
