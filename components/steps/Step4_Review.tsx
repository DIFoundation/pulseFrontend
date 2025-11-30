import { useCreateMarket } from "@/hooks/useCreateMarket"
import React from "react"

const Step4_Review: React.FC = () => {
	const { formData } = useCreateMarket()

	const description = formData.description || ""
	const validOutcomes = formData.outcomes?.filter((o) => o.option.trim() !== "") || []

	return (
		<div className="container w-3/4 mx-auto">
			<div className="p-6 border border-border rounded-xl bg-accent/20 space-y-4">
				<h4 className="text-xl font-semibold text-primary mb-4">Final Market Configuration</h4>

				{/* Market Category */}
				<div className="flex justify-between border-b border-border/50 pb-2">
					<span className="text-muted-foreground font-medium">Market Category:</span>
					<span className="text-foreground font-semibold capitalize">
						{formData.marketCategory || "(Not selected)"}
					</span>
				</div>

				{/* Market Type */}
				<div className="flex justify-between border-b border-border/50 pb-2">
					<span className="text-muted-foreground font-medium">Market Type:</span>
					<span className="text-foreground font-semibold capitalize">
						{formData.marketType === "multi" ? "Multi-Outcome" : formData.marketType}
					</span>
				</div>

				{/* Question */}
				<div className="border-b border-border/50 pb-2">
					<p className="text-muted-foreground font-medium mb-1">Question:</p>
					<p className="text-foreground font-bold">{formData.question || "(Pending Input)"}</p>
				</div>

				{/* Description */}
				<div className="border-b border-border/50 pb-2">
					<p className="text-muted-foreground font-medium mb-1">Description:</p>
					<p className="text-foreground italic text-sm">{description || "(None provided)"}</p>
				</div>

				{/* Outcomes - Only for Multi-Outcome Markets */}
				{formData.marketType === "multi" && validOutcomes.length > 0 && (
					<div className="border-b border-border/50 pb-3">
						<p className="text-muted-foreground font-medium mb-2">Possible Outcomes:</p>
						<div className="space-y-2">
							{validOutcomes.map((outcome, index) => (
								<div key={outcome.id} className="bg-zinc-900/30 rounded-lg p-3 border border-border/30">
									<div className="flex items-start gap-2">
										<span className="text-primary font-semibold min-w-[24px]">
											{String.fromCharCode(65 + index)}.
										</span>
										<div className="flex-1">
											<p className="text-foreground font-semibold">{outcome.option}</p>
											{outcome.description && (
												<p className="text-muted-foreground text-sm mt-1">
													{outcome.description}
												</p>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Trading Fee */}
				<div className="flex justify-between border-b border-border/50 pb-2">
					<span className="text-muted-foreground font-medium">Trading Fee:</span>
					<span className="text-foreground font-semibold">{formData.tradingFee}%</span>
				</div>

				{/* Initial Liquidity */}
				<div className="flex justify-between border-b border-border/50 pb-2">
					<span className="text-muted-foreground font-medium">Initial Liquidity:</span>
					<span className="text-foreground font-semibold">{formData.liquidity} wBDAG</span>
				</div>

				{/* Resolution Source */}
				<div className="flex justify-between border-b border-border/50 pb-2">
					<span className="text-muted-foreground font-medium">Resolution Source:</span>
					<span className="text-foreground font-semibold">
						{formData.resolutionSource || "(Not provided)"}
					</span>
				</div>

				{/* Resolution Date */}
				<div className="flex justify-between">
					<span className="text-muted-foreground font-medium">Resolution Date:</span>
					<span className="text-foreground font-semibold">{formData.resolutionDate || "(Not provided)"}</span>
				</div>

				{/* Warning */}
				<p className="pt-4 text-sm text-yellow-400">
					⚠️ IMPORTANT: Once deployed, this market is immutable and cannot be edited.
				</p>
			</div>
		</div>
	)
}

export default Step4_Review
