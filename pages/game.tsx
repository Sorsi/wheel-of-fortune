import Link from 'next/link';

export default function Game(user = { name: 'xy', points: 566666 }) {
	const handleRollClick = () => {
		switch (generateRandomNumber()) {
			case 1:
				doubleTheMoney(user.points);
				break;
			case 2:
				keepTheMoney(user.points);
				break;
			case 3:
				bankrupt();
				break;
		}
	};

	const generateRandomNumber = () => {
		return Math.floor(Math.random() * 2 + 1);
	};

	const doubleTheMoney = (money: number): number => {
		return 2 * money;
	};

	const keepTheMoney = (money: number): number => {
		return money;
	};

	const bankrupt = (): number => {
		return 0;
	};

	return (
		<>
			<Link href="/">BACK</Link>
			<h1>WHEEL OF FURTUNE</h1>
			<button onClick={() => handleRollClick()}>ROLL THE WHEEL</button>
		</>
	);
}
