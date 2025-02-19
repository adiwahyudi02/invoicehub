import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface TitleProps extends TypographyProps {
  children: React.ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children, ...props }) => {
  return (
    <Typography variant="h1" fontSize="1.625rem" fontWeight="700" {...props}>
      {children}
    </Typography>
  );
};
