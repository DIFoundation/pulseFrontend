"use client"

import { markets } from "@/data/markets"
import { ChevronLeft, Copy } from "lucide-react"
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

	const { id } = use(params)
	const market = markets.find((m) => m.id === parseInt(id))

	const [copied, setCopied] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<string | null>(null)

	if (!market) notFound()

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option)
		setIsModalOpen(true)
	}

	const handleTradeShare = () => {
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
		<div className="min-h-screen cosmic-gradient px-4">
			<main className="container pt-24 px-4">
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
							className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2">
							{copied ? (
								<span className="text-primary flex items-center gap-2 text-sm">
									<Copy className="w-4 h-4" /> Copied
								</span>
							) : (
								<span className="flex items-center gap-2 text-sm">
									<Copy className="w-4 h-4" /> Copy Link
								</span>
							)}
						</button>
						<button
							onClick={handleTradeShare}
							className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-md text-sm shadow-lg shadow-orange-500/20">
							Trade Share
						</button>
					</div>
				</div>

				{/* Main Content */}

				<div className="wrapper flex flex-col gap-8">
					<div className="inner-chart-wrapper flex flex-col lg:flex-row justify-between items-center gap-8">
						<div className="chart w-full lg:w-3/4">
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

							{/* Chart Container */}
							<div className="w-full mb-8 min-h-[300px] md:min-h-[400px]">
								<MarketChart market={market} />
							</div>
						</div>
						<div className="stats w-2/3 lg:w-1/4">
							<MarketStats market={market} />
						</div>
					</div>

					<div className="actions w-full">
						<MarketActionButtons market={market} onOptionSelect={handleOptionSelect} />
					</div>
				</div>
			</main>
			{/* Trade Modal */}
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
