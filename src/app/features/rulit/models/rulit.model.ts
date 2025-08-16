import { ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DocumentReference } from 'firebase/firestore';

// From test.types.ts
export type TestName =
    | 'learning'
    | 'short_memory_test'
    | 'long_memory_test'
    | 'no_next_test';

// From IRulitUser.ts
export interface IRulitStep {
    elapsedTime: number;
    incorrectMoves: number;
}
export interface IRulitExercise {
    totalMoves: number;
    totalIncorrectMoves: number;
    totalExerciseTime: number;
    steps: Array<IRulitStep>;
}
export interface IRulitUser {
    userId: string;
    email: string;
    name: string;
    graphAndSolutionCode: string;
    shortMemoryTest: Array<IRulitExercise>;
    longMemoryTest: Array<IRulitExercise>;
    stepErrors: Array<number>;
    nextTest: TestName;
    trainingDate: any;
    testDate: any;
}

// From IRulitSettings.ts
export interface IRulitSettings {
    IS_TEST_OPEN: boolean;
    solutions: Array<DocumentReference>;
}
export interface IRulitSolutionSettings {
    graphNumber: number;
    solutionNumber: number;
    shortMem_MaxExercises: number;
    shortMem_MaxCorrectExercises: number;
    longMem_MaxExercises: number;
    longMem_MaxCorrectExercises: number;
}


// From Figure2d.ts
export interface IDrawable {
    draw(ctx: CanvasRenderingContext2D, image?: HTMLImageElement): void;
}
export interface IFigure2d extends IDrawable {
    posX: number;
    posY: number;
    fill;
}
export class Figure2d implements IFigure2d, IDrawable {
    constructor(
        private _posX: number,
        private _posY: number,
        private _fill
    ) { }
    get posX() { return this._posX; }
    set posX(theX: number) { if (theX >= 0) { this._posX = theX; } }
    get posY() { return this._posY; }
    set posY(theY: number) { if (theY >= 0) { this._posY = theY; } }
    set fill(theFill) { this._fill = theFill; }
    get fill() { return this._fill; }
    draw(theContext: CanvasRenderingContext2D): void {
        theContext.fillStyle = this._fill;
    }
}

// From Circle.ts
interface ICircle extends IFigure2d {
    radius: number;
    isPointInside(thePoint: { x: number; y: number }): boolean;
}
export class Circle extends Figure2d implements ICircle {
    constructor(
        private _radius: number,
        theX: number,
        theY: number,
        theFill,
    ) {
        super(theX, theY, theFill);
    }
    get radius() { return this._radius; }
    set radius(theRadius: number) { if (theRadius > 0) { this._radius = theRadius; } }
    draw(theContext: CanvasRenderingContext2D) {
        super.draw(theContext);
        theContext.beginPath();
        theContext.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        theContext.fill();
        theContext.closePath();
        theContext.restore();
    }
    isPointInside(thePoint: { x: number; y: number }): boolean {
        const distance = (thePoint.x - this.posX) * (thePoint.x - this.posX) + (thePoint.y - this.posY) * (thePoint.y - this.posY);
        return distance < this.radius * this.radius;
    }
}

// From GraphNode.ts
export const COLOR_WHITE = '#FFF';
export const COLOR_TRANSPARENT_WHITE = '#F6F6F6';
export const COLOR_GREEN = '#90C14B';
export const COLOR_TRANSPARENT_GREEN = '#BED79A';

