import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUserService from "@modules/Admin/services/ListUserService";

export default class AdminController {
    public async index(req: Request, res: Response): Promise<Response> {

        const list = container.resolve(ListUserService);

        const userList = await list.execute();

        return res.json(userList)

    }
}

// Receber user_id e confimar que é um usuário válido antes de fazer a listagem