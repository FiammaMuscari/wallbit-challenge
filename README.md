# Wallbit Junior Frontend Challenge - README

<div style="display: flex; margin-top: 40px; margin-bottom: 40px;">
  <img src="./public/app.webp" alt="Interfaz de la aplicación" style="width: 50%; max-width: 420px; margin-right: 10px;" />
  <img src="./public/app2.webp" alt="Otra vista de la aplicación" style="width: 50%; max-width: 420px;" />
</div>

Este proyecto es una solución al desafío de frontend propuesto por Wallbit y Gonzalo Pozzo, en el que se debía crear un carrito de compras utilizando preferentemente React. A continuación, se detallan las características implementadas y los pasos para correr el proyecto.

## Descripción del Proyecto

El objetivo de este ejercicio fue desarrollar una aplicación que permita a los usuarios agregar productos a un carrito de compras utilizando únicamente el ID del producto y la cantidad deseada. La aplicación utiliza la API de [Fake Store API](https://fakestoreapi.com/) para obtener la información de los productos.

## Características Implementadas

- **Agregar productos al carrito**: Los usuarios pueden ingresar el ID del producto y la cantidad deseada para agregar productos al carrito.
- **Manejo de errores**: Se manejan los errores que devuelve la API, mostrando mensajes adecuados al usuario.
- **Lista de productos agregados**: Se muestra una tabla con los productos agregados al carrito, incluyendo:
  - Título del producto
  - Precio del producto
  - Imagen del producto
  - Cantidad agregada por el usuario

### Extras

- **Persistencia del carrito**: El carrito se mantiene al recargar la página.
- **Total de productos**: Se muestra el total de productos agregados en el carrito.
- **Costo total del carrito**: Se calcula y muestra el costo total de todos los productos en el carrito.
- **Fecha de creación del carrito**: Se muestra la fecha
  - Se mantiene al recargar la página, no desaparece
  - Al vaciar el carrito se reinicia la fecha
  - Al eliminar todos los items se reinicia
  - No cambia el valor al refrescar

### Extras 2

- **Notificaciones visuales**: Se implementaron alertas que indican cuando un producto ha sido agregado con éxito
- **Estilo de UI**: Se utilizó Tailwind CSS para proporcionar un diseño acorde a Wallbit
- **Manejo de Cantidad**: Se incorporó un input que permite a los usuarios especificar la cantidad deseada para cada producto desde cada item al presionar el numero de cantidad. Si el usuario intenta establecer la cantidad en cero y luego sale del campo, el valor anterior se restaurará automáticamente, garantizando que no se guarde un valor invalido ni negativo.

## Cómo Correr el Proyecto

Este proyecto fue desarrollado utilizando Vite con React, TypeScript, PNPM y Tailwind CSS. A continuación se detallan los pasos para instalar y correr la aplicación:

## Requisitos Previos

✅ Asegúrate de tener instalado Node.js y PNPM en tu sistema. Puedes verificar si están instalados ejecutando los siguientes comandos:

| Comando   | Descripción                   |
| --------- | ----------------------------- |
| `node -v` | Muestra la versión de Node.js |
| `pnpm -v` | Muestra la versión de PNPM    |

### Clona el repositorio y configura el proyecto

A continuación, sigue estos pasos para clonar el repositorio e instalar las dependencias:

| Comando                                                            | Descripción                          |
| ------------------------------------------------------------------ | ------------------------------------ |
| `git clone https://github.com/FiammaMuscari/wallbit-challenge.git` | Clona el repositorio                 |
| `cd wallbit-challenge`                                             | Cambia al directorio del repositorio |
| `pnpm install`                                                     | Instala las dependencias             |
| `pnpm run dev`                                                     | Inicia el servidor de desarrollo     |

Ahora puedes abrir el navegador en [http://localhost:5173/](http://localhost:5173/) y ver el proyecto sin problema.

### Servidor de la API

El servidor de nuestra api se encuentra alojado en https://github.com/FiammaMuscari/cart-api-server y deployado en Render https://cart-api-1.onrender.com/api/cart encontraras los detalles del servidor en ese repositorio y el GET del carrito con el .json del estado actual del objeto. Se deja de ejemplo la carpeta server en este repositorio para poder ver los controladores, la ruta y la estructura del servidor, para correrlo ingresar a `wallbit-challenge\src\server>` y correr `node server.js`
se va a mostrar
Server is running on http://localhost:5000
ingresa a http://localhost:5000/api/cart y cambia la variable de entorno por http://localhost:5000/api todo esto lo podes ver en el dev.example recuerda que solo podes dejar una opción.

1. El archivo `.env.example` se incluye en el repositorio como ejemplo. Debes renombrarlo a `.env` y personalizar los valores. En nuestro ejemplo lo tendremos en http://localhost:5000/api para local o https://cart-api-1.onrender.com/api para producción.

2. En producción (por ejemplo, en Vercel), debes agregar las variables de entorno en el panel "Environment Variables"

Podrás ver cómo cambia el storage dinámicamente en https://cart-api-1.onrender.com/api/cart con las peticiones desde nuestro client, recuerda que al generar tu propio servidor deberas reemplazar la ruta por la de tu proyecto en render por un tema de permisos de cors y cambiarlo en el servidor en

```
server.js

app.use(
  cors({
    origin: [ "here"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  }))
```

<div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
  <div>
    Redes
  </div>
  <div style="display: flex; justify-content: center; margin-top: 20px;">
    <a href="https://www.twitch.tv/ninfuwu" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/-Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" alt="Twitch" style="border-radius: 3px; margin-right: 5px;" />
    </a>
    <a href="https://x.com/__fiamy" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" style="border-radius: 3px;" />
    </a>
  </div>
</div>
