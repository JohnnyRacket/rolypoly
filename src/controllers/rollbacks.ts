import { Request, Response, Router } from "express";
import { param, validationResult } from "express-validator";
import { v4 as uuid } from 'uuid';
import { client, getAsync, setAsync, delAsync } from "../data/redis-client";


const router = Router();

/**
 * GET /rollbacks/:id
 * Gets a rollback value by guid.
 */
router.get(
    "/:id",
    [
        param("id")
            .exists()
            .isUUID()
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(errors);
            return;
        }

        const id: string = req.params.id;

        // get from redis cache
        try {
            let data = await getAsync(id)
            data ? res.status(200).json(JSON.parse(data)) : res.status(404).send();

        } catch (err) {
            res.status(500).send(err);
        }
    }
);

/**
 * POST /rollbacks/
 * Adds a rollback body and returns back a uuid.
 */
router.post("/", async (req: Request, res: Response) => {
    const data: any = req.body;
    let rollback_id: string = uuid();

    //put in redis cache
    try {
        await setAsync(rollback_id, JSON.stringify(data));
        res.status(201).send(rollback_id);
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 * DELETE /rollbacks/:id
 * Removes a rollback entry by id.
 */
router.delete("/:id",
    [
        param("id")
            .exists()
            .isUUID()
    ], async (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(errors);
            return;
        }

        const id: string = req.params.id;

        //delete rollback kv pair from redis
        try {
            await delAsync(id);
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err);
        }

    });

export default router;