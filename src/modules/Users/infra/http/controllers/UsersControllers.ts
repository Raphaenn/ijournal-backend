import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateUserService from "@modules/Users/services/CreateUserService";


export default class UserController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const {name, email, password} = req.body;

            const createUser = container.resolve(CreateUserService)

            const user = await createUser.execute({
                name,
                email,
                password
            })

            return res.json(user);

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
};