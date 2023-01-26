import { Router } from './routers';

function App() {
  if (window.location.hash.startsWith('#context_token')) {
    window.location.href = `${window.location.origin}${window.location.pathname}`;
  }
  return <Router />;
}

export default App;
