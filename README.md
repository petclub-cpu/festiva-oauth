# Festiva · Retorno OAuth para Trello

Página estática para recibir la respuesta del inicio de sesión de Trello y ofrecer volver a Festiva en Android. **No autentica por sí misma y no almacena ni intercambia tokens.**

## Publicar en GitHub Pages

Repositorio: https://github.com/petclub-cpu/festiva-oauth

1. Abrir **Settings → Pages**.
2. En **Build and deployment → Source**, elegir **Deploy from a branch**.
3. Seleccionar **main**, carpeta **/(root)** y guardar.
4. Confirmar que la página está publicada en:
   https://petclub-cpu.github.io/festiva-oauth/callback/
5. Registrar **esa misma URL exacta** como URL de retorno autorizada en la configuración OAuth de la aplicación Festiva en Trello.

## Flujo diseñado

Tras la autorización, Trello puede devolver `code` y `state` a `/callback/`. La página elimina esos parámetros de la barra de direcciones y muestra un enlace de regreso: `festiva://oauth/trello?code=...&state=...`.

**Advertencia**: hasta que una APK nueva registre ese enlace y valide `state`, `PKCE` y el ciclo de tokens mediante un mecanismo admitido por Trello, la conexión no funcionará. El esquema personalizado por sí solo no es una garantía de seguridad: se debe vincular la respuesta con una solicitud iniciada previamente y evitar capturas por otras aplicaciones.

## Seguridad

- No subir client secrets, claves, tokens, contraseñas ni respaldos de ventas a este repositorio público.
- Un `code` temporal puede estar expuesto transitoriamente al navegador y a GitHub Pages. No incluirlo en logs ni analítica.
- La página nunca realiza peticiones a servicios externos ni almacena la respuesta.
- El backend, si es necesario para un cliente confidencial de Trello, debe alojar el secreto y hacer el intercambio de código por tokens de forma segura.
- La página no debe considerarse producción hasta validar el flujo completo con Trello y un Android real.
