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
    const isFeatured = data.project.featured;
    return (
        <div
            className={`px-5 py-3 shadow-xl rounded-2xl bg-[var(--theme-bg)] cursor-pointer transition-all group relative ${isFeatured
                    ? 'border-4 border-[var(--theme-accent)] scale-110 hover:shadow-[0_0_30px_var(--theme-accent)]'
                    : 'border-2 border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:shadow-[0_0_20px_var(--theme-accent)]'
                }`}
            onClick={() => data.onClick(data.project)}
            style={{
                boxShadow: (data.project.status.includes('Live') || isFeatured) ? '0 0 15px rgba(var(--theme-accent-rgb), 0.6)' : undefined,
                zIndex: isFeatured ? 10 : 1
            }}
        >
            {isFeatured && (
                <div className="absolute -top-3 -right-3 bg-[var(--theme-accent)] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                    ★ Featured
                </div>
            )}
            <Handle type="target" position={Position.Top} className="!w-2 !h-2 !bg-[var(--theme-accent)] !border-none" />
            <div className={`flex items-center gap-3 ${isFeatured ? 'p-2' : ''}`}>
                <div className={`p-2 rounded-lg bg-[var(--theme-accent)]/10 text-[var(--theme-accent)] group-hover:scale-110 transition-transform ${isFeatured ? 'bg-[var(--theme-accent)]/20' : ''}`}>
                    <LayoutGrid className={isFeatured ? "w-6 h-6" : "w-5 h-5"} />
                </div>
                <div>
                    <h3 className={`${isFeatured ? 'text-lg' : 'text-sm'} font-bold text-[var(--theme-text)]`}>{data.project.title}</h3>
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

        // Projects Row
        const normalProjectsY = 300;
        const featuredProjectY = 100;

        // Position projects
        const normalProjects = projects.filter(p => !p.featured);
        const featuredProject = projects.find(p => p.featured);

        let normalIdx = 0;
        projects.forEach((proj) => {
            const projId = `proj-${proj.id}`;
            let posX = 0;
            let posY = 0;

            if (proj.featured) {
                // Center the featured project above the rest
                posX = ((normalProjects.length - 1) * xSpacing) / 2;
                posY = featuredProjectY;
            } else {
                posX = normalIdx * xSpacing;
                posY = normalProjectsY;
                normalIdx++;
            }

            initialNodes.push({
                id: projId,
                type: 'project',
                position: { x: posX, y: posY },
                data: { project: proj, onClick: (p: Project) => setActiveProject(p) },
            });
        });

        // We will place all tech stacks above and below the projects to make it look like an ecosystem.
        const techStackNodesAdded = new Set<string>();

        // Alternating top and bottom rows for tech stacks
        const topRowY = -50;
        const bottomRowY = 500;
        let stackCounter = 0;

        allTechStacks.forEach((stack) => {
            const stackId = `tech-${stack}`;
            techStackNodesAdded.add(stack);

            const isTop = stackCounter % 2 === 0;
            // Spread them across the X axis
            const stackX = (stackCounter * (xSpacing * normalProjects.length) / Math.max(1, allTechStacks.length - 1));
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
                const projNode = initialNodes.find(n => n.id === projNodeId);
                const isStackAbove = stackNode.position.y < (projNode?.position.y || 250);

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
