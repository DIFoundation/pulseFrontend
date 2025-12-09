import { Market } from "@/types/types"
import { cn } from "@/lib/utils"

interface MarketActionButtonsProps {
	market: Market
	onOptionSelect: (option: string) => void
}

export default function MarketActionButtons({ market, onOptionSelect }: MarketActionButtonsProps) {
	// --- 1. BINARY & SCALAR (Side by Side) ---
	if (market.marketType === "binary" || market.marketType === "scalar") {
		const isScalar = market.marketType === "scalar"
		const opt1 = isScalar ? "Long" : "Yes"
		const opt2 = isScalar ? "Short" : "No"

		return (
			<div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 w-full">
				{/* YES / LONG - Green Theme */}
				<button
					onClick={() => onOptionSelect(opt1)}
					className="
                        group relative w-full md:w-2/3 justify-self-start
                        flex items-center justify-center gap-3 p-2 rounded-xl transition-all duration-300
                        bg-black border border-green-500/50 
                        hover:bg-green-500/10 hover:border-green-500
                        active:bg-green-500 active:text-white
                    ">
					<div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] group-active:bg-white" />
					<span className="text-xl font-bold text-white group-active:text-white">{opt1}</span>
				</button>

				{/* NO / SHORT - Red Theme */}
				<button
					onClick={() => onOptionSelect(opt2)}
					className="
                        group relative w-full md:w-2/3 justify-self-end
                        flex items-center justify-center gap-3 p-2 rounded-xl transition-all duration-300
                        bg-black border border-red-500/50 
                        hover:bg-red-500/10 hover:border-red-500
                        active:bg-red-500 active:text-white
                    ">
					<div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] group-active:bg-white" />
					<span className="text-xl font-bold text-white group-active:text-white">{opt2}</span>
				</button>
			</div>
		)
	}

	// --- 2. MULTI-OUTCOME
	if (market.marketType === "multi" && market.outcomes) {
		const colors = [
			{
				base: "pink",
				border: "border-pink-500",
				hoverBg: "hover:bg-pink-500/10",
				dot: "bg-pink-500",
				activeBg: "active:bg-pink-500",
				shadow: "shadow-pink-500/50",
			},
			{
				base: "purple",
				border: "border-purple-500",
				hoverBg: "hover:bg-purple-500/10",
				dot: "bg-purple-500",
				activeBg: "active:bg-purple-500",
				shadow: "shadow-purple-500/50",
			},
			{
				base: "red",
				border: "border-red-500",
				hoverBg: "hover:bg-red-500/10",
				dot: "bg-red-500",
				activeBg: "active:bg-red-500",
				shadow: "shadow-red-500/50",
			},
			{
				base: "green",
				border: "border-green-500",
				hoverBg: "hover:bg-green-500/10",
				dot: "bg-green-500",
				activeBg: "active:bg-green-500",
				shadow: "shadow-green-500/50",
			},
			{
				base: "amber",
				border: "border-amber-500",
				hoverBg: "hover:bg-amber-500/10",
				dot: "bg-amber-500",
				activeBg: "active:bg-amber-500",
				shadow: "shadow-amber-500/50",
			},
		]

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
				{market.outcomes.map((outcome, index) => {
					const theme = colors[index % colors.length]
					const isEven = index % 2 === 0

					return (
						<button
							key={index}
							onClick={() => onOptionSelect(outcome.option)}
							className={cn(
								"group relative flex items-center justify-between rounded-xl p-2 transition-all duration-300",
								"bg-black border border-white/10", // Default Base
								"w-full md:w-2/3", // Layout width
								isEven ? "md:justify-self-start" : "md:justify-self-end",

								// Dynamic Hover & Border
								`hover:${theme.border} ${theme.hoverBg}`,

								// Active/Selected State (Momentary click on page)
								`${theme.activeBg} active:border-transparent active:text-white`
							)}>
							<div className="flex items-center gap-3">
								<div
									className={cn(
										"h-3 w-3 rounded-full shadow-lg transition-colors",
										theme.dot,
										theme.shadow,
										"group-active:bg-white" // Dot turns white when selected
									)}
								/>
								<span className="text-lg font-medium text-white group-active:text-white">
									{outcome.option}
								</span>
							</div>

							<span className="text-gray-500 text-sm font-mono group-hover:text-gray-300 group-active:text-white/90">
								{outcome.percentage || 54}%
							</span>
						</button>
					)
				})}
			</div>
		)
	}

	return null
}
