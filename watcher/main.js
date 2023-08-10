const path = require('path')
const fs = require('fs')
const { app, BrowserWindow, shell, ipcMain, dialog } = require('electron')

let mainWindow = null
const gotTheLock = app.requestSingleInstanceLock()
const data = {
  node: null,
  unixfs: null,
  ipns: null
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './pages/preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true
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

  ipcMain.handle('dialog:openDirectory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  })

  ipcMain.handle('upload:start', async (e, dir) => {
    if (data.node === null) {
      createHeliaNode()
      return
    }

    try {
      if (!dir) {
        throw new Error()
      }

      const stat = await fs.promises.stat(dir)
      if (!stat.isDirectory()) {
        throw new Error()
      }
    } catch (err) {
      return {
        error: "Selected path is not a directory"
      }
    }

    let playlistFilename = null
    let playlistFile = null
    const uploadedFiles = []
    if (fs.readdirSync(dir).length !== 0) {
      // sort files by created date
      let fileNames = fs.readdirSync(dir)

      playlistFilename = fileNames.find((filename) => {
        return filename.endsWith('.m3u8')
      })

      if (playlistFilename) {
        mainWindow.webContents.send("upload:message", { message: "found playlist file", playlistFilename })
        fileNames = fileNames
          .filter((filename) => filename !== playlistFilename)
          .map((filename) => {
            const stat = fs.statSync(path.join(dir, filename))
            return {
              filename,
              stat
            }
          }).sort((a, b) => {
            return a.stat.birthtimeMs - b.stat.birthtimeMs
          })

        mainWindow.webContents.send("upload:message", { message: "catching up with existing files" })
        playlistFile = fs.readFileSync(path.join(dir, playlistFilename), 'utf8')
        const files = fileNames.map(({ filename }) => {
          return {
            path: filename,
            content: fs.readFileSync(path.join(dir, filename))
          }
        })

        for await (const file of data.unixfs.addAll(files, { wrapWithDirectory: true })) {
          mainWindow.webContents.send("upload:message", { message: "uploaded segment", segment: file.path, matchingCID: file.cid.toString()})
          playlistFile = playlistFile.replace(file.path, file.cid.toString())
          uploadedFiles.push(file.path)
        }

        fs.writeFileSync(path.join(dir, playlistFilename), playlistFile)
        mainWindow.webContents.send("upload:message", { message: "updated playlist file", playlistFile })
      }
    }

    mainWindow.webContents.send("upload:message", { message: "waiting for changes" })
    fs.watch(dir, async (eventType, filename) => {
      if (playlistFilename) {
        if (eventType !== 'rename' || filename !== playlistFilename) {
          return
        }
      } else {
        if (filename.endsWith('.m3u8')) {
          mainWindow.webContents.send("upload:message", { message: "playlist file is created", filename })
          playlistFilename = filename
          playlistFile = fs.readFileSync(path.join(dir, playlistFilename), 'utf8')
          const files = fs.readdirSync(dir).map(({ filename }) => {
            return {
              path: filename,
              content: fs.readFileSync(path.join(dir, filename))
            }
          })

          mainWindow.webContents.send("upload:message", { message: "uploading files" })
          for await (const file of data.unixfs.addAll(files, { wrapWithDirectory: true })) {
            mainWindow.webContents.send("upload:message", { message: "uploaded segment", segment: file.path, matchingCID: file.cid.toString()})
            playlistFile = playlistFile.replace(file.path, file.cid.toString())
            uploadedFiles.push(file.path)
          }

          fs.writeFileSync(path.join(dir, playlistFilename), playlistFile)
          mainWindow.webContents.send("upload:message", { message: "updated playlist file", playlistFile })
        }
        return
      }

      playlistFile = fs.readFileSync(path.join(dir, playlistFilename), 'utf8')
      const files = fs.readdirSync(dir)
        .map(({ filename }) => {
          return {
            path: filename,
            content: fs.readFileSync(path.join(dir, filename))
          }
        })

      for await (const file of data.unixfs.addAll(files, { wrapWithDirectory: true })) {
        mainWindow.webContents.send("upload:message", { message: "uploaded segment", segment: file.path, matchingCID: file.cid.toString()})
        playlistFile = playlistFile.replace(file.path, file.cid.toString())
        uploadedFiles.push(file.path)
      }
      fs.writeFileSync(path.join(dir, playlistFilename), playlistFile)
      mainWindow.webContents.send("upload:message", { message: "updated playlist file", playlistFile })
    })
  })

  if (process.env.NODE_ENV !== 'production') {
    mainWindow.webContents.openDevTools()
  }
}

const createHeliaNode = async () => {
  try {
    // Helia is an ESM-only module but Electron currently only supports CJS
    // at the top level, so we have to use dynamic imports to load it
    const { createNode, createUnixFs, createIPNS } = await import('./helia.mjs')
    data.node = await createNode()
    const id = data.node.libp2p.peerId
    data.unixfs = await createUnixFs(data.node)
    data.ipns = await createIPNS(data.node)

    if (process.env.NODE_ENV !== 'production') {
      console.log(id)
    }
  } catch (err) {
    console.error(err)
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
    createHeliaNode()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
