import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
	  backgroundColor: theme.palette.common.black,
	  color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
	  fontSize: 14,
	},
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
	  backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
	  border: 0,
	},
  }));

export default function LeaderBoard() {
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();
	const router = useRouter();
	users.sort((a, b) => b.points - a.points); // sort users by their points

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

	const handleHomeClick = () => {
		router.push('/');
	};

	const handleGameClick = () => {
		router.push('/game');
	};

	return (
		<>
			<Box sx={{ flexGrow: 1, marginBottom: '16px'}}>
				<AppBar component="nav" position="static">
					<Toolbar>
						<Box sx={{ display: { xs: 'block' } }}>
							<Button 
								onClick={handleHomeClick}
								sx={{ color: '#fff' }}>
								HOME
							</Button>
						</Box>
						<Box sx={{ display: { xs:'block' } }}>
							<Button 
								onClick={handleGameClick}
								sx={{ color: '#fff' }}>
								GAME
							</Button>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<StyledTableRow >
							<StyledTableCell>Username</StyledTableCell>
							<StyledTableCell>Points</StyledTableCell>
						</StyledTableRow >
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<StyledTableRow 
								key={user.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
								<StyledTableCell align="left">{user.points}</StyledTableCell>
							</StyledTableRow >
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
