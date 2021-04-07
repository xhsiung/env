const {app, ipcMain, BrowserWindow, globalShortcut} = require("electron")
const fs = require("fs")

//express
const { myapp, myhost,myport }  = require('./noapp.js');

let isF12=false
myapp.listen( myport ,  function () {
	console.log('Express server listening on');
});

function createWindow(){
	let mainWin = new BrowserWindow({
		//frame: false,
		//transparent: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		}
	})

	//mainWin.webContents.openDevTools();
	//mainWin.loadFile("./public/index.html")
	mainWin.loadURL(`http://${myhost}:${myport}`)

	//load front-end js
	const jsStr = fs.readFileSync(__dirname + "/mojs/render.js",encoding="utf-8" );
	mainWin.webContents.executeJavaScript( jsStr )

	//IPC
	ipcMain.on("main", (ev, args) => {
		console.log(args);
		ev.reply("submain", "pong");
		//ev.sender.send("submain","pong2")
		//mainWin.webContents.send("submain","pong3")
	})

	globalShortcut.register('CmdOrCtrl+F12', ()=>{				
		!isF12 ? mainWin.isFocused && mainWin.webContents.openDevTools() :
			mainWin.isFocused && mainWin.webContents.closeDevTools();	
		isF12 = !isF12
	})
}	

app.whenReady().then(  createWindow  )

app.on("window-all-closed", () =>{
	console.log("closed window")	
	app.quit()
})
