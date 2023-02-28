import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
        <Typography variant="h6">Weather </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout}>
            <h3>Logout </h3>
          </Button>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
