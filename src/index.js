import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { MantineProvider, createTheme } from '@mantine/core';

import '@mantine/core/styles.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DndProvider backend={HTML5Backend}>
        <MantineProvider defaultColorScheme='dark'>
            <Notifications />
            <ModalsProvider>
                <App />
            </ModalsProvider>
        </MantineProvider>
    </DndProvider>
);
