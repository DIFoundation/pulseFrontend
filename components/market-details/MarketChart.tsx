import { MarketChartProps } from "@/types/types"
import { Line } from "react-chartjs-2"
import { useState } from "react"
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
	const [chartData] = useState(() => {
		const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

		// Binary Market: Yes/No
		if (market.marketType === "binary") {
			const yesData = months.map(() => 30 + Math.random() * 40)
			const noData = months.map(() => 30 + Math.random() * 40)

			return {
				labels: months,
				datasets: [
					{
						label: "Yes",
						data: yesData,
						borderColor: "rgb(34, 197, 94)",
						backgroundColor: "rgba(34, 197, 94, 0.1)",
						tension: 0.4,
						fill: true,
					},
					{
						label: "No",
						data: noData,
						borderColor: "rgb(239, 68, 68)",
						backgroundColor: "rgba(239, 68, 68, 0.1)",
						tension: 0.4,
						fill: true,
					},
				],
			}
		}

		// Multi-Outcome Market: Multiple options
		if (market.marketType === "multi" && market.outcomes) {
			const colors = [
				{ border: "rgb(34, 197, 94)", bg: "rgba(34, 197, 94, 0.1)" },
				{ border: "rgb(239, 68, 68)", bg: "rgba(239, 68, 68, 0.1)" },
				{ border: "rgb(59, 130, 246)", bg: "rgba(59, 130, 246, 0.1)" },
				{ border: "rgb(245, 158, 11)", bg: "rgba(245, 158, 11, 0.1)" },
				{ border: "rgb(139, 92, 246)", bg: "rgba(139, 92, 246, 0.1)" },
				{ border: "rgb(236, 72, 153)", bg: "rgba(236, 72, 153, 0.1)" },
			]

			return {
				labels: months,
				datasets: market.outcomes.map((outcome, index) => {
					const color = colors[index % colors.length]
					return {
						label: outcome.option,
						data: months.map(() => 15 + Math.random() * 30),
						borderColor: color.border,
						backgroundColor: color.bg,
						tension: 0.4,
						fill: true,
					}
				}),
			}
		}

		// Scalar Market: Single value line
		if (market.marketType === "scalar") {
			const priceData = months.map(() => 40 + Math.random() * 30)

			return {
				labels: months,
				datasets: [
					{
						label: "Price",
						data: priceData,
						borderColor: "rgb(59, 130, 246)",
						backgroundColor: "rgba(59, 130, 246, 0.1)",
						tension: 0.4,
						fill: true,
					},
				],
			}
		}

		// Fallback to binary
		return {
			labels: months,
			datasets: [
				{
					label: "Yes",
					data: months.map(() => 30 + Math.random() * 40),
					borderColor: "rgb(34, 197, 94)",
					backgroundColor: "rgba(34, 197, 94, 0.1)",
					tension: 0.4,
					fill: true,
				},
				{
					label: "No",
					data: months.map(() => 30 + Math.random() * 40),
					borderColor: "rgb(239, 68, 68)",
					backgroundColor: "rgba(239, 68, 68, 0.1)",
					tension: 0.4,
					fill: true,
				},
			],
		}
	})

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "#9CA3AF",
					usePointStyle: true,
					padding: 15,
				},
			},
			tooltip: {
				mode: "index" as const,
				intersect: false,
				backgroundColor: "#1F2937",
				titleColor: "#F3F4F6",
				bodyColor: "#D1D5DB",
				borderColor: "#374151",
				borderWidth: 1,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				max: market.marketType === "scalar" ? undefined : 100,
				ticks: {
					color: "#6B7280",
					callback: function (value: number | string) {
						if (market.marketType === "scalar") {
							return value
						}
						return value + "%"
					},
				},
				grid: {
					color: "#374151",
				},
			},
			x: {
				ticks: {
					color: "#6B7280",
				},
				grid: {
					display: false,
				},
			},
		},
		interaction: {
			mode: "nearest" as const,
			axis: "x" as const,
			intersect: false,
		},
	}

	const getChartTitle = () => {
		switch (market.marketType) {
			case "binary":
				return "Price Movement"
			case "multi":
				return "Outcome Probabilities"
			case "scalar":
				return "Price History"
			default:
				return "Price Movement"
		}
	}

	return (
		<div className="bg-secondary-dark border border-secondary-light rounded-xl p-6">
			<h2 className="text-xl font-bold text-white mb-4">{getChartTitle()}</h2>
			<div className="h-[300px] md:h-[400px]">
				<Line data={chartData} options={options} />
			</div>
		</div>
	)
}
