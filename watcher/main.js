const path = require('path')
const { app, BrowserWindow, shell } = require('electron')

const gotTheLock = app.requestSingleInstanceLock()
let mainWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './pages/preload.js'),
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(path.join(__dirname, './pages/index.html'))

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // config.fileProtocol is my custom file protocol
    if (url.startsWith(config.fileProtocol)) {
        return { action: 'allow' };
    }
    // open url in a browser and prevent default
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools()
  }
}

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.whenReady().then(async () => {
    createWindow()

    try {
      // Helia is an ESM-only module but Electron currently only supports CJS
      // at the top level, so we have to use dynamic imports to load it
      const { createNode } = await import('./helia.mjs')
      const node = await createNode()
      const id = node.libp2p.peerId
      console.log(id)
    } catch (err) {
      console.error(err)
    }

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
