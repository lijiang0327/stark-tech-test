import { Box, Paper, Table, TableRow, TableContainer, TableCell, TableBody, Typography, CircularProgress } from "@mui/material"
import { useEffect, useMemo, useRef, type FC } from "react"

import { Title } from "@/components/Title"
import { TaiwanStockMonthRevenueAndGrowthRate } from "@/api"
import dayjs from "dayjs"

export interface PageTableProps {
  sourceData: TaiwanStockMonthRevenueAndGrowthRate[];
  isLoading: boolean;
}

export const PageTable: FC<PageTableProps> = ({ sourceData, isLoading }) => {
  const tableRef = useRef<HTMLTableElement | null>(null)
  const tableContainerRef = useRef<HTMLDivElement | null>(null)

  const data = useMemo(() => {
    const months = [];
    const revenues = [];
    const growthRates = [];

    for (const item of sourceData) {
      months.push(dayjs(`${item.revenue_year}-${item.revenue_month}`).format('YYYYMM'))
      revenues.push(item.revenue * 0.001)
      growthRates.push(item.growth_rate)
    }

    return {
      '年度月份': months,
      '每月营收 (千元)': revenues,
      '单月营收年增率 (%)': growthRates,
    }
  }, [sourceData])

  useEffect(() => {
    if (sourceData.length > 0 && tableRef.current && tableContainerRef.current) {
      tableContainerRef.current.scrollTo({
        left: tableRef.current.clientWidth - tableContainerRef.current.offsetLeft,
        behavior: 'smooth'
      });
    }
  }, [sourceData])

  return (
    <>
      <Paper elevation={0} sx={{ p: '20px 10px', marginTop: '12px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" px={1} mb={4}>
          <Title title="详细数据" />
        </Box>
        <TableContainer
          sx={{ maxWidth: '100%', overflowX: 'auto' }}
          ref={tableContainerRef}
        >
          {!isLoading && <Table ref={tableRef}>
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
          </Table>}
          {isLoading && <Box display="flex" justifyContent="center" alignItems="center" height="160px">
            <CircularProgress />
          </Box>}
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
