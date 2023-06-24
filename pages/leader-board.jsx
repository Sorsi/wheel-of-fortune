import { useSelector } from 'react-redux';

export default function LeaderBoard() {
	const users = useSelector((state) => state.users);
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
