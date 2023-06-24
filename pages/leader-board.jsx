import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function LeaderBoard() {
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch('api/users/get');
				const fetchedUsers = await response.json();
				dispatch({
					type: 'SET_USERS',
					payload: fetchedUsers,
				});
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, [dispatch])
	return (
		<>
			<h1>LEADER BOARD</h1>
			<table>
				<tbody>
					{users.map((user, i) => {
						return (
							<tr key={i}>
								<td>{user.name}</td>
								<td>{user.points}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
