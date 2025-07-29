import {Id} from "@/types/common";
import {ElkExtendedEdge, ElkNode, LayoutOptions} from "elkjs/lib/elk-api";
import type {Edge, Node} from "@xyflow/react";
import {XYPosition} from "@xyflow/react";

export type PersonElkNode = ElkNode & {
    data: { label?: string }
}

export type ElkEdge = ElkExtendedEdge & {
    id: Id;
    type: string;
}

export type ElkGraph = {
    id: Id;
    children: PersonElkNode[];
    layoutOptions: LayoutOptions;
    edges: ElkEdge[]
}

export type LayoutedGraph = Omit<ElkGraph, 'children'> & { children?: (ElkGraph['children'][number] & ElkNode)[] }

export type ReactFlowNode = Node & {
    position: XYPosition;
};
export type ReactFlowEdge = Edge;