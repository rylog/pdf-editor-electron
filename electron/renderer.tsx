import { createRoot } from 'react-dom/client';

import App from '@/App/App';
import ColorModeProvider from '@/contexts/colorMode/ColorModeProvider';
import '@fontsource/montserrat';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <ColorModeProvider>
    <App />
  </ColorModeProvider>
);
