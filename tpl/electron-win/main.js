const {app, BrowserWindow}  = require("electron")

//for render process require('')
app.allowRendererProcessReuse = false

function createWindow(){
  let mainWin = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true
    }
  })
  mainWin.loadFile("index.html")
  mainWin.webContents.openDevTools()

  //neon addon
  let msg = require( './modules/noapp' ).helloWorld()
  console.log( msg ) 
}

app.whenReady().then( createWindow);

app.on("window-all-closed", ()=>{
  console.log("exit")
  app.exit()
})