'use client';

import { Box } from "@mui/material";
import { useMemo } from "react";
import { PageHeader } from "@/components/homePage/PageHeader";
import { PageTitle } from "@/components/homePage/PageTitle";
import { PageChart } from "@/components/homePage/PageChart";
import { PageTable } from "@/components/homePage/PageTable";
import { useStore } from "@/store";
import { GetTaiwanStockMonthRevenueAndGrowthRateParams, useGetTaiwanStockMonthRevenueAndGrowthRate } from '@/api';

export default function Home() {
  const stockInfo = useStore((state) => state.stockInfo);
  const timeRange = useStore((state) => state.timeRange);

  const getTaiwanStockMonthRevenueAndGrowthRateParams: GetTaiwanStockMonthRevenueAndGrowthRateParams = useMemo(() => {
    return {
      stockCode: stockInfo?.stock_id ?? '',
      timeRange: timeRange,
    }
  }, [stockInfo, timeRange])

  const {data: monthRevenueAndGrowthRate, isLoading: isMonthRevenueAndGrowthRateLoading} = useGetTaiwanStockMonthRevenueAndGrowthRate(getTaiwanStockMonthRevenueAndGrowthRateParams)

  return (
    <>
      <PageHeader />
      <Box maxWidth={719} margin="12px auto" width="100%">
        <PageTitle title={stockInfo?.stock_name ?? ''} code={stockInfo?.stock_id ?? ''} />
        <PageChart data={monthRevenueAndGrowthRate?.data ?? []} isLoading={isMonthRevenueAndGrowthRateLoading} />
        <PageTable sourceData={monthRevenueAndGrowthRate?.data ?? []} isLoading={isMonthRevenueAndGrowthRateLoading} />
      </Box>
    </>
  );
}
