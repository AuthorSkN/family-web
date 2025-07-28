import React from 'react';
import ReactDOM from 'react-dom/client';
import {Tree} from "@/components/Tree";
import {ReactFlowProvider} from "@xyflow/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ReactFlowProvider>
            <Tree/>
        </ReactFlowProvider>

    </React.StrictMode>,
);
