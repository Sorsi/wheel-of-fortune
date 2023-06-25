import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Home() {
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	const router = useRouter();

	useEffect(() => {
		fetchUsers();
	}, []); // Fetch users when the component mounts

	const handleSubmit = async (e) => {
		e.preventDefault();
		const userInDb = users.find(user => user.name === username);
		if (userInDb) {
			dispatch({
				type: 'SELECT_USER',
				payload: { ...userInDb },
			});
		} else {
			try {
				const newUser = { name: username, points: 2000 };
				const response = await fetch('/api/users/create', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newUser),
				});
				const createdUser = await response.json();
				dispatch({
					type: 'ADD_USER',
					payload: createdUser,
				});
				dispatch({
					type: 'SELECT_USER',
					payload: { ...createdUser },
				});
			} catch (error) {
				console.error(error);
			}
		}

		setUsername('');
		router.push('/game');
	}

	const fetchUsers = async () => {
		try {
			const response = await fetch('/api/users/get');
			const users = await response.json();
			dispatch({
				type: 'SET_USERS',
				payload: users,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<Typography variant="h2">WHEEL OF FORTUNE</Typography>
				<Typography variant="h5">Are you brave enough to roll the wheel?</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: 'flex'
					}}>
					<TextField
						margin='normal'
						name="username"
						id="username"
						type="text"
						value={username}
						placeholder="Your username..."
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
						autoFocus
						sx={{
							paddingRight: '12px'
						}}
					/>
					<Button
						disabled={username ? false : true}
						variant='contained'
						type="submit"
						sx={{
							marginTop: '16px',
							marginBottom: '8px'
						}}
					>
						Play
					</Button>
				</Box>
			</Container>
		</>
	);
}
