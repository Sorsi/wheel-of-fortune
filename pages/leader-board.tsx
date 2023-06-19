const users = [
	{
		name: 'user1',
		points: 200000,
	},
	{
		name: 'user2',
		points: 40,
	},
	{
		name: 'user3',
		points: 3000,
	},
	{
		name: 'user4',
		points: 15600,
	},
];

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
