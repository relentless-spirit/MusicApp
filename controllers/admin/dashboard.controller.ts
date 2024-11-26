import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard page"
    })
}