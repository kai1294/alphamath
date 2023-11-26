import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { MantineProvider, createTheme } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';

import '@mantine/core/styles.css';
import 'mantine-contextmenu/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MantineProvider defaultColorScheme='dark'>
        <Notifications />
        <ModalsProvider>
            <ContextMenuProvider
                shadow="md"
                borderRadius="md">
                <App />
            </ContextMenuProvider>
        </ModalsProvider>
    </MantineProvider>
);
