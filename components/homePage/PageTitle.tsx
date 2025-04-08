import { Paper, Typography } from "@mui/material"
import { FC } from "react"

export interface PageTitleProps {
  title: string,
  code: string,
}

export const PageTitle: FC<PageTitleProps> = ({ title, code }) => {
  return <Paper elevation={0} sx={{p: '2px 10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: 51 }}>
    <Typography variant="h6">
      {title} ({code})
    </Typography>
  </Paper>
}