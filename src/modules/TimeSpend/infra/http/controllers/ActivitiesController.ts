import { Request, Response } from "express";
import { container } from "tsyringe";

// import DiaryCRUDService from "@modules/Journals/services/DiaryCRUDService";

export default class ActivitiesController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const {gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData} = req.body;

        // const createDiary = container.resolve(DiaryCRUDService);

        const diary = Object.assign({
            user_id, gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData
        });

        // const saveDiary = await createDiary.execute(diary);

        return res.json(gratitude1);
    }
}