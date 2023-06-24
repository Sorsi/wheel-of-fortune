import prisma from "../../../app/lib/prisma";

export default async function handle(req, res) {
    const { id } = req.query;
    const { points } = req.body;
    try {
        const result = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                points,
            },
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user' });
    }
}