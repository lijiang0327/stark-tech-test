'use client'

import { Box, Paper } from "@mui/material"
import ReactECharts from "echarts-for-react"
import { Title } from "@/components/Title"
import { useMemo, useState } from "react"

import { Dropdown, DropdownOption } from "@/components/Dropdown"

export const PageChart = () => {
  const option = useMemo(() => {
    return {
      color: ['#dfb13c', '#bc5450'],
      legend: {
        data: ['销量', 'ab'],
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
      xAxis: {},
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
        },
        {
          name: 'ab',
          type: 'line',
          data: [120, 200, 150, 80, 70, 110, 130]
        }
      ]
    }
  }, [])

  const dropDownOptions: DropdownOption[] = useMemo(() => {
    return [
      { label: '近 5 年', value: '5' },
      { label: '近 3 年', value: '3' },
      { label: '近 1 年', value: '1' }
    ]
  }, [])

  const [timeRange, setTimeRange] = useState<DropdownOption>(dropDownOptions[0])

  return (
    <Paper elevation={0} sx={{ p: '20px 10px', marginTop: '12px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1} mb={4}>
        <Title title="每月营收" />
        <Dropdown 
          options={dropDownOptions} 
          onChange={(options) => { setTimeRange(options) }}
          value={timeRange}
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
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '350px' }}
        theme="light"
      />
    </Paper>
  )
}
