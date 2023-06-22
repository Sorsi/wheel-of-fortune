import { users } from '@/users-mock';

export default function LeaderBoard() {
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
