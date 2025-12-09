import { MarketChartProps } from "@/types/types"
import { Line } from "react-chartjs-2"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default function MarketChart({ market }: MarketChartProps) {
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

	const getChartConfig = () => {
		if (market.marketType === "binary") {
			return [
				{ label: "Yes", color: "#22C55E" },
				{ label: "No", color: "#EF4444" },
			]
		}
		if (market.marketType === "multi" && market.outcomes) {
			const outcomeColors = ["#EC4899", "#8B5CF6", "#EF4444", "#22C55E", "#F59E0B"]
			return market.outcomes.map((outcome, index) => ({
				label: outcome.option,
				color: outcomeColors[index % outcomeColors.length],
			}))
		}
		return [{ label: "Price", color: "#22C55E" }]
	}

	const chartConfig = getChartConfig()

	const getChartData = () => {
		return {
			labels: months,
			datasets: chartConfig.map((item) => ({
				label: item.label,
				data: months.map(() => (market.marketType === "scalar" ? 40 : 15) + Math.random() * 30),
				borderColor: item.color,
				backgroundColor:
					item.color.replace(")", ", 0.05)").replace("rgb", "rgba").replace("#", "") +
					(item.color.startsWith("#") ? "10" : ""),
				tension: 0.4,
				borderWidth: 2,
				pointRadius: 0,
				fill: market.marketType !== "multi",
			})),
		}
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "#18181B",
				titleColor: "#FFFFFF",
				bodyColor: "#D1D5DB",
				borderColor: "#27272A",
				borderWidth: 1,
				padding: 10,
			},
		},
		scales: {
			y: {
				border: { display: false },
				grid: {
					color: "rgba(255, 255, 255, 0.1)",
					drawBorder: false,
				},
				ticks: { color: "#6B7280", font: { size: 10 } },
			},
			x: {
				border: { display: false },
				grid: { display: false },
				ticks: { color: "#6B7280", font: { size: 10 } },
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	}

	return (
		<div className="bg-secondary-dark border border-secondary-light rounded-2xl p-6 w-full h-full min-h-[400px]">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-medium text-gray-200">Price Movement</h2>

				<div className="flex items-center gap-4">
					{chartConfig.map((item, index) => (
						<div key={index} className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
							<span className="text-xs font-medium text-gray-400">{item.label}</span>
						</div>
					))}
				</div>
			</div>

			<div className="h-[300px] w-full">
				<Line data={getChartData()} options={options} />
			</div>
		</div>
	)
}
