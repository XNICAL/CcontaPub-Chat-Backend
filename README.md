# CcontaPub-Chat

Un sistema de chat en tiempo real construido con Socket.IO, Firebase y Bootstrap 5.

## Requisitos Previos

- Node.js (versión 14 o superior)
- NPM (Node Package Manager)
- Navegador web moderno

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd ccontapub-chat
```

2. Inicializa el proyecto NPM:
```bash
npm init -y
```

3. Instala las dependencias:
```bash
npm install socket.io firebase bootstrap@5.3.0 express
```

## Configuración del Entorno de Desarrollo

1. Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

2. Para servir la vista del cliente:
```bash
http-server -c-1 -p 8080
```

El flag `-c-1` desactiva el caché y `-p 8080` especifica el puerto 8080.

## Estructura de Eventos Socket.IO

### Eventos del Cliente

1. `sendUserConversations`
   - Descripción: Solicita las conversaciones del usuario
   - Uso: `socket.emit("sendUserConversations")`

2. `joinConversation`
   - Descripción: Une al usuario a una sala de chat específica
   - Parámetros: ID de la conversación
   - Uso: `socket.emit('joinConversation', conversationId)`

3. `sendMessage`
   - Descripción: Envía un mensaje en una conversación
   - Parámetros: ID de la conversación, contenido del mensaje
   - Uso: `socket.emit('sendMessage', conversationId, content)`

4. `getConversationMessages`
   - Descripción: Solicita los mensajes de una conversación
   - Parámetros: ID de la conversación
   - Uso: `socket.emit('getConversationMessages', conversationId)`

5. `deactivateConversation`
   - Descripción: Quita de la conversación actual
   - Uso: `socket.emit('deactivateConversation')`

6. `leaveConversation`
   - Descripción: Quita al usuario de una sala de chat específica
   - Parámetros: ID de la conversación
   - Uso: `socket.emit('leaveConversation', conversationId)`

### Eventos del Servidor

1. `receiveUserConversations`
   - Descripción: Recibe las conversaciones del usuario
   - Manejo: `socket.on("receiveUserConversations", (response) => {})`

2. `getUserConversations`
   - Descripción: Notifica cuando hay nuevas conversaciones
   - Manejo: `socket.on("getUserConversations", (response) => {})`

3. `sendMessage`
   - Descripción: Confirma el envío de un mensaje
   - Manejo: `socket.on("sendMessage", (response) => {})`

4. `getConversationMessages`
   - Descripción: Recibe los mensajes de una conversación
   - Manejo: `socket.on("getConversationMessages", (response) => {})`


## Sistema de Autenticación

El proyecto utiliza JWT (JSON Web Tokens) para la autenticación de usuarios.

### Generación de Token

Cuando un usuario se registra, el sistema:
1. Genera un JWT usando el ID del usuario
2. Configura la expiración del token
3. Devuelve el token junto con los datos del usuario

## API Endpoints

### Usuarios

1. Registro de Usuario
```
POST /api/v1/user
Body: {
    token: string,
    externalUserId: string,
    userName: string
}
```

2. Obtener Usuarios
```
GET /api/v1/user
Headers: {
    Authorization: "Bearer {token}"
}
```

### Conversaciones

1. Iniciar Conversación
```
POST /api/v1/conversation/init
Headers: {
    Authorization: "Bearer {token}"
}
Body: {
    userId: string,
    memberUserId: string,
    content: string
}
```

## Funcionalidades Principales

1. Autenticación de usuarios
2. Chat en tiempo real
3. Lista de contactos
4. Lista de conversaciones
5. Indicadores de lectura de mensajes
6. Notificaciones push (requiere configuración de Firebase)

## Notas Importantes

- El proyecto utiliza Firebase para las notificaciones push. Asegúrate de configurar las credenciales de Firebase en tu entorno.
- Los tokens de autenticación se almacenan en localStorage en la interfaz de prueba.
- El sistema incluye manejo de reconexiones automáticas para Socket.IO.
- La interfaz es responsive y se adapta a dispositivos móviles.
- la interfaz es funcional con Chrome Dev

## Manejo de Errores

El sistema incluye manejo de errores para:
- Campos requeridos faltantes
- Estados de usuario inválidos
- Errores de autenticación
- Errores de servicio


## Solución de Problemas

1. Si los mensajes no se envían:
   - Verifica la conexión del socket
   - Confirma que estás en una conversación activa
   - Revisa la consola del navegador para errores

2. Si las notificaciones no funcionan:
   - Verifica los permisos del navegador
   - Confirma la configuración de Firebase
   - Asegúrate de que el token del dispositivo está registrado

3. Problemas de conexión:
   - Verifica que el servidor esté corriendo
   - Confirma las URLs del servidor en el código cliente
   - Revisa los logs del servidor para errores