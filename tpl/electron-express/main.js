const {app, BrowserWindow} = require("electron")

//express
myapp = require('./noapp.js');
myapp.listen(3333, function () {
	console.log('Express server listening on');
});

function createWindow(){
	let win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.webContents.openDevTools();
	//win.loadFile("index.html")
	win.loadURL("http://localhost:3333")
}	

app.whenReady().then(  createWindow  )

app.on("window-all-closed", () =>{
	console.log("closed window")	
	app.quit()
})
