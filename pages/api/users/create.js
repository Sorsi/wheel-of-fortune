import prisma from "../../../app/lib/prisma";

export default async function handle(req, res) {
	const { name, points } = req.body;
	try {
		const result = await prisma.user.create({
			data: {
				name,
				points,
			},
		});
		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create user' });
	}
}
