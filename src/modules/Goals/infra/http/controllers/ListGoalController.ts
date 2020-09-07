import { Request, Response } from "express";
import { container } from "tsyringe";

import FindGoalService from "@modules/Goals/services/FindGoalService";

export default class GoalController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { year } = req.body;

        const goalService = container.resolve(FindGoalService);

        const getGoal = await goalService.execute({user_id, year})

        return res.json(getGoal)
    }
}