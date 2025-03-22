# WeatherApp
A simple weather forecasting application that allows users to check the weather based on their location or by searching for a city. The app uses the OpenWeather API to fetch weather data and display it to the user in an easy-to-understand format.
![image](https://github.com/user-attachments/assets/69b08dd8-00a5-4bc2-9ea4-c605724dbec2)
![image](https://github.com/user-attachments/assets/a9285d4f-bec4-4b2e-ac17-a3d06b298960)


# Features
Current Weather: Displays the current temperature, weather condition (e.g., sunny, rainy), and weather icon.
Hourly Forecast: Shows the weather forecast for the next few hours.
Geolocation: Automatically detects your location and shows the weather for that location.
Unit Toggle: Allows you to switch between Celsius and Fahrenheit.
Search by City: Allows you to search for the weather of any city.
Technologies Used
HTML: For the structure of the app.
CSS: For styling the app and making it responsive.
JavaScript: To fetch weather data, handle user input, and display the results.
OpenWeather API: Used to fetch weather data.

# Installation
Clone the repository:
bash
Copy
Edit
git clone https://github.com/your-username/WeatherApp.git
Navigate to the project folder:
bash
Copy
Edit
cd WeatherApp
Open index.html in your browser to see the app in action.

# How to Use
Open the app in your browser.
You can either:
Click on "Use my location" to get the weather for your current location (browser permissions required).
Enter a city name in the search bar and click "Get Weather" to see the forecast for that city.
Toggle between Celsius and Fahrenheit using the "Switch to Fahrenheit" / "Switch to Celsius" button.

# API Key
This project uses the OpenWeather API to fetch weather data. You will need to replace the apiKey in the app.js file with your own API key:

Go to OpenWeatherMap.
Sign up and generate an API key.
Replace the existing apiKey value in app.js with your new API key.
javascript
Copy
Edit
const apiKey = "YOUR_API_KEY"; // Replace with your API key
Contributing
Feel free to fork this repository and submit a pull request if you'd like to contribute!

To get started:

Fork this repository.
Clone your fork to your local machine.
Make your changes and commit them.
Push your changes and create a pull request.

# Acknowledgments
OpenWeather API: For providing weather data.
