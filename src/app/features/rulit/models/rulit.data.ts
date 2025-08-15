export interface INodeData {
    id: number;
    isFirstNode: boolean;
    isLastNode: boolean;
    edges: Array<number>;
    row: number;
    column: number;
}

export const GRAPH_1: Array<INodeData> = [
    { id: 1, isFirstNode: false, isLastNode: false, edges: [2, 11], row: 2, column: 4 },
    { id: 2, isFirstNode: false, isLastNode: false, edges: [1, 3, 11, 12], row: 3, column: 6 },
    { id: 3, isFirstNode: false, isLastNode: false, edges: [2, 4, 12, 17], row: 5, column: 8 },
    { id: 4, isFirstNode: false, isLastNode: false, edges: [3, 5], row: 3, column: 10 },
    { id: 5, isFirstNode: false, isLastNode: false, edges: [4, 6], row: 1, column: 11 },
    { id: 6, isFirstNode: false, isLastNode: false, edges: [5, 7, 8], row: 4, column: 14 },
    { id: 7, isFirstNode: false, isLastNode: true, edges: [6, 8], row: 7, column: 14 },
    { id: 8, isFirstNode: false, isLastNode: false, edges: [6, 7, 9, 19], row: 6, column: 16 },
    { id: 9, isFirstNode: false, isLastNode: false, edges: [8, 10], row: 2, column: 16 },
    { id: 10, isFirstNode: false, isLastNode: false, edges: [9, 19], row: 3, column: 18 },
    { id: 11, isFirstNode: false, isLastNode: false, edges: [1, 2, 12, 14, 15], row: 5, column: 4 },
    { id: 12, isFirstNode: false, isLastNode: false, edges: [2, 3, 11, 13], row: 6, column: 6 },
    { id: 13, isFirstNode: true, isLastNode: false, edges: [12], row: 8, column: 7 },
    { id: 14, isFirstNode: false, isLastNode: false, edges: [11, 15, 20, 21], row: 8, column: 2 },
    { id: 15, isFirstNode: false, isLastNode: false, edges: [11, 14, 16, 21], row: 9, column: 5 },
    { id: 16, isFirstNode: false, isLastNode: false, edges: [15, 17, 22], row: 10, column: 10 },
    { id: 17, isFirstNode: false, isLastNode: false, edges: [3, 16, 18], row: 7, column: 11 },
    { id: 18, isFirstNode: false, isLastNode: false, edges: [17, 19, 22, 23], row: 9, column: 13 },
    { id: 19, isFirstNode: false, isLastNode: false, edges: [8, 10, 18, 23], row: 9, column: 17 },
    { id: 20, isFirstNode: false, isLastNode: false, edges: [14, 21], row: 11, column: 2 },
    { id: 21, isFirstNode: false, isLastNode: false, edges: [14, 15, 20], row: 12, column: 4 },
    { id: 22, isFirstNode: false, isLastNode: false, edges: [16, 18, 23], row: 13, column: 9 },
    { id: 23, isFirstNode: false, isLastNode: false, edges: [18, 19, 22], row: 12, column: 15 }
];

export const GRAPH_2: Array<INodeData> = [
    { id: 1, isFirstNode: false, isLastNode: false, edges: [2,9], row: 2, column: 1 },
    { id: 2, isFirstNode: false, isLastNode: false, edges: [1,3,5,9], row: 1, column: 5 },
    { id: 3, isFirstNode: false, isLastNode: false, edges: [2,4,5,7,11], row: 1, column: 10 },
    { id: 4, isFirstNode: false, isLastNode: false, edges: [3,7,8,12], row: 1, column: 16 },
    { id: 5, isFirstNode: false, isLastNode: false, edges: [2,3,6,9], row: 3, column: 5 },
    { id: 6, isFirstNode: false, isLastNode: false, edges: [5,9,14], row: 3, column: 8 },
    { id: 7, isFirstNode: false, isLastNode: false, edges: [3,4,11,12,17], row: 3, column: 14 },
    { id: 8, isFirstNode: false, isLastNode: false, edges: [4,12,13], row: 3, column: 18 },
    { id: 9, isFirstNode: false, isLastNode: false, edges: [1,2,5,6,15], row: 5, column: 2 },
    { id: 10, isFirstNode: false, isLastNode: false, edges: [14,16,19], row: 5, column: 7 },
    { id: 11, isFirstNode: false, isLastNode: false, edges: [3,7,14,17], row: 5, column: 11 },
    { id: 12, isFirstNode: false, isLastNode: true, edges: [4,7,8,13,18], row: 5, column: 15 },
    { id: 13, isFirstNode: false, isLastNode: false, edges: [8,12,18,20], row: 6, column: 17 },
    { id: 14, isFirstNode: false, isLastNode: false, edges: [6,10,11,19,22], row: 7, column: 10 },
    { id: 15, isFirstNode: true, isLastNode: false, edges: [9,16,21], row: 8, column: 2 },
    { id: 16, isFirstNode: false, isLastNode: false, edges: [10,15,19,21], row: 8, column: 4 },
    { id: 17, isFirstNode: false, isLastNode: false, edges: [7,11,18,22,23], row: 8, column: 13 },
    { id: 18, isFirstNode: false, isLastNode: false, edges: [12,13,17,20,23], row: 8, column: 16 },
    { id: 19, isFirstNode: false, isLastNode: false, edges: [10,14,16,21,22,25], row: 10, column: 7 },
    { id: 20, isFirstNode: false, isLastNode: false, edges: [13,18,23,27], row: 10, column: 18 },
    { id: 21, isFirstNode: false, isLastNode: false, edges: [15,16,19,24,25], row: 11, column: 3 },
    { id: 22, isFirstNode: false, isLastNode: false, edges: [14,17,19,23,25,26], row: 11, column: 10 },
    { id: 23, isFirstNode: false, isLastNode: false, edges: [17,18,20,22,26,27], row: 11, column: 14 },
    { id: 24, isFirstNode: false, isLastNode: false, edges: [21,25], row: 12, column: 1 },
    { id: 25, isFirstNode: false, isLastNode: false, edges: [19,21,22,24], row: 13, column: 6 },
    { id: 26, isFirstNode: false, isLastNode: false, edges: [22,23], row: 13, column: 12 },
    { id: 27, isFirstNode: false, isLastNode: false, edges: [20,23], row: 12, column: 16 }
];

// Solution used in graph 1
export const SOLUTION_1: Array<number> = [13,12,11,14,15,16,17,18,22,23,19,10,9,8,6,7];

// Solution used in graph 2
export const SOLUTION_2: Array<number> = [15,21,19,10,14,6,9,2,3,7,17,22,23,20,18,12];
