import { Request, Response } from "express";
import { container } from "tsyringe";

import UpdateProfileService from "@modules/Users/services/UpdateProfileService";

export default class ProfileController {

    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const {name, email, oldpassword, password} = req.body;

        const updateProfile = container.resolve(UpdateProfileService);

        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            oldpassword,
            password
        })

        return res.json(user)

    }
}