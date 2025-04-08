'use client';

import { IconButton, InputBase, Paper, Box, List, ListItem, ListItemButton, Typography, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef, ChangeEvent } from "react";

import { useGetTaiwanStockInfo } from "@/api";
import { useStore } from "@/store";

export const PageHeader = () => {
  const [stockCode, setStockCode] = useState('');
  const { data: stocksInfo } = useGetTaiwanStockInfo(stockCode);
  const setStockInfo = useStore(state => state.setStockInfo);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleInputFocus = () => {
    setOpen(true)
  }

  const handleInputBlur = () => {
    setTimeout(() => setOpen(false), 100)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStockCode(e.target.value)
  }

  return (
    <Box display="flex" height={58} justifyContent="center" alignItems="center" width="100%" bgcolor="background.paper">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        elevation={0}
      >
        <Box ref={boxRef} position="relative" height={37} width={400} display="flex" alignItems="center" justifyContent="center" border={1} borderColor="divider" bgcolor="background.default" borderRadius={1}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="输入台/美股代号, 查看公司价值"
            inputProps={{ 'aria-label': 'search google maps' }}
            value={stockCode}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>

          {open && stockCode && (
            <Box onMouseDown={(e) => e.stopPropagation()} component={Paper} position="absolute" top={38} width={'100%'} left={0} bgcolor="background.paper" zIndex={1000}>
              <Typography color="text.secondary" fontSize="12px" py={1} px={2}>个股查询</Typography>
              <Divider />
              {stocksInfo?.data?.length ? (
                <>
                  <List>
                    {stocksInfo?.data.map((stock) => {
                      return (
                        <ListItem key={stock.stock_id + stock.industry_category}>
                          <ListItemButton onClick={() => setStockInfo(stock)}>{stock.stock_name} ({stock.stock_id}) - {stock.industry_category}</ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </>
              ) : (
                <Typography textAlign="center" color="text.secondary" py={2}>未查询到数据</Typography>
              )}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
