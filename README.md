# Weather Dashboard

A React-based weather dashboard that allows users to search for a city and view its current weather conditions and a 5-day forecast.

The application uses real data from the Open-Meteo API and is designed to demonstrate how a frontend application communicates with an external third-party API while handling loading states, invalid input, API failures, and browser location permissions.

---

# 1. Project Overview

The purpose of this project is to build a small weather dashboard that demonstrates how to work with an external API.

A user can:

- Search for a city.
- View the current temperature.
- View the current weather conditions.
- View the current wind speed.
- View a 5-day weather forecast.
- Use their current browser location.
- View their recent searches.
- Reuse a previous search.
- Receive clear feedback when something goes wrong.

The project focuses more on reliable API integration and error handling than on complex visual design.

---

# 2. Features

## City Search

Users can enter a city name into the search box.

For example:

```text
Pretoria
```

The application searches for the city and retrieves its weather information.

## Current Weather

The dashboard displays:

- City name
- Country
- Current temperature
- Current weather conditions
- Wind speed

## 5-Day Forecast

The application displays a 5-day forecast containing:

- Date
- Weather condition
- Highest temperature
- Lowest temperature

## Current Location

The application includes a:

```
Use My Current Location button.
```

The browser only requests the user's location when the user clicks this button.

If permission is granted:

1. The browser provides the user's latitude and longitude.
2. The coordinates are sent to the weather API.
3. The current weather is retrieved.
4. The 5-day forecast is retrieved.
5. The weather information is displayed.

If the user denies location permission, the application displays an error message and the user can continue searching for a city manually.

## Recent Searches

The application stores the user's five most recent city searches.

For example:

```text
Recent Searches

Pretoria
Johannesburg
Cape Town
Durban
Polokwane
```

Clicking a recent search searches for that city again.

Recent searches are stored using the browser's `localStorage`, so they remain available after refreshing the page.

Only the five most recent searches are kept, and duplicate searches are removed.

---

# 3. Technology Used

The project uses the following technologies:

- React
- JavaScript
- Vite
- HTML
- CSS
- Open-Meteo API
- Browser Geolocation API


---

# 4. API Used

This project uses the Open-Meteo API.

Open-Meteo provides weather and geocoding data without requiring an API key.

The project uses two Open-Meteo services.

## Geocoding API

The Geocoding API converts a city name into geographical coordinates.

```text
https://geocoding-api.open-meteo.com/v1/search
```

The application uses this API to obtain:

- City name
- Country
- Latitude
- Longitude

## Weather API

The Weather API uses the latitude and longitude to retrieve weather information.

```text
https://api.open-meteo.com/v1/forecast
```

The application requests:

- Current temperature
- Current weather code
- Current wind speed
- Daily weather codes
- Daily maximum temperature
- Daily minimum temperature

The forecast is limited to five days.

---

# 5. Error Handling

The application is designed to handle common problems when communicating with an external API.

## Empty Search

If the user submits an empty search, the application does not send an unnecessary API request.

The user is asked to enter a city name.


# 6. Project Structure

The project is organised into separate components and services.

```text
weather-dashboard/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── Forecast.jsx
│   │   ├── SearchBar.jsx
│   │   └── WeatherDashboard.jsx
│   │
│   ├── services/
│   │   ├── weatherApi.js
│   │   └── weatherCodes.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

The application separates the API logic from the user interface.

The `services` folder is responsible for communicating with the weather API, while the `components` folder contains the React components responsible for displaying the application.

---

# 7. Design Decisions

## Temperature Units

The application uses Celsius because it is commonly used in South Africa and provides an easy-to-understand temperature format.

The weather API is configured to return:

```text
°C
```

Wind speed is displayed in:

```text
km/h
```

## API Requests

The application first uses the geocoding API to find the latitude and longitude of a city.

It then uses those coordinates to request the weather information.

This separates the process into two clear steps:

```text
City Name
    ↓
Geocoding API
    ↓
Latitude + Longitude
    ↓
Weather API
    ↓
Weather Data
    ↓
React UI
```

## Weather Codes

Open-Meteo returns numerical weather codes.

For example:

```text
0  = Clear sky
1  = Mainly clear
2  = Partly cloudy
3  = Overcast
61 = Slight rain
63 = Moderate rain
65 = Heavy rain
95 = Thunderstorm
```

The application converts these numerical codes into readable descriptions using `weatherCodes.js`.

## Recent Searches

Recent searches are stored in browser `localStorage`.

This means the searches remain available when the page is refreshed without requiring a database or backend server.

Only five recent searches are stored to keep the list small and relevant.

## Current Location

Location detection is not performed automatically when the page loads.

The user must click the `Use My Current Location` button before the browser requests permission.

This approach gives the user control over location access and avoids requesting sensitive browser permissions without user interaction.

---

# 8. First-Time Setup

## Step 1: Get the Project

If the project is hosted on GitHub, clone it using:

For example:

```bash
git clone https://github.com/yourusername/weather-dashboard.git
```

Then enter the project directory:

```bash
cd weather-dashboard
```

---

## Step 2: Open the Project in VS Code

From inside the project folder, you can open the project using:

```bash
code .
```

Alternatively, open Visual Studio Code manually and select the project folder.

---

## Step 3: Install Dependencies

This step is required when setting up the project for the first time.

Run:

```bash
npm install
```

This command reads the `package.json` file and installs all required packages.

A `node_modules` folder will be created automatically.

**Do not manually create the `node_modules` folder.**

---

## Step 4: Start the Development Server

Run:

```bash
npm run dev
```

Vite should display something similar to:

```text
VITE ready

➜ Local: http://localhost:5173/
```

The exact Vite version and startup time may be different.

---

## Step 5: Open the Application

Open your browser and visit:

```text
http://localhost:5173/
```

The Weather Dashboard should now be running.

---

# 9. Running the Project After the First Setup

After the dependencies have already been installed, you normally do not need to run:

```bash
npm install
```

again.

The next time you want to run the project, open the project folder in VS Code and open the terminal.

If you are not already inside the project folder, run:

```bash
cd weather-dashboard
```

Then start the development server:

```bash
npm run dev
```

Vite will provide a local address, normally:

```text
http://localhost:5173/
```

Open that address in your web browser.

---

## Quick Start

For future use, once the project has already been installed, you only need:

```bash
cd weather-dashboard
npm run dev
```

Then open:

```text
http://localhost:5173/
```

---

# 10. Stopping the Application

To stop the development server, go to the terminal where Vite is running and press:

```text
Ctrl + C
```

---



# 11. Summary

The Weather Dashboard demonstrates how a React application can communicate with an external third-party API and handle real-world problems such as invalid input, API failures, loading states, and browser permissions.

The project uses Open-Meteo for weather and geocoding data, React for the user interface, browser geolocation for the current-location feature, and local storage for recent searches.

The main goal of the project is to demonstrate reliable API integration, clean code organisation, user feedback, and practical error handling.