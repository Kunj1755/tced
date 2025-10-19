import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { X, MapPin } from 'lucide-react';

export default function SearchResultsTable({ results, onClose, onLocate }) {
	if (!results || results.length === 0) return null;

	return (
		<Paper
			sx={{
				position: 'absolute',
				bottom: 20,
				left: '50%',
				transform: 'translateX(-50%)',
				width: '90%',
				maxWidth: 800,
				zIndex: 30,
				boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				borderRadius: '8px',
				maxHeight: 300,
				overflow: 'hidden',
			}}
		>
			<div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-gray-200">
				<h3 className="text-slate-900">Search Results ({results.length})</h3>
				<IconButton onClick={onClose} size="small">
					<X className="h-4 w-4" />
				</IconButton>
			</div>
      
			<TableContainer sx={{ maxHeight: 240 }}>
				<Table stickyHeader size="small">
					<TableHead>
						<TableRow>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }}>ID</TableCell>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }}>Name</TableCell>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }}>Attribute</TableCell>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }}>Value</TableCell>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }}>Location</TableCell>
							<TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 500 }} align="center">Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((row) => (
							<TableRow
								key={row.id}
								sx={{ 
									'&:last-child td, &:last-child th': { border: 0 },
									'&:hover': { bgcolor: '#f8fafc' },
								}}
							>
								<TableCell sx={{ fontSize: '0.875rem' }}>{row.id}</TableCell>
								<TableCell sx={{ fontSize: '0.875rem' }}>{row.name}</TableCell>
								<TableCell sx={{ fontSize: '0.875rem' }}>{row.attribute}</TableCell>
								<TableCell sx={{ fontSize: '0.875rem' }}>{row.value}</TableCell>
								<TableCell sx={{ fontSize: '0.875rem' }}>{row.location}</TableCell>
								<TableCell align="center">
									<IconButton
										onClick={() => onLocate && onLocate(row)}
										size="small"
										sx={{
											color: '#38a169',
											'&:hover': { bgcolor: 'rgba(56, 161, 105, 0.1)' },
										}}
										aria-label="Locate on map"
									>
										<MapPin className="h-4 w-4" />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
