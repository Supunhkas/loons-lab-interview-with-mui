import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import {
  FaSun,
  FaCloud,
  FaCloudSun,
  FaCloudRain,
  FaBolt,
} from "react-icons/fa";

const ColomboWeather = () => {
  const colomboApi =
    "https://api.openweathermap.org/data/2.5/weather?q=Colombo&APPID=75feeac4f8af1b14320f00172f27e5ac";

  const [colomboData, setColomboData] = useState({});

  useEffect(() => {
    axios.get(colomboApi).then((res) => {
      setColomboData(res.data);
    });
  }, []);

  const getIcon = (description, size = 60) => {
    switch (description) {
      case "clear sky":
        return <FaSun size={size} />;
      case "few clouds":
        return <FaCloudSun size={size} />;
      case "overcast clouds":
        return <FaCloud size={size} />;
      case "scattered clouds":
        return <FaCloud size={size} />;
      case "broken clouds":
        return <FaCloud size={size} />;
      case "shower rain":
        return <FaCloudRain size={size} />;
      case "rain":
        return <FaCloudRain size={size} />;
      case "thunderstorm":
        return <FaBolt size={size} />;
      case "snow":
        return <FaCloud size={size} />;
      case "mist":
        return <FaCloud size={size} />;
      default:
        return null;
    }
  };

  return (
    <Box
      borderRadius={5}
      alignItems="center"
      justifyContent="center"
      display={"flex"}
      flexDirection="column"
      maxWidth={700}
      minWidth={500}
      maxHeight={400}
      minHeight={300}
      margin="auto"
      padding={3}
      sx={{
        backgroundColor: "#1e88e5",
        color: "white",
        textAlign: "center",
        padding: 2,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
        Today Weather
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ textTransform: "uppercase" }}>
        Colombo
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        {colomboData.main?.temp
          ? Math.round(colomboData.main.temp - 273.15)
          : ""}
        °C
      </Typography>
      {colomboData.weather ? getIcon(colomboData.weather[0].description) : null}
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {colomboData.weather ? colomboData.weather[0].description : ""}
      </Typography>
    </Box>
  );
};

export default ColomboWeather;
