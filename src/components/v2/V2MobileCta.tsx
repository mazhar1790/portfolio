"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Mail } from "lucide-react";
import { PERSONAL } from "@/data/cv";

/**
 * Sticky mobile-only CTA bar.
 *  - Appears after the hero scrolls past
 *  - Hides itself when the #contact section is visible (avoid duplication)
 */
export default function V2MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function update() {
      const past = window.scrollY > 600;
      const contact = document.getElementById("contact");
      const inContact = contact
        ? (() => {
            const r = contact.getBoundingClientRect();
            return r.top < window.innerHeight && r.bottom > 0;
          })()
        : false;
      setShow(past && !inContact);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e0dfd8] bg-white/95 px-4 py-3 backdrop-blur-md md:hidden"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
        >
          <div className="flex items-center gap-2">
            {PERSONAL.calendly && (
              <a
                href={PERSONAL.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0e0e0d] px-4 py-3 font-jakarta text-sm font-bold text-white"
              >
                <Calendar className="h-4 w-4" />
                Book a 15-min call
              </a>
            )}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#e0dfd8] bg-white text-[#0e0e0d]"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
