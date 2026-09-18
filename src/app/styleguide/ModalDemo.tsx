"use client";

import { useState } from "react";
import { Button, Divider, Eyebrow, Modal, StepDots } from "@/components/ui";

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} label="Example modal">
        <div className="pt-[41px]">
          <Eyebrow compact className="text-center">
            List options
          </Eyebrow>
          <h2 className="mx-auto mt-[1px] max-w-[678px] px-5 text-center font-display text-h2">Lorem ipsum dolor set amet sed tempor.</h2>
          <p className="mx-auto mt-[10px] max-w-[531px] text-center text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <StepDots total={2} current={1} className="mt-[27px]" />
          <Divider className="mt-[19px]" />
          <div className="flex justify-end gap-3 p-5">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Continue</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
