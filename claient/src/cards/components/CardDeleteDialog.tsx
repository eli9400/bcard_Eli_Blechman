import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  isDialogOpen: boolean;
  onChangeDialog: () => void;
  onDelete: () => void;
};

const CardDeleteDialog: React.FC<Props> = ({
  isDialogOpen,
  onChangeDialog,
  onDelete,
}) => {
  return (
    <Dialog
      open={isDialogOpen}
      onClose={onChangeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this business card?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action will delete all existing information for this business
          card
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onChangeDialog} color="error">
          cancel
        </Button>
        <Button
          onClick={() => {
            onDelete();
          }}
          color="info"
        >
          Delete card
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDeleteDialog;
