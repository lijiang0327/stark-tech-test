import { Box, Paper, Table, TableRow, TableContainer, TableCell, TableBody, Typography } from "@mui/material"

import { Title } from "@/components/Title"

export const PageTable = () => {
  const data = {
    '年度月份': ['202307', '202308', '202309', '202310', '202307', '202308', '202309', '202310', '202307', '202308', '202309', '202310'],
    '每月营收': [1000, 2000, 3000, 4000, 1000, 2000, 3000, 4000, 1000, 2000, 3000, 4000],
    '单月营收年增率': [10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40],
  }

  return (
    <>
      <Paper elevation={0} sx={{ p: '20px 10px', marginTop: '12px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={1} mb={4}>
          <Title title="详细数据" />
        </Box>
        <TableContainer
          sx={{ maxWidth: '100%', overflowX: 'auto' }}
        >
          <Table>
            <TableBody>
              {Object.entries(data).map(([key, value], index) => {
                const bgColor = index % 2 === 0 ? '#f5f5f5' : '#ffffff'
                const border = '1px solid #e0e0e0'

                return (
                  <TableRow key={key}>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 1,
                        fontWeight: 500,
                        backgroundColor: bgColor,
                        border: border,
                        minWidth: '156px',
                      }}
                    >{key}</TableCell>
                    {value.map((v, i) => (
                      <TableCell
                        align="right"
                        key={i}
                        sx={{
                          backgroundColor: bgColor,
                          border: border,
                          fontWeight: index === 0 ? 500 : 400,
                        }}
                      >
                        {v}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2} mb={6}>
        <Typography variant="body1" textAlign="right">
          圖表單位：千元，數據來自公開資訊觀測站
          <br />
          網頁圖表歡迎轉貼引用，請註明出處為財報狗
        </Typography>
      </Box>
    </>
  )
}
