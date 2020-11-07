const { app, BrowserWindow } = require('electron')

function createWindow() {
	// Create the browser window.
	let mainWin = new BrowserWindow({
		width: 800,
		height: 600,
		//frame: false,
		//transparent: true,
		webPreferences: {
			nodeIntegration: true
		}
	})
	mainWin.setMenuBarVisibility(false)
	mainWin.loadFile('index.html')
	mainWin.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	console.log("quiit")
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
