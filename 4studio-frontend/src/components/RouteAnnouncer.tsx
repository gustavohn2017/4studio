/**
 * Este componente substitui o route announcer padrão do Next.js com uma versão vazia.
 * É usado em conjunto com:
 * 1. Meta tag em layout.tsx: <meta name="next-route-announcer" content="disable" />
 * 2. CSS em disable-announcer.css para esconder qualquer elemento de anunciador
 * 3. Configuração atualizada em next.config.ts
 */
import React from 'react';

export function RouteAnnouncer() {
  // Cria um componente vazio que substitui qualquer announcer gerado pelo Next.js
  return <div id="__next-route-announcer__" aria-hidden="true" style={{ display: 'none', visibility: 'hidden' }}></div>;
}

export default RouteAnnouncer;
