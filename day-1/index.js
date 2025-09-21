// main.js — Electron main process
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 650,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  // Load UI
  win.loadFile(path.join(__dirname, 'index.html'));

  // Show when ready to avoid white flash
  win.once('ready-to-show', () => win.show());

  // Optional: devtools for development
  // win.webContents.openDevTools({ mode: 'detach' });

  return win;
}

app.whenReady().then(() => {
  createWindow();

  // macOS: re-create if no windows
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit on all windows closed except macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/* -----------------------
   Example IPC handlers
   ----------------------- */

// A simple ping-pong handler from renderer
ipcMain.handle('ping', async (event, message) => {
  // do some work, maybe async
  const now = new Date().toLocaleString();
  return `pong — received "${message}" at ${now}`;
});

// Example: expose current theme
ipcMain.handle('get-theme', () => {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light';
});

// Example: main-triggered event to renderer (if needed)
// Use win.webContents.send('channel', data) from main to renderer
