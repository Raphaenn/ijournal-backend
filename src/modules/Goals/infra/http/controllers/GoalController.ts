import { Request, Response } from "express";
import { container } from "tsyringe";

import GoalsCRUDService from "@modules/Goals/services/GoalsCRUDService";

export default class GoalController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { description, status, group, startDate, deadDate } = req.body;

        const goalService = container.resolve(GoalsCRUDService);

        const goal = Object.assign({
            user_id, description, status, group, startDate, deadDate
        })

        const saveGoal = await goalService.execute(goal)

        return res.json(saveGoal)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { description, status, group, startDate, deadDate } = req.body;

        const goalService = container.resolve(GoalsCRUDService);

        const goal = Object.assign({
            id, description, status, group, startDate, deadDate
        })

        const updateGoal = await goalService.update(goal);

        return res.json(updateGoal)
    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const goalService = container.resolve(GoalsCRUDService);

        await goalService.delete(id);

        return res.json({Done: `Goal ${id} was exclude`})
    }
}