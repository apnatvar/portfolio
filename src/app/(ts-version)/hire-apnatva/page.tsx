"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { WORDS } from "@/lib/words";
import AutoScroll from "embla-carousel-auto-scroll";
import gsap from "gsap";
import {
  CircleAlert,
  CircleCheckBig,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 1200;
const MAX_TEXTAREA_HEIGHT = 220;

type ApiResponse = {
  success: boolean;
  message: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function HireApnatvaPage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const wordsRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [messageTouched, setMessageTouched] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  }>({
    type: "success",
    title: "",
    description: "",
  });

  const autoScrollPlugin = useMemo(() => {
    return AutoScroll({
      speed: 0.75,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      startDelay: 0,
    });
  }, []);

  const emailIsValid = EMAIL_REGEX.test(email.trim());
  const messageIsValid = message.trim().length > 0;
  const formIsValid = emailIsValid && messageIsValid && !isSubmitting;

  function openDialog(
    type: "success" | "error",
    title: string,
    description: string,
  ) {
    setDialogState({ type, title, description });
    setDialogOpen(true);
  }

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    el.style.overflowY =
      el.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  }, [message]);

  useEffect(() => {
    gsap.matchMedia().add(
      "(min-width: 768px)",
      () => {
        if (!wordsRef.current) return;

        const words = gsap.utils.toArray<HTMLElement>(
          wordsRef.current.querySelectorAll("[data-word]"),
        );

        gsap.set(words, {
          autoAlpha: 0,
          x: 0,
          y: 0,
          skewX: 0,
          skewY: 0,
        });

        const tl = gsap.timeline({
          repeat: -1,
          defaults: { ease: "power3.out" },
        });

        words.forEach((word, index) => {
          const fromX = index % 2 === 0 ? 80 : -80;
          const fromY = index % 3 === 0 ? -32 : 32;
          const toX = index % 2 === 0 ? -90 : 90;
          const toY = index % 3 === 0 ? 36 : -36;

          tl.fromTo(
            word,
            {
              autoAlpha: 0,
              x: fromX,
              y: fromY,
              skewX: index % 2 === 0 ? -18 : 18,
              skewY: index % 2 === 0 ? -7 : 7,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              skewX: 0,
              skewY: 0,
              duration: 0.42,
            },
          )
            .to(word, {
              autoAlpha: 1,
              duration: 0.65,
            })
            .to(word, {
              autoAlpha: 0,
              x: toX,
              y: toY,
              skewX: index % 2 === 0 ? 20 : -20,
              skewY: index % 2 === 0 ? 8 : -8,
              duration: 0.34,
              ease: "power3.in",
            });
        });
      },
      { scope: rootRef },
    );
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEmailTouched(true);
    setMessageTouched(true);

    if (!emailIsValid) {
      openDialog("error", "Invalid email", "Enter a valid email address.");
      return;
    }

    if (!messageIsValid) {
      openDialog("error", "Message required", "Enter your message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/hire-apnatva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok || !data.success) {
        openDialog(
          "error",
          "Submission failed",
          data.message || "Could not submit the form.",
        );
        return;
      }

      setEmail("");
      setMessage("");
      setEmailTouched(false);
      setMessageTouched(false);

      openDialog("success", "Submitted", data.message);
    } catch (e: unknown) {
      const description =
        e instanceof Error ? e.message : "Unexpected client error.";

      openDialog("error", "Submission failed", description);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section
        ref={rootRef}
        className="mx-auto grid max-md:grid-rows-6 grid-cols-1 w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-6 md:py-8 h-svh"
      >
        <div className="md:hidden row-start-1">
          <Carousel
            opts={{
              loop: true,
              align: "start",
              direction: "ltr",
            }}
            plugins={[autoScrollPlugin]}
            setApi={(api) => {
              if (!api) return;
              api.plugins().autoScroll?.play();
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {WORDS.map((word) => (
                <CarouselItem key={word} className="basis-auto pl-3">
                  <div className="rounded-full border border-border bg-muted/40 px-4 py-2 text-xl font-medium -tracking-[0.18em]">
                    {word}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col justify-between gap-5 rounded-3xl border border-border bg-background p-4 shadow-sm md:p-8 max-md:row-start-2 max-md:row-span-3"
        >
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <a href="mailto:rawat@apnatva.dev">
                <Mail className="mr-2 size-4" />
                Mail
              </a>
            </Button>

            <Button asChild variant="secondary" className="rounded-full">
              <a
                href="https://wa.me/918791414856"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 size-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={emailTouched && !emailIsValid}
              className={cn(
                "h-12 rounded-2xl",
                emailTouched &&
                  !emailIsValid &&
                  "border-destructive focus-visible:ring-destructive/30",
              )}
            />

            {emailTouched && !emailIsValid ? (
              <p className="text-sm text-destructive">
                Enter a valid email address.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Textarea
              ref={textareaRef}
              value={message}
              placeholder="Write your message"
              onBlur={() => setMessageTouched(true)}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                  setMessage(e.target.value);
                }
              }}
              aria-invalid={messageTouched && !messageIsValid}
              className={cn(
                "min-h-[120px] resize-none rounded-2xl leading-6",
                messageTouched &&
                  !messageIsValid &&
                  "border-destructive focus-visible:ring-destructive/30",
              )}
            />

            <div className="flex justify-between gap-3 text-xs text-muted-foreground">
              <span>
                {messageTouched && !messageIsValid
                  ? "Message cannot be empty."
                  : "Describe your requirement."}
              </span>
              <span>
                {message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={!formIsValid}
            className="h-12 rounded-2xl"
          >
            <Send className="mr-2 size-4" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <div className="relative hidden h-full overflow-hidden rounded-3xl border border-border bg-muted/20 md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-muted/30 to-transparent" />

          <div
            ref={wordsRef}
            className="relative flex h-full items-center justify-center"
          >
            {WORDS.map((word) => (
              <span
                key={word}
                data-word
                className="pointer-events-none whitespace-nowrap text-4xl font-semibold uppercase -tracking-[0.1em] text-foreground/90 lg:text-4xl w-full absolute text-center"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {dialogState.type === "success" ? (
                <CircleCheckBig className="size-5 text-primary" />
              ) : (
                <CircleAlert className="size-5 text-destructive" />
              )}
              {dialogState.title}
            </DialogTitle>

            <DialogDescription>{dialogState.description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
