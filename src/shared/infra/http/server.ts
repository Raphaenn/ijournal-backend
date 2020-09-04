import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import 'express-async-errors';
import { errors } from "celebrate";

import UploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import routes from "./routes";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.disable('x-powered-by');
app.use(cors({}));
app.use(express.json());

// permite jogar o localhost/8080/files/iamgename.png e ver a imagem no navegador
app.use("/file", express.static(UploadConfig.uploadFolder))
app.use(routes);

app.use(errors());

// Erros 
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    
    // verifica se err é uma instancia da class AppError
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    return response.status(500).json({
        status: 'error',
        messagem: 'Internal Error'
    })
})

app.listen(8080, () => {
    console.log('******************************');
    console.log(`🛡️  Server listening on port: 8080 🛡️ `);
    console.log('******************************');
});