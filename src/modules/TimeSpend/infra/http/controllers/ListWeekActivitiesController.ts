import { Request, Response } from "express";
import { container } from "tsyringe";

import ListWeekActivitiesservice from "@modules/TimeSpend/services/ListWeekActivitiesservice";

export default class ListWeekActivitiesController {

    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const { day, month, year } = req.body;

        const listWeekActivitie = container.resolve(ListWeekActivitiesservice);

        const listActivities = await listWeekActivitie.execute({user_id, day, month, year});

        return res.json(listActivities);
    }
}