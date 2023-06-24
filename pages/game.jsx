import { Button } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Game() {
	const [result, setResult] = useState('');
	const selectedUser = useSelector((state) => state.selectedUser);
	const dispatch = useDispatch();
	let isBtnDisabled = false;

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

	return (
		<>
			<Link href="/">HOME</Link>
			<Link href="/leader-board">LEADERBOARD</Link>
			<h1>WHEEL OF FURTUNE</h1>
			<h2>Your name: {selectedUser.name}</h2>
			<h2>Your points: {selectedUser.points}</h2>
			<Button variant='contained' disabled={isBtnDisabled} onClick={handleRollClick}>ROLL THE WHEEL</Button>
			{result && <p>{result}</p>}
		</>
	);
}
