import * as React from "react";
import { Slide, Dialog, DialogTitle, DialogContent } from "@mui/material";

import "./styles.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Modal = ({
  modalTitle,
  open,
  setOpen,
  name,
  children,
  iconClose = false,
  className,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={`dialog ${className ? className : ""}`}
      >
        <DialogTitle className={`dialog-title dialog-title__${name}`}>
          {iconClose && (
            <img
              onClick={handleClose}
              className="dialog__icon"
              alt=""
              src="https://img.icons8.com/fluency/48/000000/close-window.png"
            />
          )}
          {modalTitle}
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default Modal;
