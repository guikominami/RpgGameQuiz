/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import "./Modal.css";

export default function Modal({ open, children, buttonCaption, ...props }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} {...props}>
      {children}
      <form method="dialog">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
}
