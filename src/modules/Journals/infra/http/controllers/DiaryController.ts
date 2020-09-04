import { Request, Response } from "express";
import { container } from "tsyringe";

import DiaryCRUDService from "@modules/Journals/services/DiaryCRUDService";

export default class DiaryController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id
        const {gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData} = req.body;

        const createDiary = container.resolve(DiaryCRUDService);

        const diary = Object.assign({
            user_id, gratitude1, gratitude2, gratitude3, activity1, activity2, activity3, diaryData
        });

        const saveDiary = await createDiary.execute(diary);

        return res.json(saveDiary);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id
        const {gratitude1, gratitude2, gratitude3, activity1, activity2, activity3} = req.body;

        const updateDiary = container.resolve(DiaryCRUDService);

        const diary = Object.assign({
            id, gratitude1, gratitude2, gratitude3, activity1, activity2, activity3
        });

        const saveDiary = await updateDiary.update(diary);

        return res.json(saveDiary);
    }

    public async remove(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;

        const deleteDiary = container.resolve(DiaryCRUDService);

        await deleteDiary.delete(id)

        return res.json({Done: `Diary ${id} was exclude`})
    }
}