//front-end
const { remote, ipcRenderer } = require("electron")
let { add } = remote.require("./mojs/add");
console.log(add(1, 2));

document.getElementById("send").addEventListener("click", (ev) => {
	ipcRenderer.send("main", "ping")
})

//recieve data
ipcRenderer.on("submain", (ev, args) => {
	console.log(args)
})
