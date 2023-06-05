import React, { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../../../../providers/ThemeProvider";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const { isDark } = useTheme();
  const [SearchParams, setSearch] = useSearchParams();
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSearch({ Q: target.value });
  return (
    <Box display="inline-flex">
      <FormControl variant="standard">
        <OutlinedInput
          sx={{ backgroundColor: isDark ? "#33333" : "#e3f2fd" }}
          placeholder="Search"
          size="small"
          value={SearchParams.get("Q") ?? ""}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
