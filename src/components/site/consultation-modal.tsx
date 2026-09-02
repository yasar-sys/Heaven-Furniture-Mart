import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Cta } from "./ui-kit";
import { useConsultation } from "./consultation-context";

const INTERESTS = [
  "Sofa",
  "Bed",
  "Dining Set",
  "Office / Study",
  "Wardrobe",
  "TV Unit",
  "Fully Custom",
  "Other",
];
const ROOMS = ["Living Room", "Bedroom", "Dining", "Office & Study", "Whole Home"];
const SPACES = ["Compact", "Medium", "Spacious"];

const field =
  "w-full rounded-sm border border-ink/15 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-brass";

export function ConsultationModal() {
  const { open, setOpen, prefill } = useConsultation();
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [space, setSpace] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    setSent(false);
    if (prefill.interest) setInterest(prefill.interest);
    if (prefill.room) setRoom(prefill.room);
    if (prefill.space) setSpace(prefill.space);
  }, [open, prefill]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[92svh] max-w-2xl overflow-y-auto rounded-sm border-ink/10 bg-background p-7 sm:p-11">
        {sent ? (
          <div className="py-14 text-center">
            <span className="eyebrow text-brass">Received</span>
            <DialogTitle className="mt-6 font-serif text-5xl font-light tracking-tight">
              Thank you.
            </DialogTitle>
            <DialogDescription className="mx-auto mt-5 max-w-xs text-sm text-muted-foreground">
              Your design journey starts here. Our team will call you shortly to plan your
              consultation.
            </DialogDescription>
            <div className="mx-auto mt-10 w-fit">
              <Cta tone="outline" size="md" onClick={() => setOpen(false)}>
                Back to the page
              </Cta>
            </div>
          </div>
        ) : (
          <>
            <span className="eyebrow text-brass">Free design consultation</span>
            <DialogTitle className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              Let's create something yours.
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm text-muted-foreground">
              Share a few details. We'll get back within one working day.
            </DialogDescription>

            <form
              className="mt-9 space-y-7"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">Name</span>
                  <input required name="name" autoComplete="name" className={field} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">Phone</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={field}
                    placeholder="+880"
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block text-muted-foreground">Email</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={field}
                  placeholder="you@email.com"
                />
              </label>

              <fieldset>
                <legend className="eyebrow mb-3 text-muted-foreground">
                  What are you looking for?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      key={i}
                      type="button"
                      aria-pressed={interest === i}
                      onClick={() => setInterest(i)}
                      className={cn(
                        "rounded-sm border px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300",
                        interest === i
                          ? "border-brass bg-brass/15 text-ink"
                          : "border-ink/15 text-muted-foreground hover:border-ink/40 hover:text-ink",
                      )}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">Room type</span>
                  <select
                    className={field}
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    name="room"
                  >
                    <option value="">Select a room</option>
                    {ROOMS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">
                    Approximate space
                  </span>
                  <select
                    className={field}
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    name="space"
                  >
                    <option value="">Select a scale</option>
                    {SPACES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block text-muted-foreground">
                  Additional message
                </span>
                <textarea
                  name="message"
                  rows={3}
                  className={cn(field, "resize-none")}
                  placeholder="Dimensions, timeline, anything you have in mind."
                />
              </label>

              <Cta type="submit" className="w-full sm:w-auto">
                Request my consultation
              </Cta>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
