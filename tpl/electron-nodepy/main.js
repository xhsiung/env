const { app, BrowserWindow } = require('electron')
const addon = require('nodepy');

//render process load your custom addon like ex:require('nodepy'), change false , default true
app.allowRendererProcessReuse= true

function createWindow() {
	// Create the browser window.
	let mainWin = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})
	mainWin.setMenuBarVisibility(false)
	mainWin.loadFile('index.html')
	mainWin.webContents.openDevTools()

	//use nodepy module
        var obj={"name":"alex","mobile":12345}
        console.log(  addon.doSync("main" ,JSON.stringify( obj)) );

        addon.doAsync("main2" ,JSON.stringify( obj), (err, val)=>{
        	console.log("async");
                console.log( val );
        });
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	console.log("quiit")
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
