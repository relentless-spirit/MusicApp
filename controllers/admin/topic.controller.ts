import { Request, Response } from "express";
import Topic from "../../models/topic.model";
export const index = async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find({
            deleted: false
        });
        res.render("admin/pages/topics/index.pug", {
            topics: topics
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCreatePage = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
    }
}