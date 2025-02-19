import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmDeleteModal({
  open,
  onClose,
  onDelete,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" fontWeight={500}>
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
