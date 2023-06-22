import { users } from '@/users-mock';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json(users);

	const { method } = req;

	switch (method) {
		case 'GET':
			res.status(200).json(users);
			break;
		case 'POST':
			const { name, points } = req.body;
			users.push({
				id: users.length + 1,
				name,
				points,
			});
			res.status(200).json(users);
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
