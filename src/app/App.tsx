import React from 'react';
import ReactDOM from 'react-dom/client';
import {Tree} from "@/components/Tree";
import {ReactFlowProvider} from "@xyflow/react";
import {data} from './mocks'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactFlowProvider>
            <Tree persons={data}/>
        </ReactFlowProvider>

    </React.StrictMode>,
);
