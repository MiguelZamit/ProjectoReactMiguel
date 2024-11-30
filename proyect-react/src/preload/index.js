import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'


// Custom APIs for renderer
const api = {
  openConfirmationDialog: (title, message) => ipcRenderer.invoke('openConfirmationDialog', title, message),

  openEditConfirmationDialog: (message) => ipcRenderer.invoke('openEditConfirmationDialog', message),

  addTask: (item) => ipcRenderer.send('addTask', item), 

  getTasks: () => ipcRenderer.invoke('getTasks'),

  deleteTask: (item) => ipcRenderer.invoke('deleteTask', item),

  updateTask: (item) => ipcRenderer.send('updateTask', item),

  getTask: (itemId) => ipcRenderer.invoke('getTask', itemId),

  saveList: () => ipcRenderer.invoke('saveList')

}



// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
