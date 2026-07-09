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
- History API
- Google Gemini API
- Vercel
- Git
- GitHub

---



#  🛠️ REQUISITOS PARA EJECUCIÓN LOCAL: 

*Un consejo importante:

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js 18 o superior
- npm

 🛠️ Configuración inicial:
Para que vercel dev funcione correctamente, debes tener instalado el CLI globalmente:

- npm i -g vercel

Utiliza el CLI de Vercel para emular las funciones serverless:

* vercel dev
  
* La aplicación estará disponible en http://localhost:3000.


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


🧪 EJECUCCIÓN DE TEST:

Para verificar la integridad del código y las respuestas del sistema:

* npm test
  
* (Asegúrate de tener configurado tu framework de pruebas como Jest o Vitest).

<img width="717" height="312" alt="test" src="https://github.com/user-attachments/assets/ba7b3571-db4e-4294-8ef7-c634776e6aab" />


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


* Presenta una interfaz adaptable con un diseño responsive enfocado en mobile.first:
  

  <img width="648" height="916" alt="responsive" src="https://github.com/user-attachments/assets/5acb9803-f057-4da2-987c-e96c96417cd0" />



---

🔗 Enlace a la aplicación:

 Haz clic aquí para ver el proyecto desplegado en Vercel


 👉  https://proyecto-m3-gisella-massiero.vercel.app
 

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

💡 Importate:

En el desarrollo de este proyecto, he utilizado a Gemini (IA de Google) como mi colaborador y mentor de programación. 

Mi objetivo no fue automatizar la creación del proyecto, sino potenciar mi capacidad de resolución de problemas bajo estándares de arquitectura Full Stack profesional.

¿Por qué trabajé de esta manera?

Refinamiento Arquitectónico:

 La IA me ayudó a validar la robustez de mi arquitectura SPA, asegurando una correcta gestión del estado, persistencia de datos y una implementación segura de variables de entorno, garantizando que nunca se expusieran claves de API en el cliente.

Buenas Prácticas de UI/UX: 

Colaboramos para iterar sobre el diseño mobile-first, refinando el uso de Flexbox, la gestión de unidades relativas y la implementación de un sticky footer que mejora la experiencia de usuario sin comprometer la fluidez de la navegación.


Debug y Optimización:

 Utilicé la IA como un "pair programmer" para realizar pruebas de código, detectar posibles fugas de memoria y optimizar el rendimiento de las animaciones CSS, asegurando que el despliegue final sea sólido y profesional.

Este proyecto es el resultado de mi capacidad para dirigir herramientas de vanguardia, integrar sus sugerencias de manera crítica y aplicarlas para construir una aplicación funcional, segura y con una UX pulida.

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



