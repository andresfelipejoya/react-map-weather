interface WeatherCodeMap {
    [key: number]: {
        readonly text: string;
        readonly icon: string;
    };
}

export const weatherCodeMap: WeatherCodeMap = {
    0: { text: "Clear sky", icon: "☀️" },
    1: { text: "Mainly clear", icon: "🌤️" },
    2: { text: "Partly cloudy", icon: "⛅" },
    3: { text: "Overcast", icon: "☁️" },
    45: { text: "Fog", icon: "🌫️" },
    48: { text: "Depositing rime fog", icon: "🌫️❄️" },
    51: { text: "Light drizzle", icon: "🌦️" },
    53: { text: "Moderate drizzle", icon: "🌦️" },
    55: { text: "Dense drizzle", icon: "🌧️" },
    61: { text: "Slight rain", icon: "🌧️" },
    63: { text: "Moderate rain", icon: "🌧️" },
    65: { text: "Heavy rain", icon: "🌧️💧" },
    66: { text: "Light freezing rain", icon: "🌧️❄️" },
    67: { text: "Heavy freezing rain", icon: "🌧️❄️❄️" },
    71: { text: "Slight snow fall", icon: "🌨️" },
    73: { text: "Moderate snow fall", icon: "🌨️" },
    75: { text: "Heavy snow fall", icon: "❄️🌨️" },
    80: { text: "Slight rain showers", icon: "🌦️" },
    81: { text: "Moderate rain showers", icon: "🌧️" },
    82: { text: "Violent rain showers", icon: "🌧️🌊" },
    95: { text: "Thunderstorm", icon: "⛈️" },
    96: { text: "Thunderstorm with slight hail", icon: "⛈️🧊" },
    99: { text: "Thunderstorm with heavy hail", icon: "🌩️🧊" }
} as const;
