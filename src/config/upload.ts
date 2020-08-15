import path from "path";
import multer, { StorageEngine } from "multer";
import crypto from "crypto";

// Pego o caminho até a pasta onde as fotos serão salvas foldername/tmp
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig { 
    driver: 's3' | 'disk';
    tmpFolder: string;
    uploadFolder: string;

    multer: {
        storage: StorageEngine
    };

    config: {
        disk: {},
        aws: {
            bucket: string
        }
    }
}

export default {
    driver: 'disk',

    tmpFolder: tmpFolder,
    uploadFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;
                return callback(null, fileName)
            }
        })
    },

    config: {
        disk: {},
        aws: {
            bucket: 'gobarber-type'
        }
    }
} as IUploadConfig