import { Request, Response } from "express";
import { container } from "tsyringe";

import ListMonthActivitiesService from "@modules/TimeSpend/services/ListMonthActivitiesService";

export default class ListMonthActivitiesController {

    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const { month, year } = req.body;

        const listMonthActivitie = container.resolve(ListMonthActivitiesService);

        const listActivities = await listMonthActivitie.execute({user_id, month, year});

        return res.json(listActivities);
    }
}