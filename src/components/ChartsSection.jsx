import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	BarChart,
	ResponsiveContainer,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
  } from "recharts";
  
  const COLORS = [
	"#0088FE",
	"#00C49F",
	"#FFBB28",
	"#FF8042",
	"#A28EFF",
	"#FF6C8F",
  ];
  
  const ChartsSection = ({ chartData }) => {
	if (!chartData || chartData.length === 0) {
	  return <div>No data available</div>;
	}
  
	// Calculate total of all expenses
	const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
  
	return (
	  <div
		style={{
		  marginTop: "2rem",
		  display: "flex",
		  flexWrap: "wrap",
		  justifyContent: "space-around",
		  gap: "2rem",
		}}
	  >
		{/* Pie Chart */}
		<div style={{ width: "100%", maxWidth: "500px" }}>
		  <h2 className="h3" style={{ textAlign: "center" }}>
			Spending Breakdown (Pie Chart)
		  </h2>
		  <ResponsiveContainer width="100%" height={400}>
			<PieChart>
			  <Pie
				data={chartData}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={100}
				fill="#8884d8"
				label={({ name, value }) => `${name}: GH₵${value}`}
			  >
				{chartData.map((entry, index) => (
				  <Cell
					key={`cell-${index}`}
					fill={COLORS[index % COLORS.length]}
				  />
				))}
			  </Pie>
			  <Tooltip
				formatter={(value, name, props) => [
				  `GH₵${value}`,
				  `Name: ${props.payload.name}`,
				  `Percentage: GH₵${((props.payload.value / total) * 100).toFixed(
					1
				  )}%`,
				]}
			  />
			  <Legend
				formatter={(value, entry, index) =>
				  `${value}: GH₵${entry.payload.value}`
				}
			  />
			</PieChart>
		  </ResponsiveContainer>
		</div>
  
		{/* Bar Chart */}
		<div style={{ width: "100%", maxWidth: "500px" }}>
		  <h2 className="h3" style={{ textAlign: "center" }}>
			Spending Breakdown (Bar Chart)
		  </h2>
		  <ResponsiveContainer width="100%" height={400}>
			<BarChart
			  data={chartData}
			  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
			>
			  <CartesianGrid strokeDasharray="3 3" />
			  <XAxis
				dataKey="name"
				angle={-45}
				textAnchor="end"
				height={70}
				tickFormatter={(value) => value} // Show full name
			  />
			  <YAxis />
			  <Tooltip
				formatter={(value, name, props) => [
				  `GH₵${value}`,
				  `Name: ${props.payload.name}`,
				  `Percentage: ${((props.payload.value / total) * 100).toFixed(
					1
				  )}%`,
				]}
			  />
			  <Legend
				formatter={(value, entry, index) =>
				  `${value}: $${entry.payload.value}`
				}
			  />
			  <Bar dataKey="value" name="Amount">
				{chartData.map((entry, index) => (
				  <Cell
					key={`cell-${index}`}
					fill={COLORS[index % COLORS.length]}
				  />
				))}
			  </Bar>
			</BarChart>
		  </ResponsiveContainer>
		</div>
	  </div>
	);
  };
  
  export default ChartsSection;
  