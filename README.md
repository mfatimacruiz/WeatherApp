# WeatherApp - JB Hi-Fi Programming Challenge

## Overview

This project, named WeatherApp, is designed to build a service that interfaces with the OpenWeatherMap's Current Weather Data service. The project consists of a back-end API built with C# .NET and a front-end application built with React.js, located inside the `ClientApp` folder.

## Related Repositories

- Main Project: [WeatherApp GitHub Repository](https://github.com/mfatimacruiz/WeatherApp.git)
- Test Project: [TestWeatherApp GitHub Repository](https://github.com/mfatimacruiz/TestWeatherApp.git)

## API Documentation

- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)

## Features

### Back-end (WeatherApp)

- Rate limiting with an API key scheme.
- Allows up to 5 weather reports per hour per API key.
- REST URL for accepting both city and country names.
- Conditional OpenWeatherMap API call based on API key and rate limits.

### Front-end (ClientApp)

- User interface for entering city and country names.
- Display of the weather description fetched from the back-end.
- Comprehensive error handling.

## Setup and Installation

### Prerequisites

- .NET SDK
- Node.js and npm

### Clone the Repositories

```
git clone https://github.com/mfatimacruiz/WeatherApp.git
git clone https://github.com/mfatimacruiz/TestWeatherApp.git
```

### Back-end (WeatherApp)

Navigate to the `WeatherApp` directory:

```
cd WeatherApp
```

Build the project:

```
dotnet build
```

Run the server:

```
dotnet run
```

### Adding Test Project in Visual Studio Code

Open the `WeatherApp` project in Visual Studio Code. Add the test project (`TestWeatherApp`) as an MSTest Test Project to the main `WeatherApp` solution.

### Front-end (ClientApp)

Navigate to the `ClientApp` directory inside `WeatherApp`:

```
cd WeatherApp/ClientApp
```
Install the dependencies:

```
npm install
```

Run the front-end:

```
npm start
```

## API Keys

API keys for rate-limiting will be provided separately via email. Please check your email for the API keys needed to interact with the service. Simple string constants are used as API keys.

## Testing

### Back-end Testing (TestWeatherApp)

Navigate to the `TestWeatherApp` directory and run:

```
dotnet test
```

### Front-end Testing (ClientApp)

Navigate to the `ClientApp` directory and run:

```
npm test
```

## How to Use

1. Open the front-end in a web browser, which is served from the `ClientApp` directory.
2. Enter the city name and country name in the given form.
3. Click "Submit" to get the weather description.
