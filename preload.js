// Preload script for Electron security
// This file runs in a secure context and can expose limited APIs to the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Add any APIs you need to expose to the Angular app
  // openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // onUpdateCounter: (callback) => ipcRenderer.on('update-counter', callback)
});