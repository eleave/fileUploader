import { Box, SxProps, Theme } from "@mui/system";

export interface SummaryItemProps {
  name: string;
  value: string;
  sx?: SxProps<Theme>;
}

export const SummaryItem = ({ name, value, sx }: SummaryItemProps) => (
  <Box sx={{ display: "flex", gap: 1, ...sx }}>
    <Box component="span" sx={{ typography: "body2" }} fontWeight={700}>
      {name}:
    </Box>
    <Box component="span" sx={{ typography: "body2" }}>
      {value}
    </Box>
  </Box>
);
