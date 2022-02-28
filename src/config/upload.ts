import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      // const fileUuid = uuidV4();
      const fileName = `${fileHash}${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

// export default {
//   upload(folder: string) {
//     return {
//       storage: multer.diskStorage({
//         destination: resolve(__dirname, "..", "..", folder),
//         filename: (request, file, callback) => {
//           const fileHash = crypto.randomBytes(64).toString("base64url");
//           const fileUuid = uuidV4();
//           const fileName = `${fileHash}${fileUuid}${file.originalname}`;

//           return callback(null, fileName);
//         },
//       }),
//     };
//   },
// };
