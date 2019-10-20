import {Request, Response, Router} from 'express';
import {fetch} from "./packages/registry";
import {Package} from "./packages/package";

const router = Router();

router.get('/api/packages/:name/:version?', async (request: Request, response: Response) => {
    const name = request.params.name;
    const version = request.params.version || null;

    if (!name) {
        response.status(400).json({
            'error': 'A package name cannot be empty.'
        });
    }

    fetch(name, version)
        .then((pck: Package) => {
            response.status(200).json({
                name: pck.name,
                description: pck.description,
                version: pck.version,
                dependencies: pck.dependencies
            });
        }).catch(error => response.status(400).json({error}));
});

export default router;
