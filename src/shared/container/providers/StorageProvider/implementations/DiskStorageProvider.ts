// Métodos de salvar de deletar arquivo. O multer salva o arquivo de forma automática na pasta tmp, porém queremos efetivarmos o upload, então o arquivo deve ir para a pasta upload. 

import fs from "fs";
import path from "path";
import uploadConfig from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";

class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {

        // mover arquivo da pasta tmp para a pasta upload, para confirmarmos o upload
        await fs.promises.rename(
            path.resolve(uploadConfig.tmpFolder, file),
            path.resolve(uploadConfig.uploadFolder, file))

        return file;
    };

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadFolder, file);

        try {
            // fs.stat pega o status de um arquivo, caso ele exista.
            await fs.promises.stat(filePath);
        } catch {
            return;
        }
        // deletar aquivo
        await fs.promises.unlink(filePath);

    }
}

export default DiskStorageProvider;