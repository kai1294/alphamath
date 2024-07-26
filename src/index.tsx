import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { MantineProvider, createTheme } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';
import { I18nextProvider } from 'react-i18next';

import i18n from "./i18n";

import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.css';
import "./style.css";

const theme = createTheme({
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113',
    ],
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<MantineProvider forceColorScheme='dark' theme={theme}>
        <I18nextProvider i18n={ i18n }>
            <Notifications />
            <ModalsProvider>
                <ContextMenuProvider
                    shadow="md"
                    borderRadius="md">
                    <App />
                </ContextMenuProvider>
            </ModalsProvider>
        </I18nextProvider>
    </MantineProvider>
);
