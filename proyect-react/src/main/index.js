import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { dialog } from 'electron'
import  TaskManager  from './TaskManager.js'


const store = new TaskManager({ name: 'main' })


var mainWindow
function createWindow() {
  // Create the browser window.
   mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// AÑADIR TEAREA
ipcMain.on('addTask', (event, item) => {

  store.addItem(item);

})

// IMPORTANTE: LA FUNCION DE DELETE TASK DE TASKMANAGER LO TENGO QUE HACER ALLI

// ESTA ES PARA OBTENER TODA LA LISTA
ipcMain.handle('getTasks', async () => {
  try {
    const list = await store.getList(); // Aquí esperamos que la promesa se resuelva
    return list; // Devolvemos la lista al renderer
  } catch (error) {
    console.error(error);
    return []; // Retornamos un array vacío en caso de error
  }
});


// GET ITEM (ID)
ipcMain.handle('getTask', async (event, itemId) => {
  return await store.getItem(itemId)
})


// UPDATE ITEM
ipcMain.on('updateTask', (event, item) => {
  store.updateItem(item) // Cambiado del original
})

ipcMain.handle('openConfirmationDialog', async (event, title, message) => {
  const window = BrowserWindow.getFocusedWindow();
  const result = await dialog.showMessageBox(window, {
    type: 'warning',
    title: title,
    message: message,
    buttons: ['Yes', 'Cancel'],
    cancelId: 1,
    defaultId: 0
  });

  return result.response === 0;
})

ipcMain

ipcMain.handle('openEditConfirmationDialog', async (event, message) => {

  const window = BrowserWindow.getFocusedWindow();
  const result = await dialog.showMessageBox(window, {

    type: 'question',
    message: message,
    buttons: ['Save', 'Discard', 'Cancel'],
    saveId: 0,
    discardId: 1,
    cancelId: 2

  });

  return result



})

ipcMain.handle('deleteTask', async(event, item) =>{

  store.deleteItem(item)

})


ipcMain.handle('saveList', () => {

  store.saveList()

})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
