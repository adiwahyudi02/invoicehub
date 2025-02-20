import React from "react";
import { AddListIcon } from "@/components/ui/icons/add-list-icon";
import { ListIcon } from "@/components/ui/icons/list-icon";

export const navigationItems = [
  {
    label: "Add Invoice",
    href: "/invoices/add",
    icon: <AddListIcon />,
  },
  {
    label: "My Invoice",
    href: "/invoices/list",
    icon: <ListIcon />,
  },
];
