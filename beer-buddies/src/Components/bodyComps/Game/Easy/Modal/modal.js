import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./modal.module.css";
import * as Mui from "@material-ui/core";

const Modal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [onOff, setSwitch] = useState(true);
  const handleSwitch = (onOff) => {
    setSwitch(!onOff);
  };

  return (
    <div>
      <Mui.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Mui.Fade in={open}>
          <div className={classes.modalMessage}>
            <Mui.Grid container spacing={0}>
              <Mui.Grid item xs={12}>
                <h1>stuff</h1>
              </Mui.Grid>
            </Mui.Grid>
          </div>
        </Mui.Fade>
      </Mui.Modal>
    </div>
  );
};

export default Modal;
