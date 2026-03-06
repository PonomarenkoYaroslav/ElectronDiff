const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {

    selectFolder: () => ipcRenderer.invoke('select-folder'),

    scanFolders: (a, b) =>
        ipcRenderer.invoke('scan-folders', a, b)

});