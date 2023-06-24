import prisma from '../app/lib/prisma';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

export const getStaticProps = async () => {
	const users = await prisma.User.findMany({});
	return {
		props: { users }
	}
}

export default function Home({ users }) {
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const selectedUser = useSelector((state) => state.selectedUser);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userInDb = users.find(user => user.name === username);
		if (userInDb) {
			console.log('if: input value is already in db -> ', userInDb);
			dispatch({
				type: 'SELECT_USER',
				payload: { ...userInDb },
			});
		} else {
			try {
				const newUser = { name: username, points: 2000 };
				dispatch({
					type: 'ADD_USER',
					payload: newUser,
				});
				await fetch('api/users/create', {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newUser),
				});
			} catch (error) {
				console.error(error);
			}
		}

		setUsername('');
    	router.push('/game');
	}

	return (
		<>
			<h1>WHEEL OF FURTUNE</h1>
			<h3>Are you brave enough to roll the wheel?</h3>
			<div className="w-full max-w-xs">
				<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							name="username"
							id="username"
							type="text"
							value={username}
							placeholder="Username"
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Play
					</button>
					<h1>{username}</h1>
				</form>
			</div>
			<ul>
				{users.length > 0 ? (
					users.map((user, index) => (
						<li key={index}>{user.name}</li>
					))
				) : (<p>no user in db</p>)}
			</ul>
			<h5>SELECTED USER IS - {selectedUser.name}</h5>
		</>
	);
}