interface IGraphNode {
    id: number;
    isFirstNode: boolean;
    isLastNode: boolean;
    isActive: boolean;
    isHighlighted: boolean;
    circle: Circle;
    resetColor(): void;
}
export class GraphNode implements IGraphNode, IFigure2d {
    private readonly _circle: Circle;
    private _isHighlighted: boolean;
    constructor(
        private readonly _id: number,
        private readonly _isFirstNode: boolean,
        private readonly _isLastNode: boolean,
        private _isActive: boolean,
        theX: number, theY: number, radius,
    ) {
        this._circle = new Circle(radius, theX, theY, COLOR_TRANSPARENT_WHITE);
        this._isHighlighted = false;
        this.resetColor();
    }
    get posX(): number { return this._circle.posX; }
    get posY(): number { return this._circle.posY; }
    get fill(): any { return this._circle.fill; }
    get id(): number { return this._id; }
    get isActive(): boolean { return this._isActive; }
    set isActive(e: boolean) { this._isActive = e; this.resetColor(); }
    get isHighlighted(): boolean { return this._isHighlighted; }
    set isHighlighted(e: boolean) { this._isHighlighted = e; this.resetColor(); }
    get isFirstNode(): boolean { return this._isFirstNode; }
    get isLastNode(): boolean { return this._isLastNode; }
    get circle(): Circle { return this._circle; }
    draw(theContext: CanvasRenderingContext2D, nodeImage: HTMLImageElement): void {
        this._circle.draw(theContext);
        theContext.beginPath();
        theContext.drawImage(nodeImage, this._circle.posX - this._circle.radius, this._circle.posY - this._circle.radius, this._circle.radius * 2, this._circle.radius * 2);
        theContext.closePath();
    }
    resetColor(): void {
        this._circle.fill = COLOR_TRANSPARENT_WHITE;
        if (this.isFirstNode || this.isLastNode) { this._circle.fill = COLOR_TRANSPARENT_GREEN; }
        if (this.isActive) { this._circle.fill = COLOR_GREEN; }
        if (this.isHighlighted && !this.isActive) {
            this._circle.fill = COLOR_WHITE;
            if (this.isFirstNode || this.isLastNode) { this._circle.fill = COLOR_GREEN; }
        }
    }
}
export interface IRulitStep {
    elapsedTime: number;
    incorrectMoves: number;
}

// Exercise stored in DB
export interface IRulitExercise {
    totalMoves: number;
    totalIncorrectMoves: number;
    totalExerciseTime: number;
    steps: Array<IRulitStep>;
}
// RulitUser stored in DB
export interface IRulitUser {
    userId: string;
    email: string;
    name: string;
    graphAndSolutionCode: string;
    shortMemoryTest: Array<IRulitExercise>;
    longMemoryTest: Array<IRulitExercise>;
    stepErrors: Array<number>;
    nextTest: TestName;
    trainingDate: any;
    testDate: any;

}

// From Graph.ts
interface IGraph {
    nodes: Array<GraphNode>;
    adjList: Map<GraphNode, Array<number>>;
    activeNode: GraphNode;
    activeNode$: Observable<GraphNode>;
    firstNode: GraphNode;
    addNode(theNode: GraphNode, edges: Array<number>): void | boolean;
    isActiveNodeNextTo(theNode: GraphNode): boolean;
    getNodeById(theNodeId: number): GraphNode | undefined;
}
export class Graph implements IGraph {
    private readonly _adjList: Map<GraphNode, Array<number>>;
    private readonly _activeNodeChange$ = new Subject<GraphNode>();
    private _activeNode: GraphNode;
    constructor() {
        this._adjList = new Map<GraphNode, Array<number>>();
        this._activeNode = this.firstNode;
        this._activeNodeChange$.subscribe((theNode) => { this._activeNode = theNode; });
    }
    addNode(theNode: GraphNode, edges: Array<number>) { this._adjList.set(theNode, edges); }
    get nodes(): Array<GraphNode> { return Array.from(this._adjList.keys()); }
    get adjList(): Map<GraphNode, Array<number>> { return this._adjList; }
    get activeNode(): GraphNode { return this._activeNode; }
    get activeNode$() { return this._activeNodeChange$.asObservable(); }
    set activeNode(theNode: GraphNode) {
        this.nodes.forEach(node => node.id == theNode.id ? node.isActive = true : node.isActive = false);
        this._activeNodeChange$.next(theNode);
    }
    get firstNode(): GraphNode {
        let node: GraphNode;
        this.nodes.forEach(n => { if (n.isFirstNode) { node = n; } });
        return node;
    }
    getNodeById(theNodeId: number): GraphNode | undefined {
        return this.nodes.find(node => theNodeId == node.id);
    }
    isActiveNodeNextTo(theNode: GraphNode): boolean {
        return this._adjList.get(this._activeNode)?.includes(theNode.id);
    }
}

