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
        zipdir: string, // only when type="zip"
        filename: string, // only when type="file"
    },
    ...
]
*/

console.log("Initializing");
fse.removeSync("dist");
fse.mkdirSync("dist");
fse.removeSync("temp");
fse.mkdirSync("temp");
let zip_id = 0;
cfg.forEach(async (e) => {
    if (e.type === "zip") {
        zip_id++;
        const temp_path = path.join("temp", zip_id.toString());
        console.log("Downloading zipped", e.url, e.zipdir, "->", e.dir);
        await dl(e.url, temp_path, { extract: true });
        if (e.zipdir) {
            fse.copySync(path.join(temp_path, e.zipdir), path.join("dist", e.dir));
        } else {
            fse.copySync(temp_path, path.join("dist", e.dir));
        }
        fse.removeSync(temp_path);
    } else if (e.type === "file") {
        console.log("Downloading single file", e.url, "->", e.dir, e.filename);
        if (e.filename) {
            await dl(e.url, path.join("dist", e.dir), { filename: e.filename });
        } else {
            await dl(e.url, path.join("dist", e.dir));
        }
    } else {
        console.error("Unknown type", e.type);
    }
});