const fs = require("fs").promises;
const path = require("path")

module.exports = lsRescursive



async function ls(dirName) {
  return fs.readdir(dirName, {
    withFileTypes: true
  });
}

function dirsOnly(files) {
  return files.filter((f) => f.isDirectory());
}

function filesOnly(files) {
  return files.filter((f) => f.isFile());
}




async function lsRescursive(dirName) {

  let a = await ls(dirName);
  a = dirsOnly(a);

  a = a.map(({ name }) => name);
  a = a.map(name => path.resolve(dirName, name));
  a = a.map(ls);

  a = await Promise.all(a);
  a = a.flat();

  a = filesOnly(a);
  return a.map(({ name }) => name);

}