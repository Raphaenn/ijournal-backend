import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUserService from "@modules/Admin/services/ListUserService";

export default class AdminController {
    public async index(req: Request, res: Response): Promise<Response> {

        const list = container.resolve(ListUserService);

        const userList = await list.execute();

        return res.json(userList)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.body;

        const userService = container.resolve(ListUserService);

        // const user = await userService.execute({

        // });
        

        return res.json({
            Delete: `Deleted: ${user_id}`
        })
    }
}

// Receber user_id e confimar que é um usuário válido antes de fazer a listagem