import { Container, Typography } from "@mui/material"
import { FC } from "react"

export interface TitleProps {
  title: string
}

export const Title: FC<TitleProps> = ({ title }) => {
  return (
    <Container
      sx={{
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'primary.main',
        borderRadius: 1,
        padding: '8px 13px',
        margin: '0'
      }}>
      <Typography variant="h6" color="primary.contrastText">
        {title}
      </Typography>
    </Container>
  )
}