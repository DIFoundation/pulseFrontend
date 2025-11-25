import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import { MarketFormData } from "@/types/types"

const Step2_MarketDetails: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target

		if (id === "tradingFee" || id === "liquidity") {
			const finalValue = value === "" ? "" : Number(value)
			handleFormChange(id as keyof MarketFormData, finalValue)
			return
		}

		handleFormChange(id as keyof MarketFormData, value)
	}

	// FIX: Prevent Enter key from submitting the form
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
		}
	}

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="space-y-6">
				{/* Market Question */}
				<div>
					<label htmlFor="question" className="block text-sm font-semibold leading-relaxed mb-2">
						Market Question
					</label>
					<Input
						id="question"
						placeholder="e.g Will Bitcoin reach $100,000 by October 2025?"
						value={formData.question}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
					/>
				</div>

				{/* Description */}
				<div>
					<label htmlFor="description" className="block text-sm font-semibold leading-relaxed mb-2">
						Description
					</label>
					<Textarea
						id="description"
						placeholder="e.g BTC higher"
						value={formData.description}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						rows={4}
						className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light resize-none"
					/>
				</div>

				{/* Trading Fee and Initial Liquidity - Side by Side */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
					{/* Trading Fee */}
					<div>
						<label htmlFor="tradingFee" className="block text-sm font-semibold leading-relaxed mb-2">
							Trading Fee (%)
						</label>
						<div className="relative">
							<Input
								id="tradingFee"
								type="number"
								placeholder="0.5%"
								value={formData.tradingFee}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								min={0}
								max={5}
								step={0.1}
								className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
								%
							</span>
						</div>
					</div>

					{/* Initial Liquidity */}
					<div>
						<label htmlFor="liquidity" className="block text-sm font-semibold leading-relaxed mb-2">
							Initial Liquidity (BDAG)
						</label>
						<div className="relative">
							<Input
								id="liquidity"
								type="number"
								placeholder="0.00"
								value={formData.liquidity}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								min={100}
								className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
							/>
						</div>
					</div>
				</div>

				{/* Resolution Source */}
				<div>
					<label htmlFor="resolutionSource" className="block text-sm font-semibold leading-relaxed mb-2">
						Resolution Source
					</label>
					<Input
						id="resolutionSource"
						placeholder="Coinbase API final price"
						value={formData.resolutionSource || ""}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
					/>
				</div>

				<div>
					<label htmlFor="resolutionDate" className="block text-sm font-semibold leading-relaxed mb-2">
						Resolution Source
					</label>
					<Input
						id="resolutionDate"
						placeholder="Add tag (comma"
						value={formData.resolutionDate || ""}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						className="bg-primary-darkBrown border-secondary-light text-white placeholder:text-secondary-light"
					/>
				</div>
			</div>
		</div>
	)
}

export default Step2_MarketDetails
