"use client";

import { useEffect, useRef } from "react";

import { FORM_HONEYPOT_FIELD, FORM_STARTED_FIELD } from "@/lib/forms/constants";

export function SpamProtectionFields() {
  const startedAtInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (startedAtInput.current) {
      startedAtInput.current.value = Date.now().toString();
    }
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Leave this field empty</label>
        <input
          autoComplete="off"
          id="website"
          name={FORM_HONEYPOT_FIELD}
          tabIndex={-1}
          type="text"
        />
      </div>
      <input name={FORM_STARTED_FIELD} ref={startedAtInput} type="hidden" />
    </>
  );
}
