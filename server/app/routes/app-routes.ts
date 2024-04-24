import express, { Router, Request, Response } from "express";

// appRoutes.js
const router: Router = express.Router();

router.get('*/test', (req: Request, res: Response) => {
    res.send('abcdefg');
});

module.exports = router;