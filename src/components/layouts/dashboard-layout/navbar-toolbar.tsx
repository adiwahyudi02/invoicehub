import { IconButtonRounded } from "@/components/ui/icon-button-rounded";
import { Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useDashboardContext } from "@/context/dashboard.context";
import { ThemeModeSwitch } from "@/components/ui/tool-bar/theme-mode-switch";
import { ToolbarNotification } from "@/components/ui/tool-bar/notification";
import { ToolbarMessage } from "@/components/ui/tool-bar/message";
import { UserToolbar } from "@/components/ui/tool-bar/user";

export const NavbarToolbar: React.FC = () => {
  const { toggleSidebar, isMobile } = useDashboardContext();

  return (
    <>
      {isMobile && (
        <IconButtonRounded
          color="inherit"
          aria-label="Toggle side navigation"
          onClick={toggleSidebar}
        >
          <Menu />
        </IconButtonRounded>
      )}

      <Box ml="auto" display="flex" alignItems="center">
        <ThemeModeSwitch sx={{ md: { mr: 3 } }} />
        <ToolbarNotification />
        <ToolbarMessage />
        <UserToolbar />
      </Box>
    </>
  );
};
