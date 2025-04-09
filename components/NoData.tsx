import { Box, BoxProps, Typography } from "@mui/material";
import { FC } from "react";

export interface NoDataProps extends BoxProps {
  text?: string;
}

export const NoData: FC<NoDataProps> = ({ text = '查無資料', ...props }) => {
  return <Box display="flex" justifyContent="center" alignItems="center" {...props}>
    <Typography variant="h6" color="textSecondary">{text}</Typography>
  </Box>
}
