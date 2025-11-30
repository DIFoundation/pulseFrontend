"use client"

import { markets } from "@/data/markets"
import { ChevronLeft, Copy, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, use } from "react"
import { notFound } from "next/navigation"
import BinaryMarketView from "@/components/market-details/BinaryMarketView"
import MultiOutcomeMarketView from "@/components/market-details/MultiOutcomeMarketView"
import ScalarMarketView from "@/components/market-details/ScalarMarketView"
import MarketChart from "@/components/market-details/MarketChart"
import MarketStats from "@/components/market-details/MarketStats"
import { MarketDetailPageProps } from "@/types/types"

export default function MarketDetailPage({ params }: MarketDetailPageProps) {
	const router = useRouter()
	const [copied, setCopied] = useState(false)

	// Unwrap params using React.use()
	const { id } = use(params)

	// Find the market
	const market = markets.find((m) => m.id === parseInt(id))

	// If market not found, show 404
	if (!market) {
		notFound()
	}

	const handleCopyLink = async () => {
		const url = window.location.href
		try {
			await navigator.clipboard.writeText(url)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error("Failed to copy:", err)
		}
	}

	const renderMarketType = () => {
		switch (market.marketType) {
			case "binary":
				return <BinaryMarketView market={market} />
			case "multi":
				return <MultiOutcomeMarketView market={market} />
			case "scalar":
				return <ScalarMarketView market={market} />
			default:
				return <BinaryMarketView market={market} />
		}
	}

	return (
		<div className="min-h-screen cosmic-gradient">
			<main className="container pt-20 px-4 pb-10">
				{/* Header Actions */}
				<div className="flex justify-between items-center mb-6 mt-10">
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary-foreground transition text-foreground hover:text-white">
						<ChevronLeft className="w-4 h-4" />
						Back
					</button>

					<button
						onClick={handleCopyLink}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-secondary-foreground transition text-foreground hover:text-white">
						{copied ? (
							<>
								<Check className="w-4 h-4 text-success" />
								<span className="text-success">Copied!</span>
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								Copy Link
							</>
						)}
					</button>
				</div>

				{/* Market Title and Question */}
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{market.question}</h1>
					{market.description && <p className="text-gray-400 text-lg">{market.description}</p>}
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left Column - Chart and Stats */}
					<div className="lg:col-span-2 space-y-6">
						{/* Price Chart */}
						<MarketChart market={market} />

						{/* Market Stats */}
						<MarketStats market={market} />
					</div>

					{/* Right Column - Trading Interface */}
					<div className="lg:col-span-1">{renderMarketType()}</div>
				</div>
			</main>
		</div>
	)
}
