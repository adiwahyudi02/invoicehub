"use client";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardContext } from "@/context/dashboard.context";
import { navigationItems } from "@/constants/navigations.constans";
import { passionOne } from "@/constants/fonts.constants";

export const SideBar: React.FC = () => {
  const { sidebarWidth, isMobile, isSidebarOpen, toggleSidebar } =
    useDashboardContext();

  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <Box width={{ md: sidebarWidth }}>
      {isSidebarOpen && isMobile && (
        <IconButton
          size="small"
          sx={{
            position: "fixed",
            top: "0.5rem",
            right: "0.5rem",
            zIndex: "tooltip",
            color: "white",
          }}
        >
          <Close fontSize="large" onClick={toggleSidebar} />
        </IconButton>
      )}
      <Drawer
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: { sm: sidebarWidth, xs: "100%" },
            bgcolor: "#1c2434",
            color: "white",
          },
        }}
        variant={isMobile ? "temporary" : "permanent"}
      >
        <Box display="flex" gap={1.5} alignItems="center" mt={4} ml={4}>
          <Box>
            <Image
              src="/logo.svg"
              alt="logo invoicehub"
              height={44}
              width={42}
            />
          </Box>
          <Typography fontSize="1.5rem" className={passionOne.className}>
            InvoiceHub
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="grey.500"
          px={4}
          fontWeight="600"
          textTransform="uppercase"
          mb={1}
          mt={4}
        >
          Menu
        </Typography>
        <List sx={{ display: "grid", gap: 1 }}>
          {navigationItems.map(({ label, href, icon }) => (
            <ListItem
              key={href}
              component={Link}
              href={href}
              disablePadding
              sx={{
                color: isActive(href) ? "white" : "grey.500",
              }}
              onClick={() => isMobile && toggleSidebar()}
            >
              <ListItemButton sx={{ px: 4 }}>
                <ListItemIcon
                  sx={{ minWidth: "unset", mr: 1.5, color: "inherit" }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: "600",
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
