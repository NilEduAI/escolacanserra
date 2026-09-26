/* S'executa abans de pintar la pàgina: aplica el tema i la mida de text desats. */
try {
  var t = localStorage.getItem('cs-theme');
  if (t) document.documentElement.dataset.theme = t;
  var s = localStorage.getItem('cs-size');
  if (s) document.documentElement.style.fontSize = [100, 112.5, 125][+s] + '%';
} catch (e) { /* sense emmagatzematge */ }
