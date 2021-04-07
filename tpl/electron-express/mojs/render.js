//front-end
const { remote, ipcRenderer } = require("electron")
let { add } = remote.require("./mojs/add");

var sqlite3 = remote.require("sqlite3").verbose()
var db = new sqlite3.Database("./test1.db")

console.log(add(1, 2));

document.getElementById("send").addEventListener("click", (ev) => {
	ipcRenderer.send("main", "ping")
})

//recieve data
ipcRenderer.on("submain", (ev, args) => {
	console.log(args)
})
