const { app, BrowserWindow, globalShortcut, session } = require('electron');
const path = require('path');
const url = require('url');
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
      allowRunningInsecureContent: false
    }
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // Local Angular dev server during development.
    mainWindow.loadURL('http://localhost:4200/index.html');
  } else {
    // Packaged app should load the built Angular files.
    mainWindow.loadFile(path.join(__dirname, 'dist', 'astrolight', 'browser', 'index.html'));
  }

    // Open the DevTools (optional)
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
    createWindow();

    // Only enable DevTools in development
    if (process.env.NODE_ENV !== 'production') {
        // Your F12 toggle code
        globalShortcut.register('F12', () => {
          if (mainWindow && mainWindow.webContents) {
              if (mainWindow.webContents.isDevToolsOpened()) {
                  mainWindow.webContents.closeDevTools();
              } else {
                  mainWindow.webContents.openDevTools();
              }
          }
        });
    }
    // Register F12 to toggle DevTools

});

app.on('window-all-closed', () => {
    // Unregister all global shortcuts
    globalShortcut.unregisterAll();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Create a new window when the app is activated (e.g., clicking the Dock icon on macOS)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
