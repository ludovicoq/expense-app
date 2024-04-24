// Import statements
import express, { Router, Request, Response } from "express";

// Create the router
export const router: Router = express.Router();

// Define a route
router.get('*/test', (req: Request, res: Response) => {
    res.send('abcdefg');
});

// Export the router using ES6 export
export default router;
