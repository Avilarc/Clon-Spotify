# ⚡ RiffVault 🤘

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Stack](https://img.shields.io/badge/stack-MERN-green.svg)

---

## 🚀 Características Principales

*   **Autenticación Segura**: Sistema de Login y Registro con encriptación de contraseñas (bcrypt) y JWT.
*   **Metal UI**: Interfaz de usuario moderna con modo oscuro, efectos Glassmorphism y animaciones fluidas.
*   **Reproductor Integrado**: Control de reproducción persistente con barra de progreso interactiva.
*   **Búsqueda en Tiempo Real**: Filtra bandas y canciones instantáneamente desde el header.
*   **Panel de Administración**: Área exclusiva para administradores para gestionar usuarios.
*   **Base de Datos Híbrida**: Soporte para MongoDB Local y MongoDB In-Memory (para desarrollo rápido sin instalación local).
*   **Seed Automático**: La base de datos se puebla automáticamente con bandas legendarias (Metallica, Iron Maiden, etc.) al iniciar.

---

## 🛠️ Stack Tecnológico

### Frontend (Client)
*   **React** + **Vite**: Para una UI ultrarrápida.
*   **React Router DOM**: Navegación SPA (Single Page Application).
*   **Context API**: Manejo de estado global (Auth).
*   **CSS Variables & Glassmorphism**: Diseño moderno y mantenible.

### Backend (Server)
*   **Node.js** + **Express**: API RESTful robusta.
*   **MongoDB** + **Mongoose**: Modelado de datos.
*   **JWT (JSON Web Tokens)**: Seguridad y manejo de sesiones.
*   **MongoDB Memory Server**: Base de datos volátil para pruebas y desarrollo sencillo.

---

## 📋 Requisitos Previos

*   **Node.js** (v14 o superior recomendado)
*   **NPM** (incluido con Node.js)
*   *(Opcional)* **MongoDB** instalado localmente si deseas persistencia de datos a largo plazo.

---

## ⚙️ Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto completo en tu máquina local.

### 1. Configuración del Backend (Servidor)

El backend maneja la lógica de negocio, la base de datos y la autenticación.

```bash
# Navega a la carpeta del servidor
cd server

# Instala las dependencias
npm install

# Inicia el servidor en modo desarrollo
npm run dev
```

> **Nota**: El servidor intentará conectarse a un MongoDB local. Si no lo encuentra, iniciará automáticamente una instancia de **In-Memory MongoDB**, por lo que no necesitas instalar nada extra para probarlo.
>
> El servidor correrá en: `http://localhost:5000`

### 2. Configuración del Frontend (Cliente)

El frontend es la interfaz visual con la que interactúan los usuarios.

Abrir una **nueva terminal** y ejecutar:

```bash
# Navega a la carpeta del cliente
cd client

# Instala las dependencias
npm install

# Inicia la aplicación React
npm run dev
```

> La aplicación se abrirá automáticamente en: `http://localhost:5173` (o el puerto que indique Vite).

---

## 🔐 Credenciales de Prueba

El proyecto incluye un "Seeder" que crea usuarios por defecto la primera vez que se inicia el servidor.

| Rol | Email | Contraseña | Descripción |
| :--- | :--- | :--- | :--- |
| **👑 Administrador** | `admin@metal.com` | `adminpassword` | Acceso total + Panel de Administración |
| **🤘 Usuario** | `user@metal.com` | `userpassword` | Acceso estándar a reproducción y búsqueda |

---

## 📂 Estructura del Proyecto

```
/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Header, Player, Card)
│   │   ├── context/        # Estado global (AuthContext)
│   │   ├── pages/          # Vistas principales (Home, Login, Admin)
│   │   └── services/       # Comunicación con la API
│   └── ...
│
├── server/                 # Backend (Node + Express)
│   ├── models/             # Esquemas de Mongoose (User, Artist, Album)
│   ├── routes/             # Endpoints de la API (Auth, API)
│   ├── middleware/         # Protección de rutas y roles
│   └── utils/              # Datos de prueba y seeders
│
└── README.md               # Documentación del proyecto
```

---

## 🤝 Contribuir

¡Las Pull Requests son bienvenidas! Si tienes ideas para añadir más funcionalidades "Metal" (como playlists colaborativas o ecualizador), siéntete libre de contribuir.

1.  Fork del proyecto
2.  Crea tu rama (`git checkout -b feature/AmazingFeature`)
3.  Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4.  Push a la rama (`git push origin feature/AmazingFeature`)
5.  Abre un Pull Request

---

*Desarrollado con 🖤 y mucho ☕ para la comunidad Metal.*
