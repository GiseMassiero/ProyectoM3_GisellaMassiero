               🏎️ PROYECTO: CHAT INTERACTIVO "RADIADOR SPRINGS AI"

               ¡Bienvenido al sistema de comunicación de Radiador Springs! 

Ésta es una aplicación web desarrollada como Proyecto Integrador del Módulo 3.

La aplicación permite conversar con diferentes personajes de la película **Cars** mediante Inteligencia Artificial utilizando la API de **Google Gemini**.

Cada personaje posee una personalidad propia y responde respetando su estilo característico, generando una experiencia de conversación dinámica e interactiva.

---

# 📖 DESCRIPCIÓN DEL PROYECTO: 

Cars Chat IA es una Single Page Application (SPA) desarrollada con Vite y JavaScript Vanilla.

El usuario puede seleccionar uno de los personajes disponibles y mantener una conversación utilizando Inteligencia Artificial.

Los personajes implementados son:

- 🚗 Doc Hudson: El mentor. Serio, sabio y con la experiencia de toda una leyenda de la pista.
- 🚙 Mate: Divertido, torpe pero sabio. El mejor amigo que puedes tener para una charla amigable.
- 🚘 Sally: Inteligente, sofisticada, empática y positiva.
- 🏎️ Rayo McQueen: Competitivo, seguro de sí mismo, motivador y pasional. ¡Siempre listo para un "¡Cuchau!"!

Cada uno posee un prompt personalizado para conservar su forma de hablar, personalidad y comportamiento durante toda la conversación.

La aplicación consume la API de Google Gemini mediante una API REST alojada en Vercel.

---

# 🛠 TECNOLOGÍAS UTILIZADAS: 

- HTML5
- CSS3
- JavaScript
- Vite
- SPA (Single Page Application)
- Hash Router
- Google Gemini API
- Vercel
- Git
- GitHub

---



#  🛠️ REQUISITOS PARA EJECUCIÓN LOCAL: 


Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js 18 o superior
- npm
- Vercel CLI

Instalar Vercel CLI:

* npm install -g vercel
  
--- 

▶️ Instalación

- Clonar el repositorio

- git clone https://github.com/GiseMassiero/ProyectoM3_GisellaMassiero.git

- Ingresar al proyecto

- cd ProyectoM3_GisellaMassiero

⚙️ Instalar dependencias

npm install


⚙️ Configurar variables de entorno:

* Crea un archivo .env en la raíz del proyecto y agrega tu API Key de Gemini:

GEMINI_API_KEY=tu_clave_aqui

--- 

🌟 EJECUTAR EN ENTORNO DE DESARROLLO:

Utiliza el CLI de Vercel para emular las funciones serverless:

* vercel dev
* La aplicación estará disponible en http://localhost:3000.

---

🧪 EJECUCCIÓN DE TEST:

Para verificar la integridad del código y las respuestas del sistema:

* npm test
  
* (Asegúrate de tener configurado tu framework de pruebas como Jest o Vitest).

<img width="713" height="262" alt="Captura de pantalla 2026-07-07 004802" src="https://github.com/user-attachments/assets/0bb4e510-ec81-43ca-89f3-4696c4372c9a" />

---

🚀 DESPLIEGUE A VERCEL

Este proyecto está optimizado para Vercel. Si ya tienes instalada la CLI:

* Crear una cuenta en Vercel.
* Importar el repositorio desde GitHub.
* Configurar la variable de entorno:
* GEMINI_API_KEY
* Ejecutar el Deploy.

El despliegue se realizará automáticamente al hacer git push a la rama main de tu repositorio conectado.

<img width="840" height="419" alt="image" src="https://github.com/user-attachments/assets/1ae003e1-8a8b-45a8-bbbf-6f52deabc403" />


Pantalla de selección de personaje:

<img width="1047" height="730" alt="image" src="https://github.com/user-attachments/assets/19db5f07-ac03-4fff-b2d9-989d7fb34fc9" />


Interfaz de chat funcionando:


<img width="1228" height="784" alt="image" src="https://github.com/user-attachments/assets/b9c0a1f8-c923-4728-9f69-76b1529f12f9" />

---

