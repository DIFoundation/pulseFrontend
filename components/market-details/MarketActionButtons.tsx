import { Market } from "@/types/types"
import { cn } from "@/lib/utils"

interface MarketActionButtonsProps {
	market: Market
	onOptionSelect: (option: string) => void
}

export default function MarketActionButtons({ market, onOptionSelect }: MarketActionButtonsProps) {
	// --- LAYOUT 1: BINARY & SCALAR (Side by Side) ---
	if (market.marketType === "binary" || market.marketType === "scalar") {
		const isScalar = market.marketType === "scalar"
		const opt1 = isScalar ? "Long" : "Yes"
		const opt2 = isScalar ? "Short" : "No"

		return (
			<div className="grid grid-cols-2 gap-4 md:gap-6 mt-6">
				{/* YES / LONG */}
				<button
					onClick={() => onOptionSelect(opt1)}
					className="group relative overflow-hidden rounded-xl border border-green-500/30 bg-black p-6 transition-all hover:border-green-500 hover:bg-green-500/5 text-left">
					<div className="flex items-center gap-3 mb-2">
						<div className="h-3 w-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
						<span className="text-xl font-bold text-white group-hover:text-green-500 transition-colors">
							{opt1}
						</span>
					</div>
					<p className="text-sm text-gray-500 pl-6">Bet on the price going up</p>
				</button>

				{/* NO / SHORT */}
				<button
					onClick={() => onOptionSelect(opt2)}
					className="group relative overflow-hidden rounded-xl border border-red-500/30 bg-black p-6 transition-all hover:border-red-500 hover:bg-red-500/5 text-left">
					<div className="flex items-center gap-3 mb-2">
						<div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
						<span className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
							{opt2}
						</span>
					</div>
					<p className="text-sm text-gray-500 pl-6">Bet on the price going down</p>
				</button>
			</div>
		)
	}

	// --- LAYOUT 2: MULTI-OUTCOME (Grid list) ---
	if (market.marketType === "multi" && market.outcomes) {
		// Aesthetic colors for the dynamic options
		const colors = [
			{ border: "border-pink-500", bg: "bg-pink-500", text: "text-pink-500" },
			{ border: "border-purple-500", bg: "bg-purple-500", text: "text-purple-500" },
			{ border: "border-red-500", bg: "bg-red-500", text: "text-red-500" },
			{ border: "border-green-500", bg: "bg-green-500", text: "text-green-500" },
			{ border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-500" },
		]

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
				{market.outcomes.map((outcome, index) => {
					const theme = colors[index % colors.length]
					return (
						<button
							key={index}
							onClick={() => onOptionSelect(outcome.option)}
							className={cn(
								"group relative flex items-center justify-between rounded-xl border bg-black p-5 transition-all",
								"border-white/10 hover:border-opacity-100",
								`hover:${theme.bg}/10`, // hover background tint
								`hover:${theme.border}` // hover border color
							)}>
							<div className="flex items-center gap-3">
								<div className={cn("h-3 w-3 rounded-full shadow-lg", theme.bg)} />
								<span className="text-lg font-medium text-white">{outcome.option}</span>
							</div>

							{/* Optional: Show current price or odds here */}
							<span className="text-gray-500 text-sm group-hover:text-white">54%</span>
						</button>
					)
				})}
			</div>
		)
	}

	return null
}
