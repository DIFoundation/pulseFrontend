import { MarketTypeCardProps } from "@/types/types"
import React from "react"
import { CheckCircle } from "lucide-react"

export const MarketTypeCard: React.FC<MarketTypeCardProps> = ({
	icon,
	title,
	description,
	isSelected = false,
	onClick,
}) => {
	return (
		<div
			className={`
				relative p-6 rounded-xl cursor-pointer transition-all duration-300
				border-2 group
				${
					isSelected
						? "bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500"
						: "bg-zinc-900/80 border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900"
				}
			`}
			onClick={onClick}>
			{/* Selected Badge */}
			{isSelected && (
				<div className="absolute top-4 right-4 flex items-center gap-1.5 text-orange-500 text-sm font-medium">
					<CheckCircle className="w-4 h-4" />
					<span className="text-xs">Selected</span>
				</div>
			)}

			{/* Icon */}
			<div
				className={`
				mb-4 transition-colors duration-300
				${isSelected ? "text-orange-500" : "text-gray-400 group-hover:text-orange-400"}
			`}>
				{React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
					className: "w-8 h-8",
				})}
			</div>

			{/* Title */}
			<h4
				className={`
				text-lg font-semibold mb-2 transition-colors duration-300
				${isSelected ? "text-white" : "text-gray-200 group-hover:text-white"}
			`}>
				{title}
			</h4>

			{/* Example Section */}
			<div className="mb-3">
				<p className="text-xs font-medium text-gray-500 uppercase mb-1">Example:</p>
				<p className="text-sm text-gray-400 leading-relaxed">{description}</p>
			</div>

			{/* Outcome Pills */}
			<div className="mb-3">
				<p className="text-xs font-medium text-gray-500 uppercase mb-2">Outcome</p>
				<div className="flex flex-wrap gap-2">
					{title === "Binary Number" && (
						<>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Yes</span>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">No</span>
						</>
					)}
					{title === "Multi-Outcome Market" && (
						<>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Team A</span>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Team B</span>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Team C</span>
							<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Other</span>
						</>
					)}
					{title === "Scalar Market" && (
						<span className="px-3 py-1 bg-zinc-800 text-gray-300 text-xs rounded-full">Range: 0-100</span>
					)}
				</div>
			</div>

			{/* Best For */}
			<div>
				<p className="text-xs font-medium text-gray-500 uppercase mb-1">Best For</p>
				<p className="text-sm text-gray-400 leading-relaxed">
					{title === "Binary Number" && "Perfect for clear-cut predictions with two possible outcomes"}
					{title === "Multi-Outcome Market" &&
						"Perfect for elections, tournaments or with many scenarios with multiple winner"}
					{title === "Scalar Market" &&
						"Ideal for predictions involving numerical ranges or continuous values"}
				</p>
			</div>
		</div>
	)
}