🔗 Enlace a la aplicación:

 Haz clic aquí para ver el proyecto desplegado en Vercel


 👉   proyecto-m3-gisella-massiero.vercel.app

---

🤖 REGISTRO DE USO DE INTELIGENCIA ARTIFICIAL: 

En el desarrollo de este proyecto, se utilizó asistencia de IA (Gemini/ChatGPT) para:

--- 

Promts utilizados :
"Estoy desarrollando mi Proyecto Integrador M3 de Soy Henry utilizando JavaScript Vanilla y Vite.

Necesito organizar correctamente la estructura del proyecto siguiendo buenas prácticas para una Single Page Application (SPA).

Quiero separar el código por responsabilidades (views, router, api, assets y estilos), mantener una estructura escalable y fácil de mantener, sin utilizar frameworks como React.

¿Podrías sugerirme una estructura de carpetas profesional y explicarme brevemente la función de cada una?"

 * respuesta:
 
 src/
 
 ├── app/
 
 │       ├── api/
   
 │       ├── routes/
 
 │       ├── views/
 
 │       └── main.js
 
 ├── assets/
 
 ├── styles/
 
 └── ...

---
promts utilizados:  

"Estoy desarrollando una Single Page Application (SPA) con JavaScript Vanilla y Vite para mi Proyecto Integrador de Soy Henry.

Necesito integrar la API de Google Gemini para que los usuarios puedan conversar con distintos personajes. Quiero realizar las solicitudes mediante `fetch`, utilizando una API Key almacenada en un archivo `.env`, sin exponerla directamente en el código.

¿Podrías explicarme cómo estructurar el módulo encargado de consumir la API, cómo enviar el mensaje del usuario, recibir la respuesta del modelo y manejar posibles errores de conexión o respuestas inválidas?
También me gustaría conocer buenas prácticas para mantener el código organizado y reutilizable."

* respuesta:
  
"Una buena forma de organizar el consumo de la API de Gemini es crear un módulo independiente, por ejemplo api.js, que concentre toda la lógica de comunicación con el servicio. De esta manera, las vistas solo se encargan de capturar la interacción del usuario y mostrar los resultados, mientras que el módulo de la API gestiona las solicitudes.

Para proteger la clave de acceso, guardala en un archivo .env utilizando una variable como VITE_GEMINI_API_KEY. Vite permitirá acceder a ella mediante import.meta.env, evitando escribir la clave directamente en el código fuente.

El flujo recomendado sería el siguiente:

La vista obtiene el mensaje ingresado por el usuario.
Ese mensaje se envía a una función del módulo api.js.
La función realiza una petición fetch al endpoint de Gemini utilizando el método POST.
El cuerpo de la solicitud debe incluir el mensaje del usuario y, si corresponde, el prompt que define la personalidad del personaje seleccionado.
Una vez recibida la respuesta, se extrae el texto generado por el modelo y se devuelve a la vista para mostrarlo en el chat.

También es recomendable implementar manejo de errores utilizando try...catch. Si ocurre un problema de conexión, una respuesta vacía o un error del servidor, la aplicación puede mostrar un mensaje amigable al usuario en lugar de detener su funcionamiento.

Para mantener el código organizado, conviene separar las responsabilidades:

api.js: comunicación con Gemini.
views: interfaz y eventos del usuario.
router: navegación entre las vistas.
assets: imágenes y recursos.
styles: estilos CSS.

Esta separación facilita el mantenimiento del proyecto, permite reutilizar funciones y hace que la aplicación sea más escalable conforme se agreguen nuevas funcionalidades."

--- 

también se utilizó la IA para: 

*  Resolución de errores de sintaxis y manejo de promesas en las peticiones fetch al servidor.
*  Resolución de errores de JavaScript
*  Optimización del diseño CSS
*  Documentación y comentarios del proyecto


--- 

✨ FUNCIONALIDADES:

-Selección de personaje.
-Conversación con IA.
-Personalidades diferentes para cada personaje.
-SPA sin recargar la página.
-Navegación mediante Hash Router.
-Responsive Design.
-Consumo de API REST.
-Variables de entorno protegidas.

👩‍💻 Autor:

Gisella Massiero



