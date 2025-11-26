import { MarketTypeCardProps } from "@/types/types"
import React from "react"
import { CheckCircle } from "lucide-react"

export const MarketTypeCard: React.FC<MarketTypeCardProps> = ({
	title,
	description,
	question,
	isSelected = false,
	onClick,
}) => {
	return (
		<div
			className={`
				relative p-6 py-14 rounded-xl cursor-pointer transition-all duration-300
				border-2 group hover:border-primary-dark bg-secondary-dark
				${isSelected ? "border-primary-dark border-[3px]" : " border-secondary-light"}
			`}
			onClick={onClick}>
			{/* Selected Badge */}
			{isSelected && (
				<div className="absolute top-4 right-4 flex items-center gap-1.5 text-primary text-sm font-medium">
					<CheckCircle className="w-4 h-4" />
					<span className="text-xs">Selected</span>
				</div>
			)}

			{/* Title */}
			<div className="text-center my-2">
				<h4
					className="text-lg font-semibold mb-2 transition-colors duration-300
				text-primary-foreground ">
					{title}
				</h4>
				<span className="font-extralight text-sm ">{description}</span>
			</div>

			{/* Example Section */}
			<div className="mb-3">
				<p className="text-sm font-bold uppercase mb-1">Example:</p>
				<p className="text-sm font-normal leading-relaxed">{question}</p>
			</div>

			{/* Outcome Pills */}
			<div className="my-5">
				<p className="text-sm font-bold uppercase mb-2">Outcome</p>
				<div className="flex flex-wrap gap-2">
					{title === "Binary Number" && (
						<>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Yes
							</span>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								No
							</span>
						</>
					)}
					{title === "Multi-Outcome Market" && (
						<>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Team A
							</span>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Team B
							</span>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Team C
							</span>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Other
							</span>
						</>
					)}
					{title === "Scalar Market" && (
						<>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Long
							</span>
							<span className="px-3 py-2 bg-primary-brown text-primary-foreground text-xs rounded">
								Short
							</span>
						</>
					)}
				</div>
			</div>

			{/* Best For */}
			<div>
				<p className="text-sm font-medium uppercase mb-1">Best For</p>
				<p className="text-xs leading-relaxed">
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
