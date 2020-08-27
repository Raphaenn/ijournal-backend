import { Request, Response } from "express";
import { container } from "tsyringe";

import PostService from "@modules/Journals/services/PostService";

export default class DiaryController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const {gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData} = req.body;

        const createDiary = container.resolve(PostService);

        const diary = Object.assign({
            user_id, gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData
        });

        const saveDiary = await createDiary.execute(diary);

        return res.json(saveDiary);
    }
}