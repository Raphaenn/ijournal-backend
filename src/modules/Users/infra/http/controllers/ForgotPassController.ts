import { Request, Response } from "express";
import { container } from "tsyringe";

import ForgotPassService from "@modules/Users/services/ForgotPassService";

export default class ForgotPassController {
    public async create(req: Request, res: Response): Promise<Response> {

        const { email } = req.body;

        const sendForgotPass = container.resolve(ForgotPassService);

        await sendForgotPass.execute({
            email
        });

        return res.status(204).json();
    }
};