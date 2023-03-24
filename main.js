const { app, BrowserWindow,ipcMain } = require("electron");
const path = require("path");
const http=require('http')

const createWindow = () => {
  const win = new BrowserWindow({
    frame:true,//设置为无边框窗口，默认为true
    width: 800,//窗口宽度
    height: 600,//窗口高度
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });


  win.loadFile("index.html");
  ipcMain.handle('get-printlist',async ()=>{
    return await win.webContents.getPrintersAsync()
  })

  ipcMain.handle('handle-print',async (e,defalutPrint)=>{
    console.log('defalutPrint',defalutPrint)
    const win = new BrowserWindow({
     show:false
    });
    // let pdfurl='https://cwydzkj-idoc-rds-test.oss-cn-beijing.aliyuncs.com/test/2023/04/3091ee2f-2b8a-425d-92d3-03adebceebf9.pdf?Expires=1679628797&OSSAccessKeyId=LTAI5tJ2heTN5rxXxjgr92N3&Signature=GHnNnoERzS%2F8R9ZnSjRkANn5ssg%3D&response-content-type=application%2Foctet-stream'
    win.loadURL()
    win.webContents.on('did-finish-load',()=>{
  
    })



   
    win.webContents.print({
      silent:false,
    })
  })
  
};
app.whenReady().then(() => {
  createWindow();
});
app.on('login', (event, webContents, details, authInfo, callback) => {
  // event.preventDefault()
  callback('username', 'secret')
})
//最后一个窗口关闭时，退出应用
//如果你没有监听此事件并且所有窗口都关闭了，默认的行为是控制退出程序
app.on('window-all-closed',()=>{
  app.quit()
})