// From CanvasGraph.ts
export const COLOR_RED = '#E52F2D';
export const COLOR_VIOLET = '#4A4067';
export const COLOR_TRANSPARENT_VIOLET = '#9C97AB';
interface ICanvasGraph {
    draw(): void;
    getNodeAtPosition(clientX: number, clientY: number): GraphNode | undefined;
    flickerNode(theNode: GraphNode): void;
    highlightNode(theNode: GraphNode): void;
    resetHighlights(): void;
}
export class CanvasGraph extends Graph implements ICanvasGraph {
    private _context: CanvasRenderingContext2D;
    private _canvas: ElementRef<HTMLCanvasElement>;
    constructor(
        private readonly _nodeRegularImg: HTMLImageElement,
        private readonly _nodeHoverImg: HTMLImageElement,
        private readonly _nodeStartImg: HTMLImageElement,
        private readonly _nodeEndImg: HTMLImageElement,
    ) {
        super();
    }
    set canvas(theCanvas: ElementRef<HTMLCanvasElement>) {
        this._canvas = theCanvas;
        this._context = this._canvas.nativeElement.getContext('2d');
    }
    draw() {
        const canvasRect = this._canvas.nativeElement.getBoundingClientRect();
        this._context.clearRect(0, 0, canvasRect.width, canvasRect.height);
        for (const [theNode, edges] of this.adjList.entries()) {
            edges.forEach((connectedNodeId) => {
                const connectedNode = this.getNodeById(connectedNodeId);
                this.drawEdgeBetweenNodes(theNode, connectedNode);
            });
        }
        this.nodes.forEach((node) => {
            let image = this._nodeRegularImg;
            if (node.isHighlighted || node.isActive) { image = this._nodeHoverImg; }
            if (node.isFirstNode) { image = this._nodeStartImg; }
            if (node.isLastNode) { image = this._nodeEndImg; }
            node.draw(this._context, image);
        });
    }
    private drawEdgeBetweenNodes(theNode: GraphNode, connectedNode: GraphNode) {
        this._context.beginPath();
        this._context.lineWidth = 3;
        this._context.moveTo(theNode.posX, theNode.posY);
        this._context.lineTo(connectedNode.posX, connectedNode.posY);
        if ((theNode.isActive && connectedNode.isHighlighted) || (theNode.isHighlighted && connectedNode.isActive)) {
            this._context.strokeStyle = COLOR_VIOLET;
        } else {
            this._context.strokeStyle = COLOR_TRANSPARENT_VIOLET;
        }
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    }
    getNodeAtPosition(clientX: number, clientY: number): GraphNode | undefined {
        const canvasRect = this._canvas.nativeElement.getBoundingClientRect();
        const thePosition = { x: clientX - canvasRect.left, y: clientY - canvasRect.top };
        let theNode: GraphNode;
        this.nodes.forEach((node) => { if (node.circle.isPointInside(thePosition)) { theNode = node; } });
        return theNode;
    }
    flickerNode(newNode: GraphNode): void {
        let frame = 0;
        this.activeNode.circle.fill = COLOR_WHITE;
        if (this.activeNode.isFirstNode) { this.activeNode.circle.fill = COLOR_TRANSPARENT_GREEN; }
        const i = setInterval(() => {
            Math.abs(frame % 2) == 1 ? (newNode.circle.fill = COLOR_RED) : newNode.resetColor();
            this.draw();
            frame++;
            const requestId = requestAnimationFrame(() => this.flickerNode);
            if (frame >= 5) {
                this.activeNode.resetColor();
                newNode.resetColor();
                this.draw();
                cancelAnimationFrame(requestId);
                clearInterval(i);
            }
        }, 100);
    }
    highlightNode(theNode: GraphNode): void { theNode.isHighlighted = true; }
    resetHighlights(): void { this.nodes.forEach((node) => { if (node.isHighlighted) { node.isHighlighted = false; } }); }
}

