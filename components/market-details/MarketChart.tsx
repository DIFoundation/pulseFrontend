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

	// Dynamic Logic for Chart Data
	const getChartData = () => {
		// Binary (Yes/No)
		if (market.marketType === "binary") {
			return {
				labels: months,
				datasets: [
					{
						label: "Yes",
						data: months.map(() => 30 + Math.random() * 40),
						borderColor: "#22C55E", // Green
						backgroundColor: "rgba(34, 197, 94, 0.05)",
						tension: 0.4,
						borderWidth: 2,
						pointRadius: 0,
					},
					{
						label: "No",
						data: months.map(() => 30 + Math.random() * 40),
						borderColor: "#EF4444", // Red
						backgroundColor: "rgba(239, 68, 68, 0.05)",
						tension: 0.4,
						borderWidth: 2,
						pointRadius: 0,
					},
				],
			}
		}

		// Multi Outcome (Team A, B, C, D...)
		if (market.marketType === "multi" && market.outcomes) {
			// Colors matching Design 2: Pink, Purple, Red, Green
			const outcomeColors = ["#EC4899", "#8B5CF6", "#EF4444", "#22C55E", "#F59E0B"]

			return {
				labels: months,
				datasets: market.outcomes.map((outcome, index) => {
					const color = outcomeColors[index % outcomeColors.length]
					return {
						label: outcome.option,
						data: months.map(() => 15 + Math.random() * 30),
						borderColor: color,
						backgroundColor: "transparent",
						tension: 0.4,
						borderWidth: 2,
						pointRadius: 0,
					}
				}),
			}
		}

		// Scalar (Long/Short) - usually one line or two diverging
		return {
			labels: months,
			datasets: [
				{
					label: "Price",
					data: months.map(() => 40 + Math.random() * 30),
					borderColor: "#22C55E",
					backgroundColor: "rgba(34, 197, 94, 0.05)",
					tension: 0.4,
					fill: true,
				},
			],
		}
	}

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				align: "end" as const, // Align legend to right
				labels: {
					color: "#9CA3AF",
					usePointStyle: true,
					boxWidth: 8,
					padding: 20,
					font: { size: 12 },
				},
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
		<div className="bg-[#111111] border border-white/5 rounded-2xl p-6 w-full h-full min-h-[400px]">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-medium text-gray-200">Price Movement</h2>
				{/* Legend is handled by ChartJS, but we could put custom HTML legend here if needed */}
			</div>
			<div className="h-[300px] w-full">
				<Line data={getChartData()} options={options} />
			</div>
		</div>
	)
}
