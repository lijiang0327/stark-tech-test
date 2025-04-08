import { useQuery } from "@tanstack/react-query"

import { http } from "@/utils/http"
import { ApiResponse } from "@/types/ApiResponse";

export interface TaiwanStockInfo {
  date: string;
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
}

export const getTaiwanStockInfo = async (stockCode: string) => {
  const {data} = await http.get<ApiResponse<TaiwanStockInfo[]>>('/api/v4/data', {
    params: {
      data_id: stockCode,
      dataset: 'TaiwanStockInfo',
    }
  })

  return data;
}

export const useGetTaiwanStockInfo = (stockCode: string) => {
  return useQuery({
    queryKey: ['get', 'taiwanStockInfo', stockCode],
    queryFn: () => getTaiwanStockInfo(stockCode),
    enabled: !!stockCode,
  })
}

export interface GetTaiwanStockMonthRevenueParams {
  stockCode: string;
  startDate: string;
  endDate: string;
}

export interface TaiwanStockMonthRevenue {
  date: string;
  revenue: number;
}

export const getTaiwanStockMonthRevenue = async ({stockCode, startDate, endDate}: GetTaiwanStockMonthRevenueParams) => {
  const {data} = await http.get<ApiResponse<TaiwanStockMonthRevenue[]>>('/api/v4/data', {
    params: {
      data_id: stockCode,
      dataset: 'TaiwanStockMonthRevenue',
      start_date: startDate,
      end_date: endDate,
    }
  })

  return data;
}

export const useGetTaiwanStockMonthRevenue = (params: GetTaiwanStockMonthRevenueParams) => {
  return useQuery({
    queryKey: ['get', 'taiwanStockMonthRevenue', params],
    queryFn: () => getTaiwanStockMonthRevenue(params),
    enabled: !!params.stockCode && !!params.startDate && !!params.endDate,
  })
}
