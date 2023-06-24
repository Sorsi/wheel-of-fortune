import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Game() {
	const [result, setResult] = useState('');
	const selectedUser = useSelector((state) => state.selectedUser);
	const dispatch = useDispatch();

	const handleRollClick = () => {
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
		dispatch({
			type: 'SELECT_USER',
			payload: updatedUser,
		});
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
			<Link href="/">BACK</Link>
			<h1>WHEEL OF FURTUNE</h1>
			<h2>Your name: {selectedUser.name}</h2>
			<h2>Your points: {selectedUser.points}</h2>
			<button onClick={handleRollClick}>ROLL THE WHEEL</button>
			{result && <p>{result}</p>}
		</>
	);
}
