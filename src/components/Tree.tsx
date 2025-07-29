import {Background, Panel, ReactFlow, useEdgesState, useNodesState, useReactFlow} from "@xyflow/react";
import ElkConstructor, {ELK} from "elkjs";
import {useCallback, useLayoutEffect, useMemo} from "react";

import '@xyflow/react/dist/style.css';
import './xy-theme.css';
import {ElkGraph, LayoutedGraph, ReactFlowEdge, ReactFlowNode} from "@/components/types";
import {LayoutOptions} from "elkjs/lib/elk-api";
import {Person} from "@/types/persons";
import {getGraph} from "@/components/helpers";

const elk: ELK = new ElkConstructor();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '100',
    'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes: ReactFlowNode[], edges: ReactFlowEdge[], options: LayoutOptions = {}): Promise<{
    layoutedNodes: ReactFlowNode[],
    layoutedEdges: ReactFlowEdge[]
}> => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph: ElkGraph = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            // Hardcode a width and height for elk to use when layouting.
            width: 150,
            height: 50,
        })),
        edges: edges.map(flowEdge => ({
            ...flowEdge,
            sources: [flowEdge.source],
            targets: [flowEdge.target],
            type: 'smoothstep'
        })),
    };

    return elk
        .layout(graph)
        .then((layoutedGraph: LayoutedGraph) => ({
            layoutedNodes: layoutedGraph.children?.map((node) => ({
                ...node,
                // React Flow expects a position property on the node instead of `x`
                // and `y` fields.
                position: {x: node.x ?? 0, y: node.y ?? 0},
            })) ?? [],

            layoutedEdges: layoutedGraph.edges.map(edge => ({
                ...edge,
                source: edge.sources[0],
                target: edge.targets[0]
            })),
        }))
};

export type TreeProps = {
    persons: Person[];
}

export const Tree = ({persons}: TreeProps) => {
    const [initialNodes, initialEdges] = useMemo(() => getGraph(persons), [])

    const [nodes, setNodes, onNodesChange] = useNodesState<ReactFlowNode>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState<ReactFlowEdge>(initialEdges);
    const {fitView} = useReactFlow();

    const onLayout = useCallback(
        ({direction}) => {
            const opts: LayoutOptions = {'elk.direction': direction, ...elkOptions};

            getLayoutedElements(nodes, edges, opts).then(
                ({layoutedNodes, layoutedEdges}) => {
                    setNodes(layoutedNodes);
                    setEdges(layoutedEdges);
                    fitView();
                },
            );
        },
        [nodes, edges],
    );

    useLayoutEffect(() => {
        onLayout({direction: 'DOWN'});
    }, []);

    return (
        <div style={{height: '100vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Panel position="top-right">
                    <button
                        className="xy-theme__button"
                        onClick={() => onLayout({direction: 'DOWN'})}
                    >
                        vertical layout
                    </button>

                    <button
                        className="xy-theme__button"
                        onClick={() => onLayout({direction: 'RIGHT'})}
                    >
                        horizontal layout
                    </button>
                </Panel>
                <Background/>
            </ReactFlow>
        </div>
    );
}