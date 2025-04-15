// pages/ChartsPage.jsx
import { useLoaderData } from "react-router-dom";
import ChartsSection from "../components/ChartsSection";
import { fetchData } from "../helpers";

export function chartsLoader() {
  const expenses = fetchData("expenses");

  const pieData = (expenses || []).reduce((acc, expense) => {
    const name = expense.name;
    const amount = parseFloat(expense.amount);
    if (!acc[name]) acc[name] = 0;
    acc[name] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(pieData).map(([name, value]) => ({
    name,
    value,
  }));

  return { chartData };
}

const ChartsPage = () => {
  const { chartData } = useLoaderData();

  return (
    <div>
      <h1>Charts Page</h1>
      {chartData.length > 0 ? (
        <ChartsSection chartData={chartData} />
      ) : (
        <p>No chart data available.</p>
      )}
    </div>
  );
};

export default ChartsPage;
