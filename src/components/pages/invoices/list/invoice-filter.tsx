"use client";

import { SearchIcon } from "@/components/ui/icons/search-icon";
import { SelectField } from "@/components/ui/select-field";
import { TextField } from "@/components/ui/text-field";
import { invoiceStatus } from "@/constants/invoice.constants";
import { useInvoiceContext } from "@/context/invoice.context";
import { Box, InputAdornment } from "@mui/material";

export const InvoiceFilter: React.FC = () => {
  const { search, status, setSearch, setStatus } = useInvoiceContext();

  return (
    <Box display="flex" alignItems="center" justifyContent="end" gap={2}>
      <Box>
        <TextField
          name="search"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          isGhostVariant
          sx={{ width: { md: "13.5rem" } }}
        />
      </Box>
      <Box>
        <SelectField
          name="status"
          placeholder="All Status"
          options={[{ value: "", label: "All Status" }, ...invoiceStatus]}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          isGhostVariant
          sx={{ width: "8.45rem" }}
        />
      </Box>
    </Box>
  );
};
