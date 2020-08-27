import { Request, Response } from "express";
import { container } from "tsyringe"

export default class DiaryController {
    public async index(req: Request, res: Response): Promise<Response> {
        return res.json({ diary: "ok" })
    }
}