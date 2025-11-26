import { Market } from "@/types/types"
import { ChartColumn, Clock5, User } from "lucide-react"

export default function MarketCard({ market }: { market: Market }) {
	return (
		<div className="flex flex-col items-center p-6 pb-0 rounded-xl border border-gray-800 hover:border-primary-light hover:shadow-md hover:shadow-primary-light transition-colors">
			{/* Title */}
			<h3 className="text-xl text-white font-medium text-center">{market.title}</h3>

			{/* Content Wrapper */}

			<div className="inner wavy-box mt-4 flex flex-col w-full mx-auto">
				{/* Tags & Participants Row */}
				<div className="flex justify-between items-center w-full px-3 sm:px-4 pt-4 sm:pt-6">
					<div className="category text-xs font-medium rounded-md bg-gray-800 text-gray-300 px-2 py-0.5">
						{market.type}
					</div>
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

				{/* Action buttons */}
				<div className="flex w-full justify-between gap-2 mt-4 px-3 sm:px-4 pb-4">
					{/* Buy Yes Button */}
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-success hover:bg-success-light hover:shadow-sm hover:shadow-success-foreground transition text-success-foreground font-bold text-sm sm:text-base">
						Buy | Yes
					</button>
					{/* Buy No Button */}
					<button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-destructive hover:bg-destructive-light hover:shadow-sm hover:shadow-destructive-foreground transition text-destructive-foreground font-bold text-sm sm:text-base">
						Buy | No
					</button>
				</div>
			</div>
		</div>
	)
}
