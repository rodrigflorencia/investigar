// Add type definitions for Node.js globals
declare namespace NodeJS {
  interface Global {
    Buffer: any;
    process: any;
  }
}

declare const global: NodeJS.Global;
declare const Buffer: any;
declare const process: any;
