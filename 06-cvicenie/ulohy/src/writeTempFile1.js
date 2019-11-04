module.exports = writeTempFile;

const fs = require("fs");
const os = require("os");
const path = require("path");


function writeTempFile(fileName, ...args) {
  // just hints:
  const cb = args.pop();
  console.log(cb);
  // const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
  // fs.mkdtemp(tempDir, (err, folder) => {  
  // fs.writeFile(tempFile, ...args, (err) => {
   const tempDir = path.join(os.tmpdir(), `${process.pid}-`);
   fs.mkdtemp(tempDir, (err, tempDir) => { 
   if (err) return cb (err);
   const tempFile = path.resolve(tempDir,fileName);
   try{
   		fs.writeFile(tempFile, ...args, (err) => {
   			if (err) return cb (err);
   			cb(null,tempFile);
   		})
   }catch (err){
   	cb(err);
   }
   });
}