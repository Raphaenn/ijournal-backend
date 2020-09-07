import { Request, Response } from "express";
import { container } from "tsyringe";

import CategoriesGoalsService from "@modules/Goals/services/CategoriesGoalsService";

export default class GoalController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { group, year } = req.body;

        const goalService = container.resolve(CategoriesGoalsService);
        
        const goalsList = await goalService.execute({ user_id, group, year });

        return res.json(goalsList)
        
    }
}