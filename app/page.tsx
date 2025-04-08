'use client';

import { Box } from "@mui/material";

import { PageHeader } from "@/components/homePage/PageHeader";
import { PageTitle } from "@/components/homePage/PageTitle";
import { PageChart } from "@/components/homePage/PageChart";
import { PageTable } from "@/components/homePage/PageTable";
import { useStore } from "@/store";

export default function Home() {
  const stockInfo = useStore((state) => state.stockInfo);

  return (
    <>
      <PageHeader />
      <Box maxWidth={719} margin="12px auto" width="100%">
        <PageTitle title={stockInfo?.stock_name ?? ''} code={stockInfo?.stock_id ?? ''} />
        <PageChart />
        <PageTable />
      </Box>
    </>
  );
}
