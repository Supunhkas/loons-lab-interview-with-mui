import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import bgImage from "../assets/background.jpg";
import ColomboWeather from "../components/ColomboWeather";
import Navbar from "../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState([]);
  const theme = createTheme();
  const apiKey = "75feeac4f8af1b14320f00172f27e5ac";

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;

  const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude={hour}&APPID=${apiKey}&units=metric`;

  const searchLocation = (e) => {
    axios
      .get(api)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // weather forecast
    axios
      .get(forecastApi)
      .then((res) => {
        setForecast(res.data.list);
        console.log(res.data.list);
      })
      .catch((err) => {
        console.log(err);
      });
    setLocation("");
  };

  const renderForecast = () => {
    const forecastByDay = forecast.reduce((acc, forecastData) => {
      const date = new Date(forecastData.dt * 1000).toLocaleDateString();

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(forecastData);
      return acc;
    }, {});

    return Object.entries(forecastByDay).map(([date, forecastData]) => {
      // Calculate the average temperature for the day
      const totalTemp = forecastData.reduce(
        (acc, data) => acc + (data.main?.temp || 0),
        0
      );
      const avgTemp = Math.round(totalTemp / forecastData.length);

      return (
        <Box
          key={date}
          display="flex"
          alignItems="center"
          flexDirection={"row"}
          justifyContent="center"
          margin={1}
          sx={{ width: "100%", maxWidth: 200 }}
        >
          <Card
            key={date}
            sx={{
              width: "100%",
              marginBottom: 2,
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              transition: "0.3s",
            }}
          >
            <CardHeader
              title={date}
              sx={{
                backgroundColor: "#3f51b5",
                color: "#fff",
                textAlign: "center",
              }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ marginTop: 1, marginBottom: 1 }}>
                {avgTemp}&deg;C
              </Typography>
              <Typography sx={{ textTransform: "capitalize", marginBottom: 1 }}>
                {forecastData[0].weather[0].description}
              </Typography>
              <img
                src={`http://openweathermap.org/img/w/${forecastData[0].weather[0].icon}.png`}
                alt={forecastData[0].weather[0].description}
              />

              <Typography sx={{ marginTop: 1 }}>
                {forecastData[0].main.humidity}% humidity
              </Typography>
            </CardContent>
          </Card>
        </Box>
      );
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          margin: 0,
        }}
      >
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div style={{ marginRight: "30px" }}>
            <ColomboWeather />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              borderRadius={5}
              alignItems="center"
              justifyContent="center"
              display={"flex"}
              flexDirection="column"
              maxHeight={400}
              minHeight={300}
              padding={3}
              sx={{
                width: "100%",
                marginBottom: 2,
                padding: 2,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                bgcolor: "#fffde7",
              }}
            >
              <Typography variant="h6" marginBottom={3}>
                Search here
              </Typography>
              <TextField
                id="outlined-basic"
                label="search city"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={searchLocation}
                style={{ marginTop: 5 }}
              >
                Search
              </Button>
              <Divider />
              <Typography variant="h6" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="h4" gutterBottom>
                {data.main?.temp ? Math.round(data.main.temp - 273.15) : ""}°C
              </Typography>
              <Typography variant="p" gutterBottom>
                <p>{data.weather ? data.weather[0].description : ""}</p>
              </Typography>
            </Box>
          </div>
        </div>

        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          id="forecastBox"
          justifyContent="center"
        >
          {data ? null : "Search location to get weather forecast"}
          {data && renderForecast()}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Home;
