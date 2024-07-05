import React from "react";
import { Search, Add } from "@mui/icons-material";
import { TextField } from "@mui/material";

const SearchBar = () => {
	return (
		<div className="w-full px-[5vw] justify-between flex items-center h-[8vh] border-b bg-zinc-950">
			<TextField
				style={{
					background: "#454242",
					borderRadius: "15px",
					width: "85%"
				}}
				InputProps={{
					style: { color: "white" }
				}}
				InputLabelProps={{
					style: { color: "white" }
				}}
				label="Search"
				sx={{
					"& .MuiOutlinedInput-root": {
						"&.Mui-focused fieldset": {
							borderColor: "transparent"
						}
					}
				}}
			/>
			<Search />
		</div>
	);
};

export default SearchBar;
