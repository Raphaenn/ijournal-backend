import { Request, Response } from "express";
import { container } from "tsyringe";

import FindDiaryService from "@modules/Journals/services/FindDiaryService";

export default class ListDiaryController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { diaryData } = req.body;

        const findDiary = container.resolve(FindDiaryService)

        const list = await findDiary.execute({user_id, diaryData})

        return res.status(200).json(list)
    };

} 