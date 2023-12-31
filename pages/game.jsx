import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';

export default function Game() {
	const [result, setResult] = useState('');
	const selectedUser = useSelector((state) => state.selectedUser);
	const dispatch = useDispatch();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleRollClick = async () => {
		const randomNumber = generateRandomNumber();
		let newPoints;
		setIsLoading(true);

		switch (randomNumber) {
			case 1:
				newPoints = doubleTheMoney(selectedUser.points);
				setResult('Double');
				break;
			case 2:
				newPoints = keepTheMoney(selectedUser.points);
				setResult('Keep');
				break;
			case 3:
				newPoints = bankrupt();
				setResult('Bankrupt!');
				break;
		}

		const updatedUser = { ...selectedUser, points: newPoints };
		updateUserPoints(updatedUser);
		const updatedUsers = await fetchUsers(); // Fetch the updated user

		dispatch({
			type: 'SET_USERS',
			payload: updatedUsers, // Update the users in the store
		});
	};

	const updateUserPoints = async (updatedUser) => {
		// update in db
		try {
			await fetch(`api/users/update?id=${updatedUser.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ points: updatedUser.points }),
			});
			setIsLoading(false);
			// update in store
			dispatch({
				type: 'SELECT_USER',
				payload: updatedUser,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const fetchUsers = async () => {
		// fetch updated users from db and update the store
		try {
			const response = await fetch('api/users/get');
			const users = await response.json();
			return users;
		} catch (error) {
			console.error(error);
		}
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 3 + 1);
	};

	const doubleTheMoney = (money) => {
		return 2 * money;
	};

	const keepTheMoney = (money) => {
		return money;
	};

	const bankrupt = () => {
		return 0;
	};

	const handleHomeClick = () => {
		router.push('/');
	};

	const handleLeaderboardClick = () => {
		router.push('/leaderboard');
	};

	return (
		<>
			<Box sx={{ flexGrow: 1, marginBottom: '16px' }}>
				<AppBar component="nav" position="static">
					<Toolbar>
						<Box sx={{ display: { xs: 'block' } }}>
							<Button 
								onClick={handleHomeClick}
								sx={{ color: '#fff' }}>
								HOME
							</Button>
						</Box>
						<Box sx={{ display: { xs: 'block' } }}>
							<Button 
								onClick={handleLeaderboardClick}
								sx={{ color: '#fff' }}>
								LEADERBOARD
							</Button>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			<Container maxWidth="xs">
				<Typography variant="h2">WHEEL OF FURTUNE</Typography>
				<Typography variant="h4">Your name: {selectedUser.name}</Typography>
				<Typography variant="h4">Your points: {selectedUser.points}</Typography>
				<Button variant='contained' disabled={isLoading} onClick={handleRollClick}>ROLL THE WHEEL</Button>
				{result &&<Typography variant="h2">{result}</Typography>}
			</Container>
		</>
	);
}
