# 🌍 React Map & Weather App

Aplicación web construida con **React**, configurada manualmente con Webpack y sin frameworks adicionales, que combina mapas interactivos y datos climáticos en tiempo real.  
El usuario puede seleccionar un **origen** y un **destino**, trazar una ruta entre ellos y visualizar el clima tanto en los puntos seleccionados como en la ruta.

---

## 🚀 Características

- 🗺️ **Mapa interactivo con Leaflet**: permite visualizar y navegar en un mapa dinámico.  
- 📍 **Autocompletado de lugares con Nominatim (OpenStreetMap)**: búsqueda de ubicaciones de origen y destino.  
- 🛣️ **Rutas con OpenRouteService API**: cálculo de trayectorias entre dos puntos (origen → destino).  
- 🌦️ **Clima en tiempo real con OpenWeather**: muestra información meteorológica actualizada en los puntos seleccionados.  
- 🎨 **Estilos con TailwindCSS**: diseño moderno y responsivo.  
- ⚙️ **Configuración con Webpack**: compilación y bundling manual para React.  

---

## 📦 Tecnologías utilizadas

- [React](https://react.dev/)  
- [Leaflet](https://leafletjs.com/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Webpack](https://webpack.js.org/)  
- [Nominatim API](https://nominatim.openstreetmap.org/)  
- [OpenRouteService API](https://openrouteservice.org/dev/#/api-docs/v2)  
- [OpenWeather API](https://home.openweathermap.org/)  

---

## 🔧 Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo

2. Instala las dependencias:
    ```bash
    npm install

3. Inicia el servidor de desarrollo:
    ```bash
    npm start

4. Configurar keys en el archivo .env:
    ORS_API_KEY (https://api.openrouteservice.org/v2)

5. Abre el navegador en:
    http://localhost:3000


