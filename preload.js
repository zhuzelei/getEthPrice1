const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    onNowEthPrice: (callback) => {
        ipcRenderer.on('nowEthPrice', callback);
    }
})