import { Request, Response } from "express";
import { container } from "tsyringe";

import ActivitiesCRUDService from "@modules/TimeSpend/services/ActivitiesCRUDService";

export default class ActivitiesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const { activitiesDate, workTime, sleepTime, studyTime, leisureTime, trainingTime } = req.body;

        const createActivitie = container.resolve(ActivitiesCRUDService);

        const activities = Object.assign({
            user_id, activitiesDate, workTime, sleepTime, studyTime, leisureTime, trainingTime
        });

        const saveActivitie = await createActivitie.execute(activities);

        return res.json(saveActivitie);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { activitiesDate, workTime, sleepTime, studyTime, leisureTime, trainingTime } = req.body;

        const createActivitie = container.resolve(ActivitiesCRUDService);

        const activity = Object.assign({
            id, activitiesDate, workTime, sleepTime, studyTime, leisureTime, trainingTime
        })

        const updateActivity = await createActivitie.update(activity);

        return res.json(updateActivity)

    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const activityId = req.params.id;

        const createActivitie = container.resolve(ActivitiesCRUDService);

        await createActivitie.delete(activityId);

        return res.json({Done: `activity ${activityId} was exclude`})
    }
}