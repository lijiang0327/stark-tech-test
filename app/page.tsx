import { Box } from "@mui/material";

import { PageHeader } from "@/components/homePage/PageHeader";
import { PageTitle } from "@/components/homePage/PageTitle";
import { PageChart } from "@/components/homePage/PageChart";
import { PageTable } from "@/components/homePage/PageTable";
export default function Home() {
  return (
    <>
      <PageHeader />
      <Box maxWidth={719} margin="12px auto" width="100%">
        <PageTitle title="台积电" code="TSM" />
        <PageChart />
        <PageTable />
      </Box>
    </>
  );
}
