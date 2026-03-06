const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

const { FileTree } = require('./fileTree');
const { compareTrees } = require('./sync');

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });

    if (result.canceled) return null;
    return result.filePaths[0];
});

ipcMain.handle('scan-folders', async (event, folderA, folderB) => {

    const treeA = new FileTree(folderA);
    const treeB = new FileTree(folderB);

    await treeA.build();
    await treeB.build();

    const result = compareTrees(treeA, treeB);

    return {
        filesA: treeA.pathMap.size,
        filesB: treeB.pathMap.size,
        identical: result.identical
    };
});