import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';

export default function Game() {
	const [result, setResult] = useState('');
	const selectedUser = useSelector((state) => state.selectedUser);
	const dispatch = useDispatch();
	let isBtnDisabled = false;
	const router = useRouter();

	const handleRollClick = async () => {
		const randomNumber = generateRandomNumber();
		let newPoints;

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
				setResult('Bankrupt');
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
		isBtnDisabled = true;
		// update in db
		try {
			await fetch(`api/users/update?id=${updatedUser.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ points: updatedUser.points }),
			});
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
			isBtnDisabled = true;
			const response = await fetch('api/users/get');
			const users = await response.json();
			isBtnDisabled = false;
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
			<Box sx={{ flexGrow: 1 }}>
				<AppBar component="nav" position="static">
					<Toolbar>
						<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
							<Button 
								onClick={handleHomeClick}
								sx={{ color: '#fff' }}>
								HOME
							</Button>
						</Box>
						<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
				<Button variant='contained' disabled={isBtnDisabled} onClick={handleRollClick}>ROLL THE WHEEL</Button>
				{result && <p>{result}</p>}
			</Container>
		</>
	);
}
