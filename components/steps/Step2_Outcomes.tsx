import React from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateMarket } from "@/hooks/useCreateMarket"

const Step2_Outcomes: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const outcomes = formData.outcomes || []

	const handleOutcomeChange = (id: string, field: "option" | "description", value: string) => {
		const updatedOutcomes = outcomes.map((outcome) =>
			outcome.id === id ? { ...outcome, [field]: value } : outcome
		)
		handleFormChange("outcomes", updatedOutcomes)
	}

	const addOutcome = () => {
		const newOutcome = {
			id: Date.now().toString(),
			option: "",
			description: "",
		}
		handleFormChange("outcomes", [...outcomes, newOutcome])
	}

	const removeOutcome = (id: string) => {
		if (outcomes.length <= 2) return // Minimum 2 outcomes required
		const updatedOutcomes = outcomes.filter((outcome) => outcome.id !== id)
		handleFormChange("outcomes", updatedOutcomes)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault()
		}
	}

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="container space-y-2.5">
				{/* Outcomes */}
				{outcomes.map((outcome, index) => (
					<div key={outcome.id} className="p-4 space-y-1.5">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-semibold text-white">Outcome {index + 1}</h3>
							{outcomes.length > 2 && (
								<Button
									type="button"
									variant="ghost"
									size="sm"
									onClick={() => removeOutcome(outcome.id)}
									className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
									<Trash2 className="w-4 h-4" />
								</Button>
							)}
						</div>

						{/* Option Name */}
						<div>
							<Input
								id={`option-${outcome.id}`}
								placeholder={`e.g., Option ${String.fromCharCode(65 + index)}`}
								value={outcome.option}
								onChange={(e) => handleOutcomeChange(outcome.id, "option", e.target.value)}
								onKeyDown={handleKeyDown}
								className="bg-secondary-dark border-secondary-light text-white placeholder:text-gray-500 w-full"
							/>
						</div>

						{/* Description (Optional) */}
						<div>
							<label
								htmlFor={`description-${outcome.id}`}
								className="block text-sm font-medium text-gray-300 mb-2">
								Description (optional)
							</label>
							<Textarea
								id={`description-${outcome.id}`}
								placeholder="Provide additional context for this outcome"
								value={outcome.description}
								onChange={(e) => handleOutcomeChange(outcome.id, "description", e.target.value)}
								onKeyDown={handleKeyDown}
								rows={2}
								className="bg-secondary-dark border-secondary-light text-white placeholder:text-gray-500 resize-none w-full"
							/>
						</div>
					</div>
				))}

				{/* Add Outcome Button */}
				{outcomes.length < 10 && (
					<div className="flex justify-center items-center">
						<Button
							type="button"
							onClick={addOutcome}
							variant="outline"
							className="w-1/2 border-dashed border-2 border-secondary-light hover:border-primary hover:bg-primary-dark text-gray-500 hover:text-primary-foreground transition-colors duration-300">
							<Plus className="w-4 h-4 mr-2" />
							Add Outcome (min2, max 10)
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Step2_Outcomes
