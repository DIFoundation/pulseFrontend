"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScalarMarketViewProps } from "@/types/types"

export default function ScalarMarketView({ market }: ScalarMarketViewProps) {
	const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy")
	const [amount, setAmount] = useState("")
	const [position, setPosition] = useState<"long" | "short" | null>(null)

	// Use market data for the current value
	const [currentValue] = useState(() => 50 + (market.id % 30))

	return (
		<div className="bg-secondary-dark border border-secondary-light rounded-xl p-6 sticky top-4">
			{/* Tabs */}
			<div className="flex gap-2 mb-6 border border-secondary-light rounded-lg">
				<button
					onClick={() => setActiveTab("buy")}
					className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
						activeTab === "buy"
							? "bg-primary text-foreground"
							: "bg-secondary-dark text-gray-400 hover:text-foreground"
					}`}>
					Buy
				</button>
				<button
					onClick={() => setActiveTab("sell")}
					className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
						activeTab === "sell"
							? "bg-primary text-foreground"
							: "bg-secondary-dark text-gray-400 hover:text-foreground"
					}`}>
					Sell
				</button>
			</div>

			{/* Range Display */}
			<div className="mb-6 p-4 bg-secondary-dark rounded-lg">
				<div className="flex justify-between text-sm text-gray-400 mb-2">
					<span>Min</span>
					<span className="text-foreground font-semibold">Current: {currentValue}</span>
					<span>Max</span>
				</div>
				<div className="relative h-2 bg-zinc-700 rounded-full overflow-hidden">
					<div
						className="absolute h-full bg-gradient-to-r from-success to-blue-500"
						style={{ width: `${currentValue}%` }}
					/>
				</div>
				<div className="flex justify-between text-xs text-gray-500 mt-1">
					<span>0</span>
					<span>100</span>
				</div>
			</div>

			{/* Amount Input */}
			<div className="mb-6">
				<label className="block text-sm text-gray-400 mb-2">Amount (wDAG)</label>
				<Input
					type="number"
					placeholder="0.00"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					className="bg-secondary-dark border-secondary-light text-foreground"
				/>
			</div>

			{/* Position Selection */}
			<div className="mb-6">
				<label className="block text-sm text-gray-400 mb-3">Select Position</label>
				<div className="grid grid-cols-2 gap-3">
					<button
						onClick={() => setPosition("long")}
						className={`p-4 rounded-lg border-2 transition ${
							position === "long"
								? "border-success bg-success/10"
								: "border-secondary-light bg-secondary-dark"
						}`}>
						<div className="text-center">
							<div className="text-2xl mb-1">📈</div>
							<div className="font-semibold text-foreground">Long</div>
							<div className="text-xs text-gray-400">Bet Higher</div>
						</div>
					</button>

					<button
						onClick={() => setPosition("short")}
						className={`p-4 rounded-lg border-2 transition ${
							position === "short"
								? "border-destructive bg-destructive/10"
								: "border-secondary-light bg-secondary-dark"
						}`}>
						<div className="text-center">
							<div className="text-2xl mb-1">📉</div>
							<div className="font-semibold text-foreground">Short</div>
							<div className="text-xs text-gray-400">Bet Lower</div>
						</div>
					</button>
				</div>
			</div>

			{/* Action Button */}
			<Button
				className="w-full bg-orange-500 hover:bg-orange-600 text-foreground font-bold py-6"
				disabled={!position}>
				{activeTab === "buy" ? "Buy Shares" : "Sell Shares"}
			</Button>

			{/* Summary */}
			<div className="mt-6 pt-6 border-t border-secondary-light space-y-2 text-sm">
				<div className="flex justify-between text-gray-400">
					<span>Position</span>
					<span className="text-foreground font-semibold capitalize">{position || "None"}</span>
				</div>
				<div className="flex justify-between text-gray-400">
					<span>Potential Return</span>
					<span className="text-foreground font-semibold">
						{amount ? `${(parseFloat(amount) * 1.85).toFixed(2)} wDAG` : "0.00 wDAG"}
					</span>
				</div>
				<div className="flex justify-between text-gray-400">
					<span>Trading Fee (0.5%)</span>
					<span className="text-foreground font-semibold">
						{amount ? `${(parseFloat(amount) * 0.005).toFixed(3)} wDAG` : "0.000 wDAG"}
					</span>
				</div>
			</div>
		</div>
	)
}
