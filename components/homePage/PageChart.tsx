'use client'

import { Box, CircularProgress, Paper } from "@mui/material"
import ReactECharts from "echarts-for-react"
import { useMemo, type FC } from "react"
import dayjs from "dayjs"

import { Title } from "@/components/Title"
import { Dropdown, DropdownOption } from "@/components/Dropdown"
import { useStore } from "@/store"
import { TaiwanStockMonthRevenueAndGrowthRate } from "@/api"
import { NoData } from "@/components/NoData"

export interface PageChartProps {
  data: TaiwanStockMonthRevenueAndGrowthRate[];
  isLoading: boolean;
}

export const PageChart: FC<PageChartProps> = ({ data, isLoading }) => {
  const {timeRange, setTimeRange} = useStore()
  const option = useMemo(() => {
    const revenues: number[] = []
    const growthRates: number[] = []
    const xAxisData: string[] = []

    data?.forEach((item) => {
      revenues.push(item.revenue * 0.0001)
      growthRates.push(item.growth_rate)
      xAxisData.push(dayjs(`${item.revenue_year}-${item.revenue_month}`).format('YYYYMM'))
    })

    return {
      color: ['#dfb13c', '#bc5450'],
      legend: {
        data: ['每月营收', '单月营收成长率'],
        top: 0,
        left: 60,
        textStyle: {
          color: '#666'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: xAxisData,
        type: 'category',
        axisLabel: {
          fontSize: 12,
          interval: timeRange > 1 ? 12 : 1,
          color: '#666',
          formatter: (value: string) => {
            return timeRange > 1 ? dayjs(value).format('YYYY') : value;
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          min: 0,
        },
        {
          type: 'value',
          position: 'right',
          min: 'dataMin',
          max: 'dataMax',
          interval: 20,
          axisLabel: {
            formatter: (value: number) => `${Math.round(value)}`
          },
          axisLine: {
            onZero: true,
          },
          splitLine: {
            show: false,
          }
        }
      ],
      series: [
        {
          name: '每月营收',
          type: 'bar',
          yAxis: 0,
          data: revenues,
          tooltip: {
            show: true,
            valueFormatter: (value: number) => `${value.toFixed(2)} 千元`
          }
        },
        {
          name: '单月营收成长率',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: growthRates,
          tooltip: {
            show: true,
            valueFormatter: (value: number) => `${value.toFixed(2)}%`
          }
        }
      ]
    }
  }, [data, timeRange])

  const dropDownOptions: DropdownOption[] = useMemo(() => {
    return [
      { label: '近 5 年', value: 5 },
      { label: '近 3 年', value: 3 },
      { label: '近 1 年', value: 1 }
    ]
  }, [])

  const handleDropdownChange = (option: DropdownOption) => {
    setTimeRange(option.value)
  }

  const selectedOption = useMemo(() => {
    return dropDownOptions.find(option => option.value === timeRange)
  }, [timeRange, dropDownOptions])

  return (
    <Paper elevation={0} sx={{ p: '20px 10px', marginTop: '12px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1} mb={4}>
        <Title title="每月营收" />
        <Dropdown 
          options={dropDownOptions} 
          onChange={handleDropdownChange}
          value={selectedOption}
          color="primary"
          sx={{
            padding: '8px 13px',
            fontSize: '18px'
          }}
          variant="contained"
          size="large"
          disableElevation
        />
      </Box>
      {!isLoading && !!data?.length && <ReactECharts
        option={option}
        style={{ width: '100%', height: '350px' }}
        theme="light"
      />}

      {!isLoading && !data?.length && <NoData height="350px" />}

      {isLoading && <Box display="flex" justifyContent="center" alignItems="center" height="350px">
        <CircularProgress />
      </Box>}
    </Paper>
  )
}
