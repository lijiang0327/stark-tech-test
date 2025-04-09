import { useQuery } from "@tanstack/react-query";

import { http } from "@/utils/http";
import { ApiResponse } from "@/types/ApiResponse";
import dayjs from "dayjs";

export interface TaiwanStockInfo {
  date: string;
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
}

export const getTaiwanStockInfo = async (stockCode: string) => {
  const { data } = await http.get<ApiResponse<TaiwanStockInfo[]>>(
    "/api/v4/data",
    {
      params: {
        data_id: stockCode,
        dataset: "TaiwanStockInfo",
      },
    }
  );

  return data;
};

export const useGetTaiwanStockInfo = (stockCode: string) => {
  return useQuery({
    queryKey: ["get", "taiwanStockInfo", stockCode],
    queryFn: () => getTaiwanStockInfo(stockCode),
    enabled: !!stockCode,
  });
};

export interface GetTaiwanStockMonthRevenueParams {
  stockCode: string;
  startDate: string;
  endDate: string;
}

export interface TaiwanStockMonthRevenue {
  country: string;
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  stock_id: string;
}

export const getTaiwanStockMonthRevenue = async ({
  stockCode,
  startDate,
  endDate,
}: GetTaiwanStockMonthRevenueParams) => {
  const { data } = await http.get<ApiResponse<TaiwanStockMonthRevenue[]>>(
    "/api/v4/data",
    {
      params: {
        data_id: stockCode,
        dataset: "TaiwanStockMonthRevenue",
        start_date: startDate,
        end_date: endDate,
      },
    }
  );

  return data;
};

export interface GetTaiwanStockMonthRevenueAndGrowthRateParams {
  stockCode: string;
  timeRange: number;
}

export interface TaiwanStockMonthRevenueAndGrowthRate extends TaiwanStockMonthRevenue {
  growth_rate: number;
}
export const getTaiwanStockMonthRevenueAndGrowthRate = async ({
  stockCode,
  timeRange,
}: GetTaiwanStockMonthRevenueAndGrowthRateParams) => {
  const startDate = dayjs()
    .subtract(timeRange + 1, "year")
    .startOf("month")
    .format("YYYY-MM-DD");
  const endDate = dayjs().startOf("month").format("YYYY-MM-DD");

  const data = await getTaiwanStockMonthRevenue({
    stockCode,
    startDate,
    endDate,
  });

  if (!data.data.length) {
    return data as ApiResponse<TaiwanStockMonthRevenueAndGrowthRate[]>;
  }

  const result = await data.data.map((item, index) => {
    if (index < 12) {
      return { ...item };
    }
    const revenue = item.revenue;
    const lastYearRevenue = data.data[index - 12].revenue;
    const growthRate = ((revenue - lastYearRevenue) / lastYearRevenue) * 100;
    return {
      ...item,
      growth_rate: growthRate,
    };
  });

  return {
    ...data,
    data: result.slice(12),
  } as ApiResponse<TaiwanStockMonthRevenueAndGrowthRate[]>;
};

export const useGetTaiwanStockMonthRevenue = (
  params: GetTaiwanStockMonthRevenueParams
) => {
  return useQuery({
    queryKey: ["get", "taiwanStockMonthRevenue", params],
    queryFn: () => getTaiwanStockMonthRevenue(params),
    enabled: !!params.stockCode && !!params.startDate && !!params.endDate,
  });
};

export const useGetTaiwanStockMonthRevenueAndGrowthRate = (
  params: GetTaiwanStockMonthRevenueAndGrowthRateParams
) => {
  return useQuery({
    queryKey: ["get", "taiwanStockMonthRevenueAndGrowthRate", params],
    queryFn: () => getTaiwanStockMonthRevenueAndGrowthRate(params),
    enabled: !!params.stockCode && !!params.timeRange,
  });
};
