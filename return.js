/* Puente de retorno OAuth: requiere validación de state y PKCE en Android.
   No procesa ni conserva tokens, secretos ni contraseñas. */
(() => {
  'use strict';
  const p = new URLSearchParams(window.location.search);
  const code = p.get('code');
  const state = p.get('state');
  const error = p.get('error');
  const status = document.getElementById('status');
  const button = document.getElementById('open-app');
  window.history.replaceState(null, '', window.location.pathname);
  const plausible = value => typeof value === 'string' && value.length > 0 && value.length <= 2048;
  if (!plausible(state)) {
    status.textContent = 'No se pudo validar la respuesta. Volvé a Festiva e intentá conectar otra vez.';
    return;
  }
  const q = new URLSearchParams();
  q.set('state', state);
  if (plausible(error)) {
    q.set('error', error);
    status.textContent = 'Trello no completó la autorización. Volvé a Festiva para consultar el motivo.';
  } else if (plausible(code)) {
    q.set('code', code);
    status.textContent = 'Trello terminó la autorización. Tocá el botón para regresar a Festiva.';
  } else {
    status.textContent = 'No se recibió un código de autorización. Volvé a Festiva e intentá nuevamente.';
    return;
  }
  button.href = 'festiva://oauth/trello?' + q.toString();
  button.hidden = false;
})();
