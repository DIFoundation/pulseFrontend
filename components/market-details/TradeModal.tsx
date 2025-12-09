"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Market } from "@/types/types"
import { cn } from "@/lib/utils"

interface TradeModalProps {
	isOpen: boolean
	onClose: () => void
	market: Market
	selectedOutcome: string | null
}

export default function TradeModal({ isOpen, onClose, market, selectedOutcome }: TradeModalProps) {
	const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
	const [amount, setAmount] = useState("")

	const [internalSelection, setInternalSelection] = useState<string | null>(selectedOutcome)

	if (!isOpen) return null

	let outcomes: { id: string; option: string; percentage?: number }[] = []

	if (market.marketType === "multi" && market.outcomes) {
		outcomes = market.outcomes
	} else if (market.marketType === "scalar") {
		outcomes = [
			{ id: "long", option: "Long", percentage: 50 },
			{ id: "short", option: "Short", percentage: 50 },
		]
	} else {
		outcomes = [
			{ id: "yes", option: "Yes", percentage: 50 },
			{ id: "no", option: "No", percentage: 50 },
		]
	}
	const potentialReturn = amount ? (parseFloat(amount) * 1.95).toFixed(2) : "0.00"
	const tradingFee = amount ? (parseFloat(amount) * 0.01).toFixed(2) : "0.00"

	const colors = ["#EF4444", "#8B5CF6", "#22C55E", "#EC4899", "#F59E0B"]

	const getOptionColor = (index: number, optionName: string) => {
		if (market.marketType === "multi") return colors[index % colors.length]

		const name = optionName.toLowerCase()
		if (name === "yes" || name === "long") return "#22c55e" // Green
		if (name === "no" || name === "short") return "#ef4444" // Red
		return colors[index % colors.length]
	}

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
			<div
				className="
                    relative w-full sm:max-w-md 
                    max-h-[90vh] overflow-y-auto
                    bg-secondary-dark border border-white/10 
                    rounded-t-xl sm:rounded-xl shadow-2xl 
                    p-6 
                    animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-200
                "
				onClick={(e) => e.stopPropagation()}>
				{/* Header Row */}
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-white">Trade</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
						<X className="w-6 h-6" />
					</button>
				</div>

				{/* Buy/Sell Tabs - Matches Design Image 3 */}
				<div className="flex bg-black p-1 rounded-xl mb-6 border border-white/5">
					<button
						onClick={() => setActiveTab("buy")}
						className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
							activeTab === "buy" ? "bg-[#222] text-white" : "text-gray-500 hover:text-white"
						}`}
						style={{
							backgroundColor: activeTab === "buy" ? "#F87217" : "transparent",
							color: activeTab === "buy" ? "white" : "gray",
						}}>
						Buy
					</button>
					<button
						onClick={() => setActiveTab("sell")}
						className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all`}
						style={{
							backgroundColor: activeTab === "sell" ? "#F87217" : "transparent",
							color: activeTab === "sell" ? "white" : "gray",
						}}>
						Sell
					</button>
				</div>

				{/* Amount Input */}
				<div className="mb-6">
					<div className="relative">
						<Input
							type="number"
							inputMode="decimal"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							placeholder="Number of shares"
							className="bg-black border-white/10 text-white h-14 text-lg pl-4 pr-4 rounded-xl placeholder:text-gray-600"
						/>
					</div>
				</div>

				{/* Outcome List (Multi-Outcome or Binary Selection) */}
				<div className="space-y-3 mb-8 max-h-[240px] overflow-y-auto custom-scrollbar">
					{outcomes.map((outcome, index) => {
						const isSelected = internalSelection === outcome.option || internalSelection === outcome.id
						const color = getOptionColor(index, outcome.option)

						return (
							<button
								key={index}
								onClick={() => setInternalSelection(outcome.option)}
								className={cn(
									"w-full flex items-center justify-between p-4 rounded-xl border transition-all",
									isSelected
										? "bg-white/5 border-white/20"
										: "bg-black border-transparent hover:border-white/10"
								)}>
								<div className="flex items-center gap-3">
									<div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
									<span className={cn("font-medium", isSelected ? "text-white" : "text-gray-400")}>
										{outcome.option}
									</span>
								</div>
								<span className="text-sm font-bold text-gray-500">{outcome.percentage || 50}%</span>
							</button>
						)
					})}
				</div>

				{/* Action Button */}
				<Button className="w-full py-6 text-base font-bold text-white bg-primary hover:bg-primary-dark rounded-xl mb-6 shadow-lg shadow-orange-500/20">
					Trade Bet
				</Button>

				{/* Footer Stats */}
				<div className="space-y-3 border-t border-white/10 pt-4">
					<div className="flex justify-between text-sm">
						<span className="text-gray-500">Trading Fee</span>
						<span className="text-gray-300 font-mono">{tradingFee} wDAG</span>
					</div>
					<div className="flex justify-between text-sm">
						<span className="text-gray-500">Potential return</span>
						<span className="text-white font-bold font-mono">{potentialReturn} wDAG</span>
					</div>
				</div>
			</div>
		</div>
	)
}
