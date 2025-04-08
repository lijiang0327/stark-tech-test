import { IconButton, InputBase, Paper, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const PageHeader = () => {
  return (
    <Box display="flex" height={58} justifyContent="center" alignItems="center" width="100%" bgcolor="background.paper">
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        elevation={0}
      >
        <Box height={37} width={400} display="flex" alignItems="center" justifyContent="center" border={1} borderColor="divider" bgcolor="background.default" borderRadius={1}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="输入台/美股代号, 查看公司价值"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};
