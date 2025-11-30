import { TYPE_BADGE_STYLES } from "@/data/constants"
import { Market } from "@/types/types"
import { ChartColumn, Clock5, User } from "lucide-react"
import Link from "next/link"

export default function MarketCard({ market }: { market: Market }) {
	// Get market type badge style
	const getMarketTypeBadge = () => {
		const styles: Record<string, string> = {
			binary: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
			multi: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
			scalar: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
		}
		return styles[market.marketType] || "bg-gray-500/20 text-gray-400"
	}

	const getMarketTypeLabel = () => {
		const labels: Record<string, string> = {
			binary: "Binary",
			multi: "Multi",
			scalar: "Scalar",
		}
		return labels[market.marketType] || market.marketType
	}

	// Render buttons based on market type
	const renderActionButtons = () => {
		if (market.marketType === "binary") {
			return (
				<>
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-success hover:bg-success-light hover:shadow-sm hover:shadow-success-foreground transition text-success-foreground font-bold text-sm sm:text-base">
						Buy | Yes
					</button>
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-destructive hover:bg-destructive-light hover:shadow-sm hover:shadow-destructive-foreground transition text-destructive-foreground font-bold text-sm sm:text-base">
						Buy | No
					</button>
				</>
			)
		}

		if (market.marketType === "multi") {
			return (
				<button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-primary hover:bg-primary/90 hover:shadow-sm hover:shadow-primary transition text-white font-bold text-sm sm:text-base">
					Trade Shares
				</button>
			)
		}

		if (market.marketType === "scalar") {
			return (
				<>
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-success hover:bg-success-light hover:shadow-sm hover:shadow-success-foreground transition text-success-foreground font-bold text-sm sm:text-base">
						Long
					</button>
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-destructive hover:bg-destructive-light hover:shadow-sm hover:shadow-destructive-foreground transition text-destructive-foreground font-bold text-sm sm:text-base">
						Short
					</button>
				</>
			)
		}

		// Fallback
		return (
			<button className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-primary hover:bg-primary/90 transition text-white font-bold text-sm sm:text-base">
				Trade
			</button>
		)
	}

	return (
		<Link href={`/markets/market/${market.id}`} className="block">
			<div className="flex flex-col items-center p-6 pb-0 rounded-xl border border-gray-800 hover:border-primary-light hover:shadow-md hover:shadow-primary-light transition-all cursor-pointer">
				{/* Title */}
				<h3 className="text-xl text-white font-medium text-center">{market.title}</h3>

				{/* Content Wrapper */}
				<div className="inner wavy-box mt-4 flex flex-col w-full mx-auto">
					{/* Tags & Participants Row */}
					<div className="flex justify-between items-center w-full px-3 sm:px-4 pt-4 sm:pt-6">
						{/* Badges Container */}
						<div className="flex gap-2">
							{/* Category Badge */}
							<div
								className={`text-xs font-medium rounded-md px-2 py-0.5 ${
									TYPE_BADGE_STYLES[market.type] ?? "bg-gray-800 text-gray-300"
								}`}>
								{market.type}
							</div>

							{/* Market Type Badge */}
							<div className={`text-xs font-medium rounded-md px-2 py-0.5 ${getMarketTypeBadge()}`}>
								{getMarketTypeLabel()}
							</div>
						</div>

						{/* Participants */}
						<div className="participants flex items-center gap-1 text-primary-gray">
							<User width={16} height={16} />
							<span className="text-sm">{market.participants}</span>
						</div>
					</div>

					{/* Question */}
					<p className="mt-3 sm:mt-4 text-white text-base sm:text-lg font-bold leading-snug px-3 sm:px-4">
						{market.question}
					</p>

					{/* --- Stats row --- */}
					<div className="mt-3 sm:mt-4 text-xs flex justify-between gap-1 w-full px-3 sm:px-4">
						{/* Stat Item - Liquidity */}
						<div className="flex flex-col items-center flex-1">
							<span className="flex items-center gap-1 mb-1 text-gray-500">
								<ChartColumn width={14} height={14} className="sm:w-4 sm:h-4" />
								<span className="text-xs">Liquidity</span>
							</span>
							<span className="font-bold text-white text-sm">{market.liquidity}</span>
						</div>

						{/* Stat Item - Volume */}
						<div className="flex flex-col items-center flex-1">
							<span className="flex items-center gap-1 mb-1 text-gray-500">
								<ChartColumn width={14} height={14} className="sm:w-4 sm:h-4" />
								<span className="text-xs">Volume</span>
							</span>
							<span className="font-bold text-white text-sm">{market.volume}</span>
						</div>

						{/* Stat Item - Duration */}
						<div className="flex flex-col items-center flex-1">
							<span className="flex items-center gap-1 mb-1 text-gray-500">
								<Clock5 width={14} height={14} className="sm:w-4 sm:h-4" />
								<span className="text-xs">Duration</span>
							</span>
							<span className="font-bold text-white text-sm">{market.duration}</span>
						</div>
					</div>
					{/* --- End Stats row --- */}

					{/* Dynamic Action buttons */}
					<div className="flex w-full gap-2 mt-4 px-3 sm:px-4 pb-4">{renderActionButtons()}</div>
				</div>
			</div>
		</Link>
	)
}
