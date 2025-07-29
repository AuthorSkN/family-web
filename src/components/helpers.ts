import {Person} from "@/types/persons";
import {ReactFlowEdge, ReactFlowNode} from "@/components/types";
import {XYPosition} from "@xyflow/react";
import {generateUUID} from "@/utils/uuid";

const initialPosition: XYPosition = {x: 0, y: 0};

export function getGraph(persons: Person[]): [ReactFlowNode[], ReactFlowEdge[]] {
    const nodes: ReactFlowNode[] = persons.map(person => ({
        id: person.id,
        data: {label: `${person.firstName} ${person.secondName}`},
        position: initialPosition,
    }));
    const parentsQueue = persons.filter(parent => Object.keys(parent.parents).length === 0);
    const edges: ReactFlowEdge[] = [];
    while (parentsQueue.length > 0) {
        const parent = parentsQueue.shift()!;
        const children = persons.filter((person) => person.parents.father === parent.id || person.parents.mother === parent.id);
        edges.push(
            ...children.map((child) => ({
                id: generateUUID(),
                source: parent.id,
                target: child.id,
            }))
        );
        parentsQueue.push(...children)
    }
    return [nodes, edges]
}