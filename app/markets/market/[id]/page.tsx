"use client"

import { markets } from "@/data/markets"
import { ChevronLeft, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, use } from "react"
import { notFound } from "next/navigation"
import MarketChart from "@/components/market-details/MarketChart"
import MarketStats from "@/components/market-details/MarketStats"
import MarketActionButtons from "@/components/market-details/MarketActionButtons"
import TradeModal from "@/components/market-details/TradeModal"
import { MarketDetailPageProps } from "@/types/types"

export default function MarketDetailPage({ params }: MarketDetailPageProps) {
	const router = useRouter()

	// 1. Unwrap ID
	const { id } = use(params)
	const market = markets.find((m) => m.id === parseInt(id))

	// 2. State Management
	const [copied, setCopied] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<string | null>(null)

	if (!market) notFound()

	// 3. Logic to open modal when a button is clicked
	const handleOptionSelect = (option: string) => {
		setSelectedOption(option)
		setIsModalOpen(true)
	}

	const handleTradeShare = () => {
		// If it's a binary market, we might default to "Yes" or nothing.
		// If it's multi, we default to the first option or nothing.
		// Passing null lets the user pick from the list inside the modal.
		setSelectedOption(market.outcomes ? market.outcomes[0].option : "Yes")
		setIsModalOpen(true)
	}

	const handleCopyLink = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy:", err)
		}
	}

	return (
		<div className="min-h-screen bg-black text-white selection:bg-white/20">
			<div className="container mx-auto px-4 pt-12 pb-20 max-w-7xl">
				{/* Header Actions */}
				<div className="flex justify-between items-start mb-8">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors pl-0">
						<ChevronLeft className="w-5 h-5" />
						<span className="font-medium">Back</span>
					</button>

					<div className="flex items-center gap-4">
						<button
							onClick={handleCopyLink}
							className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
							{copied ? (
								<span className="text-green-500 flex items-center gap-2 text-sm">
									<Check className="w-4 h-4" /> Copied
								</span>
							) : (
								<span className="flex items-center gap-2 text-sm">
									<Copy className="w-4 h-4" /> Copy Link
								</span>
							)}
						</button>
						<button
							onClick={handleTradeShare}
							className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-orange-500/20">
							Trade Share
						</button>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
					{/* LEFT COLUMN: Chart & Interactions (Spans 9) */}
					<div className="lg:col-span-9 flex flex-col">
						<div className="mb-8">
							<h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
								{market.question}
							</h1>
							{market.description && (
								<p className="text-gray-400 text-lg font-light leading-relaxed border-l-2 border-gray-800 pl-4">
									{market.description}
								</p>
							)}
						</div>

						{/* Chart */}
						<div className="w-full mb-8 min-h-[400px]">
							<MarketChart market={market} />
						</div>

						{/* Action Buttons (Triggers Modal) */}
						<div className="mt-auto">
							<MarketActionButtons market={market} onOptionSelect={handleOptionSelect} />
						</div>
					</div>

					{/* RIGHT COLUMN: Stats (Spans 3) */}
					<div className="lg:col-span-3 lg:mt-32">
						<MarketStats market={market} />
					</div>
				</div>
			</div>

			{/* THE MODAL (Hidden by default, triggered by state) */}
			{/* THE MODAL: Conditionally render it so state resets automatically */}
			{isModalOpen && (
				<TradeModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					market={market}
					selectedOutcome={selectedOption}
				/>
			)}
		</div>
	)
}
