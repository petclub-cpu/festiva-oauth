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


## Integración Android pendiente (Festiva 3.3)

El archivo [oauth-config.public.json](oauth-config.public.json) contiene únicamente parámetros **públicos**, incluido el Client ID recibido del propietario. No debe añadirse ningún `client_secret`, token, autorización en curso ni archivo de respaldo.

La APK Festiva 3.2 utiliza **Trello Auth (key + token)**. No interpreta el retorno OAuth 2.0.

Antes de activar la integración:
1. Confirmar en Trello que el cliente es **Public**; si es **Confidential**, implementar backend seguro para el `client_secret` y el intercambio de tokens.
2. En Android generar `state` aleatorio impredecible y PKCE S256 con `code_verifier` único, persistidos temporalmente en almacenamiento privado.
3. Abrir el flujo en navegador externo con `redirect_uri` exactamente igual al configurado en Trello.
4. Añadir recepción del retorno en Android; validar `state`, un único uso del código y el vínculo con la solicitud iniciada. El enlace `festiva://oauth/trello` no es un App Link verificado y necesita mitigaciones adicionales ante interceptación.
5. Intercambiar el código por tokens a través del flujo admitido por Trello; proteger el token y renovar los tokens rotativos sin exponerlos a JavaScript de terceros ni a respaldos.
6. Probar en un dispositivo real la conexión, permisos, recuperación de sesión, envío de tarjeta y checklist, fallos de red y ausencia de duplicados.

**Importante:** GitHub Pages solo sirve de puente visible. No tiene ningún `client_secret` y no puede intercambiar tokens de un cliente confidencial. No se declara completada la integración hasta que la APK cumpla los pasos anteriores.
