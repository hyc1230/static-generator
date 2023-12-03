const fse = require("fs-extra");
const path = require("path");
const dl = require("download");

const cfg = JSON.parse(fse.readFileSync("./config.json"));
/*
cfg = [
    {
        url: string,
        dir: string,
    },
    ...
]
*/

fse.removeSync("dist");
fse.mkdirSync("dist");
cfg.forEach(async (e) => {
    console.log("Downloading", e.dir, e.url);
    dl(e.url, path.join("dist", e.dir), { extract: true });
});