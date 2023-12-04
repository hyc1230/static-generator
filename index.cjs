const fse = require("fs-extra");
const path = require("path");
const dl = require("download");

const cfg = JSON.parse(fse.readFileSync("./config.json"));
/*
cfg = [
    {
        type: "zip" / "file",
        url: string,
        dir: string,
    },
    ...
]
*/

fse.removeSync("dist");
fse.mkdirSync("dist");
cfg.forEach(async (e) => {
    if (e.type === "zip") {
        console.log("Downloading zipped", e.url, "->", e.dir);
        dl(e.url, path.join("dist", e.dir), { extract: true });
    } else if (e.type === "file") {
        console.log("Downloading single file", e.url, "->", e.dir);
        dl(e.url, path.join("dist", e.dir));
    } else {
        console.error("Unknown type", e.type);
    }
});