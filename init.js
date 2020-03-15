console.log("Carico gli script");
// Spostato il loading per evitare di mandare in crisi il parser HTML di VSCode
var date = new Date().getTime();
let x = `<script src="./main.js?v=${date}"></script>`
let y = `<script src="./omnisinterface.js?v=${date}"></script>`
document.write(x)
document.write(y)