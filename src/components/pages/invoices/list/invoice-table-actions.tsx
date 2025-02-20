"use client";

import { IconButton, MenuItem, Menu } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { InvoiceType } from "@/lib/types/invoice";
import Link from "next/link";
import ConfirmDeleteModal from "@/components/ui/confirm-delete-modal";
import { useInvoiceContext } from "@/context/invoice.context";
import { useToast } from "@/context/toast.context";

interface InvoiceTableActionProps {
  row: InvoiceType;
}

export default function InvoiceTableAction({ row }: InvoiceTableActionProps) {
  const { showToast } = useToast();
  const { deleteInvoice } = useInvoiceContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmModalOpen = () => {
    setIsConfirmModalOpen(true);
    handleCloseMenu();
  };

  const handleDeleteInvoice = () => {
    const { success, message } = deleteInvoice(row.number);
    if (success) {
      showToast(message, "success");
    } else {
      showToast(message, "error");
    }
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
        aria-label="menu"
      >
        <MenuIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="action-menu"
        aria-labelledby="action-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem component={Link} href={`/invoices/edit/${row.number}`}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenConfirmModalOpen}>Delete</MenuItem>
      </Menu>

      <ConfirmDeleteModal
        open={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onDelete={handleDeleteInvoice}
      />
    </>
  );
}