// From GraphUtils.ts
import { INodeData, GRAPH_1, GRAPH_2, SOLUTION_1, SOLUTION_2 } from './rulit.data';

const NODE_REGULAR_IMAGE_URL = './assets/images/rulit-node-regular.svg';
const NODE_HOVER_IMAGE_URL = './assets/images/rulit-node-hover.svg';
const NODE_START_IMAGE_URL = './assets/images/rulit-node-start.svg';
const NODE_END_IMAGE_URL = './assets/images/rulit-node-end.svg';

export const DEFAULT_GRAPH_SOLUTION = '19db35dd';
export const SECOND_GRAPH_SOLUTION = '6a5ba4ef';

export function getGraphAndSolutionData(graphAndSolutionId: string): { graphData: Array<INodeData>; solutionData: Array<number>; } {
    let graph: Array<INodeData>;
    let solution: Array<number>;

    switch (graphAndSolutionId) {
        case DEFAULT_GRAPH_SOLUTION:
            solution = Object.assign([], SOLUTION_1);
            graph = GRAPH_1;
            break;
        case SECOND_GRAPH_SOLUTION:
            solution = Object.assign([], SOLUTION_2);
            graph = GRAPH_2;
            break;
    }

    return { graphData: graph, solutionData: solution };
}

function buildNode(nodeData: INodeData, nodeSpacing: number, nodeRadius: number): GraphNode {
    return new GraphNode(
        nodeData.id,
        nodeData.isFirstNode,
        nodeData.isLastNode,
        false,
        nodeData.column * nodeSpacing,
        nodeData.row * nodeSpacing,
        nodeRadius,
    );
}

function loadImage(src): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

export async function buildGraph(GRAPH_DATA: Array<INodeData>, theCanvas: ElementRef<HTMLCanvasElement>): Promise<CanvasGraph> {
    const nodeRegularImg = await loadImage(NODE_REGULAR_IMAGE_URL);
    const nodeHoverImg = await loadImage(NODE_HOVER_IMAGE_URL);
    const nodeStartImg = await loadImage(NODE_START_IMAGE_URL);
    const nodeEndImg = await loadImage(NODE_END_IMAGE_URL);

    const newGraph = new CanvasGraph(
        nodeRegularImg,
        nodeHoverImg,
        nodeStartImg,
        nodeEndImg,
    );

    const nodeSpacing = theCanvas.nativeElement.width * 0.052;
    const nodeRadius = nodeSpacing * 0.6;

    GRAPH_DATA.forEach((nodeData) => {
        const newNode = buildNode(nodeData, nodeSpacing, nodeRadius);
        newGraph.addNode(newNode, nodeData.edges);
    });

    newGraph.canvas = theCanvas;

    return newGraph;
}

// From test.types.ts (already at top)
export interface DialogData {
    title: string;
    message: string;
}

export interface LongMemoryDialogData {
    userName: string;
    message: string;
}

export interface IRulitTestService {
    testName: TestName;
    isTesting: boolean;
    isExerciseOver$: Observable<boolean>;
    isTestOver$: Observable<string | null>;
    initGraph(
        canvas: ElementRef<HTMLCanvasElement>,
        graphAndSolutionCode: string,
    ): Promise<void>;
    startTest(userService: any): void;
    isNodeNextInSolution(theNode: GraphNode): boolean;
    setActiveNode(theNode: GraphNode): void;
    registerError(user: IRulitUser): void;
    getCurrentTestExercisesArray(userService: any): IRulitExercise[];
}
