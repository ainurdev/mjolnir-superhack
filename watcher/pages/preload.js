const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mapi', {
  selectFolder: () => ipcRenderer.invoke('dialog:openDirectory'),
  startUpload: (folder) => ipcRenderer.invoke('upload:start', folder),
  onUploadMessage: (callback) => {
    ipcRenderer.on('upload:message', function(evt, message) {
      callback(message)
    })
  },
})
