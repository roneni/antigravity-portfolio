import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    applyNodeChanges,
    applyEdgeChanges,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    Handle,
    Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { projects, allTechStacks, Project } from '../data/projects';
import ProjectSidePanel from './ProjectSidePanel';
import { Code2, Github, LayoutGrid } from 'lucide-react';

// === Custom Nodes ===
const ProjectNode = ({ data }: { data: { project: Project; onClick: (p: Project) => void } }) => {
    return (
        <div
            className="px-5 py-3 shadow-xl rounded-2xl bg-[var(--theme-bg)] border-2 border-[var(--theme-accent)] cursor-pointer hover:shadow-[0_0_20px_var(--theme-accent)] transition-all group"
            onClick={() => data.onClick(data.project)}
            style={{
                boxShadow: data.project.status.includes('Live') ? '0 0 15px rgba(var(--theme-accent-rgb), 0.3)' : undefined
            }}
        >
            <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-[var(--theme-accent)] !border-none" />
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] group-hover:scale-110 transition-transform">
                    <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-[var(--theme-text)]">{data.project.title}</h3>
                    <p className="text-[10px] text-[var(--theme-text)] opacity-60 uppercase tracking-widest mt-0.5">{data.project.status}</p>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} className="!w-2 !h-2 !bg-[var(--theme-accent)] !border-none" />
        </div>
    );
};

const TechStackNode = ({ data }: { data: { label: string } }) => {
    return (
        <div className="px-4 py-2 shadow-md rounded-full bg-[var(--theme-text)] text-[var(--theme-bg)] border border-transparent font-medium text-xs tracking-wide flex items-center gap-2 hover:scale-105 transition-transform">
            <Handle type="target" position={Position.Top} className="!w-1.5 !h-1.5 !bg-[var(--theme-bg)] !border-none" />
            <Code2 className="w-3.5 h-3.5" />
            {data.label}
            <Handle type="source" position={Position.Bottom} className="!w-1.5 !h-1.5 !bg-[var(--theme-bg)] !border-none" />
        </div>
    );
};

const nodeTypes = {
    project: ProjectNode,
    techStack: TechStackNode,
};

// === Layout Logic ===
const nodeWidth = 220;
const nodeHeight = 80;
const xSpacing = 280;
const ySpacing = 160;

export default function EcosystemGraph() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    useEffect(() => {
        const initialNodes: Node[] = [];
        const initialEdges: Edge[] = [];

        // Projects Row (Y = center)
        const projectY = 250;

        // Position projects horizontally
        projects.forEach((proj, idx) => {
            const projId = `proj-${proj.id}`;
            initialNodes.push({
                id: projId,
                type: 'project',
                position: { x: idx * xSpacing, y: projectY },
                data: { project: proj, onClick: (p: Project) => setActiveProject(p) },
            });
        });

        // We will place all tech stacks above and below the projects to make it look like an ecosystem.
        const techStackNodesAdded = new Set<string>();

        // Alternating top and bottom rows for tech stacks
        const topRowY = 50;
        const bottomRowY = 450;
        let stackCounter = 0;

        allTechStacks.forEach((stack) => {
            const stackId = `tech-${stack}`;
            techStackNodesAdded.add(stack);

            const isTop = stackCounter % 2 === 0;
            // Spread them across the X axis
            const stackX = (stackCounter * (xSpacing * projects.length) / allTechStacks.length);
            const stackY = isTop ? topRowY : bottomRowY;

            initialNodes.push({
                id: stackId,
                type: 'techStack',
                position: { x: stackX, y: stackY },
                data: { label: stack },
            });
            stackCounter++;
        });

        // Create Edges
        projects.forEach((proj) => {
            const projNodeId = `proj-${proj.id}`;
            proj.tags.forEach((tag, idx) => {
                const stackNodeId = `tech-${tag}`;
                const stackNode = initialNodes.find(n => n.id === stackNodeId);
                if (!stackNode) return;

                // Find if stack is above or below
                const isStackAbove = stackNode.position.y < projectY;

                initialEdges.push({
                    id: `e-${projNodeId}-${stackNodeId}`,
                    source: isStackAbove ? stackNodeId : projNodeId,
                    target: isStackAbove ? projNodeId : stackNodeId,
                    animated: true,
                    style: { stroke: 'var(--theme-accent)', opacity: 0.6, strokeWidth: 1.5 },
                });
            });
        });

        setNodes(initialNodes);
        setEdges(initialEdges);
    }, []);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        <div className="w-full h-full relative" style={{ minHeight: '600px' }}>
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[var(--theme-border)] bg-[var(--theme-bg)]/50 backdrop-blur-xl">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.2 }}
                    minZoom={0.5}
                    maxZoom={1.5}
                    proOptions={{ hideAttribution: true }}
                >
                    <Background color="var(--theme-border)" gap={24} size={2} />
                    <Controls
                        className="!bg-[var(--theme-bg)] !border-[var(--theme-border)] !opacity-80"
                        showInteractive={false}
                    />
                </ReactFlow>
            </div>

            <ProjectSidePanel
                project={activeProject}
                onClose={() => setActiveProject(null)}
            />
        </div>
    );
}
