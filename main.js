const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let win;

// init win
function createWindow() {
    // Create browser window
    win = new BrowserWindow({width: 1200, height: 900, icon: __dirname+'/assets/img/icon.png'});

    // Load index.html
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'start.html'),
        protocol: 'file:',
        slashes: true
    }));

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {
                    label:'Exit', 
                    click() { 
                        app.quit() 
                    } 
                }
            ]
        }
    ]);
    Menu.setApplicationMenu(menu); 

    //Open devtools
    // win.webContents.openDevTools();

    // win.on('closed', () => {
    //     win = null;
    // });
}

// Run create window function
app.on('ready', createWindow);


// Quit when all windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});