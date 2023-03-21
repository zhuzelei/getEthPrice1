const { app, BrowserWindow} = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    // titleBarStyle: 'hidden',
    // frame: false,
    // transparent: true,
    width: 200,
    height: 70,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  // win.webContents.openDevTools;

  // win.setIgnoreMouseEvents(true);
  win.loadFile('index.html');

  function displayEthPrice() {
    const {net} = require('electron')
  
    const req = net.request(
      'https://www.okx.com/api/v5/public/mark-price?instType=SWAP&instId=ETH-USDT-SWAP'
    )
  
    req.on('response', (response) => {
      // console.log(`STATUS: ${response.statusCode}`);
  
      response.on('data', (chunk) => {
          var dataObj = JSON.parse(chunk);
          var markPx = dataObj.data[0].markPx;
          // console.log(markPx);
          win.webContents.send('nowEthPrice', markPx);
      });
    });
    req.end();
  }

  setInterval(displayEthPrice, 1000);
};

app.whenReady().then(() => {
  // createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});

