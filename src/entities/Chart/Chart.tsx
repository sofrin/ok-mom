import { useTheme } from '@mui/material/styles';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Label,
	ResponsiveContainer,
} from 'recharts';
import { taskSchema } from 'shared/types';
import Typography from '@mui/material/Typography';

function createData(time: string, amount?: number) {
	return { time, amount };
}

type Props = {
	tasks: taskSchema[];
	child: string;
};

export default function Chart({ tasks, child }: Props) {
	// const data = [
	// 	createData('00:00', 0),
	// 	createData('03:00', 300),
	// 	createData('06:00', 600),
	// 	createData('09:00', 800),
	// 	createData('12:00', 1500),
	// 	createData('15:00', 2000),
	// 	createData('18:00', 2400),
	// 	createData('21:00', 2400),
	// 	createData('24:00', undefined),
	// ];
	const theme = useTheme();
	const data = tasks.map((task) => {
		return createData(
			task.completedAt?.toString().split('T')[0] || '',
			task.points,
		);
	});
	console.log(`data`, data);

	return (
		<>
			<Typography
				sx={{ textAlign: 'center' }}
				variant='h5'
			>
				{child}
			</Typography>
			<ResponsiveContainer
				width='100%'
				height={200}
			>
				<LineChart
					width={600}
					height={300}
					data={data}
					margin={{
						top: 16,
						right: 16,
						bottom: 0,
						left: 24,
					}}
				>
					<XAxis
						dataKey='time'
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					/>
					<YAxis
						stroke={theme.palette.text.secondary}
						style={theme.typography.body2}
					>
						<Label
							angle={270}
							position='left'
							style={{
								textAnchor: 'middle',
								fill: theme.palette.text.primary,
								...theme.typography.body1,
							}}
						>
							Баллы
						</Label>
					</YAxis>
					<Line
						isAnimationActive={true}
						type='monotone'
						dataKey='amount'
						stroke={theme.palette.primary.main}
						dot={true}
					/>
				</LineChart>
			</ResponsiveContainer>
		</>
	);
}
