
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/KSA/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/KSA"
  },
  {
    "renderMode": 2,
    "route": "/KSA/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/KSA/farmstock"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 27960, hash: '20fa144c010a68b52f4ea1e2508190d8761504425364a24f3fff0eea395e5a79', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17263, hash: '098a4fafaef7752c4c5666741d3540945efdf675e018197772195aedcbb9379b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 48558, hash: '0b8d1cdf39a19e17b5c1b030449e2eb540856d6fb0ea828a764e910416ddc7c5', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'index.html': {size: 48558, hash: '0b8d1cdf39a19e17b5c1b030449e2eb540856d6fb0ea828a764e910416ddc7c5', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'farmstock/index.html': {size: 29390, hash: '8b2cfaa9c24fe283cc0377a8efc1ae00a35d2e3f780900e5113de24744c83595', text: () => import('./assets-chunks/farmstock_index_html.mjs').then(m => m.default)},
    'styles-63PMUIWA.css': {size: 238590, hash: 'bWTlSPeaBYE', text: () => import('./assets-chunks/styles-63PMUIWA_css.mjs').then(m => m.default)}
  },
};
