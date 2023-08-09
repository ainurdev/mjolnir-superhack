const path = require('path')
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './pages/preload.js'),
      nodeIntegration: true
    }
  })

  win.loadFile(path.join(__dirname, './pages/index.html'))

  if (process.env.NODE_ENV !== 'production') {
    win.webContents.openDevTools()
  }
}

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
