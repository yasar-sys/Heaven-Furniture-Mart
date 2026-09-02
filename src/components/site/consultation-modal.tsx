import { useT } from "@/lib/i18n";
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
  "w-full rounded-sm border border-foreground/15 bg-transparent px-4 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-brass";

export function ConsultationModal() {
  const { open, setOpen, prefill } = useConsultation();
  const t = useT();
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
      <DialogContent className="max-h-[92svh] max-w-2xl overflow-y-auto rounded-sm border-foreground/10 bg-background p-7 sm:p-11">
        {sent ? (
          <div className="py-14 text-center">
            <span className="eyebrow text-brass">{t("Received")}</span>
            <DialogTitle className="mt-6 font-serif text-5xl font-light tracking-tight">
              {t("Thank you.")}
            </DialogTitle>
            <DialogDescription className="mx-auto mt-5 max-w-xs text-sm text-muted-foreground">
              {t(
                "Your design journey starts here. Our team will call you shortly to plan your consultation.",
              )}
            </DialogDescription>
            <div className="mx-auto mt-10 w-fit">
              <Cta tone="outline" size="md" onClick={() => setOpen(false)}>
                {t("Back to the page")}
              </Cta>
            </div>
          </div>
        ) : (
          <>
            <span className="eyebrow text-brass">{t("Free design consultation")}</span>
            <DialogTitle className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
              {t("Let's create something yours.")}
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm text-muted-foreground">
              {t("Share a few details. We'll get back within one working day.")}
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
                  <span className="eyebrow mb-2 block text-muted-foreground">{t("Name")}</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className={field}
                    placeholder={t("Your name")}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">{t("Phone")}</span>
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
                <span className="eyebrow mb-2 block text-muted-foreground">{t("Email")}</span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={field}
                  placeholder={t("you@email.com")}
                />
              </label>

              <fieldset>
                <legend className="eyebrow mb-3 text-muted-foreground">
                  {t("What are you looking for?")}
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
                          ? "border-brass bg-brass/15 text-foreground"
                          : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                      )}
                    >
                      {t(i)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">{t("Room type")}</span>
                  <select
                    className={field}
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    name="room"
                  >
                    <option value="">{t("Select a room")}</option>
                    {ROOMS.map((r) => (
                      <option key={r} value={r}>
                        {t(r)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow mb-2 block text-muted-foreground">
                    {t("Approximate space")}
                  </span>
                  <select
                    className={field}
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}
                    name="space"
                  >
                    <option value="">{t("Select a scale")}</option>
                    {SPACES.map((s) => (
                      <option key={s} value={s}>
                        {t(s)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="eyebrow mb-2 block text-muted-foreground">
                  {t("Additional message")}
                </span>
                <textarea
                  name="message"
                  rows={3}
                  className={cn(field, "resize-none")}
                  placeholder={t("Dimensions, timeline, anything you have in mind.")}
                />
              </label>

              <Cta type="submit" className="w-full sm:w-auto">
                {t("Request my consultation")}
              </Cta>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
