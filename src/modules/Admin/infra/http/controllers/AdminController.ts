import { Request, Response } from "express";
import { container } from "tsyringe";

import ListUserService from "@modules/Admin/services/ListUserService";
import DeleteUserService from "@modules/Admin/services/DeleteUserService";

export default class AdminController {
    public async index(req: Request, res: Response): Promise<Response> {

        const list = container.resolve(ListUserService);

        const userList = await list.execute();

        return res.json(userList)
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.body;

        const userService = container.resolve(DeleteUserService);
        await userService.execute(user_id)
        
        return res.json({
            Delete: `Deleted: ${user_id}`
        })
    }
}

// Receber user_id e confimar que é um usuário válido antes de fazer a listagem