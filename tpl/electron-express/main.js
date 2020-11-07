const {app, ipcMain, BrowserWindow} = require("electron")
const fs = require("fs")

//express
const { myapp }  = require('./noapp.js');

myapp.listen( 3333,  function () {
	console.log('Express server listening on');
});

function createWindow(){
	let mainWin = new BrowserWindow({
		//frame: false,
		//transparent: true,
		webPreferences: {
			nodeIntegration: true
		}
	})

	mainWin.webContents.openDevTools();
	//win.loadFile("index.html")
	mainWin.loadURL("http://localhost:3333")

	//load front-end js
	const jsStr = fs.readFileSync("./mojs/render.js",encoding="utf-8" );
	mainWin.webContents.executeJavaScript(jsStr )

	//IPC
	ipcMain.on("main", (ev, args) => {
		console.log(args);

		ev.reply("submain", "pong");
		//ev.sender.send("submain","pong2")
		//mainWin.webContents.send("submain","pong3")
	})

}	

app.whenReady().then(  createWindow  )

app.on("window-all-closed", () =>{
	console.log("closed window")	
	app.quit()
})
