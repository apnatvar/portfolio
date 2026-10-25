import { Button } from "@/components/ui/button";
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
import {
  CircleAlert,
  CircleCheckBig,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

export function HireAP() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const submissionLockRef = useRef(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // State updates are asynchronous, so a ref prevents two submits in the same
    // event turn from sending duplicate requests.
    if (submissionLockRef.current) return;

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
      submissionLockRef.current = true;
      setIsSubmitting(true);

      const res = await fetch("/api/hire-ap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          message: message.trim(),
          website,
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
      setWebsite("");
      setEmailTouched(false);
      setMessageTouched(false);

      openDialog("success", "Submitted", data.message);
    } catch (e: unknown) {
      const description =
        e instanceof Error ? e.message : "Unexpected client error.";

      openDialog("error", "Submission failed", description);
    } finally {
      submissionLockRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section
        className="mx-auto grid w-full max-w-3xl gap-8 px-6 py-16 md:px-10 md:py-24"
      >
        <header data-first-section className="space-y-3">
          <h1 className="font-italianno text-7xl leading-none md:text-9xl">Let’s make something good.</h1>
          <p className="max-w-xl text-muted-foreground md:text-lg">Tell me a little about your web or design idea, and how I can help.</p>
        </header>
        <form
          onSubmit={handleSubmit}
          noValidate
          className={cn(
            "flex flex-col justify-between gap-5 border border-border bg-background p-4 md:p-8",
            "rounded-3xl shadow-sm",
          )}
        >
          <div
            aria-hidden="true"
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
          >
            <label htmlFor="hire-website">Leave this field empty</label>
            <input
              id="hire-website"
              name="website"
              type="text"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="hire-email" className="sr-only">Your email address</label>
            <Input
              id="hire-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-describedby={emailTouched && !emailIsValid ? "hire-email-error" : undefined}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={emailTouched && !emailIsValid}
              className={cn(
                "h-12",
                "rounded-2xl",
                emailTouched &&
                  !emailIsValid &&
                  "border-destructive focus-visible:ring-destructive/30",
              )}
            />

            {emailTouched && !emailIsValid ? (
              <p id="hire-email-error" className="text-sm text-destructive">
                Enter a valid email address.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="hire-message" className="sr-only">Your message</label>
            <Textarea
              id="hire-message"
              required
              maxLength={MAX_MESSAGE_LENGTH}
              aria-describedby="hire-message-help"
              ref={textareaRef}
              value={message}
              placeholder="What are you thinking of making?"
              onBlur={() => setMessageTouched(true)}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                  setMessage(e.target.value);
                }
              }}
              aria-invalid={messageTouched && !messageIsValid}
              className={cn(
                "min-h-[120px] resize-none leading-6",
                "rounded-2xl",
                messageTouched &&
                  !messageIsValid &&
                  "border-destructive focus-visible:ring-destructive/30",
              )}
            />

            <div id="hire-message-help" className="flex justify-between gap-3 text-xs text-muted-foreground">
              <span>
                {messageTouched && !messageIsValid
                  ? "Message cannot be empty."
                  : "A few details are plenty to start."}
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
    </>
  );
}
