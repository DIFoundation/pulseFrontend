import React from "react"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import { MarketTypeCard } from "../form/MarketTypeCard"

const Step1_TypeSelection: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const marketTypes = [
		{
			key: "binary",
			title: "Binary Number",
			description: "Simple Yes and No market",
			question: "Will bitcoin reach $100,000 by end of 2025?",
		},
		{
			key: "multi",
			title: "Multi-Outcome Market",
			description: "Multi-choice prediction market",
			question: "Which team will win super bowl 2025?",
		},
		{
			key: "scalar",
			title: "Scalar Market",
			description: "Long and short prediction market",
			question: "What will be the price of Ethereum by December 2025?",
		},
	]

	const onSelectType = (type: string) => {
		handleFormChange("marketType", type)
	}

	return (
		<div className="w-full max-w-6xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{marketTypes.map((type) => (
					<MarketTypeCard
						key={type.key}
						title={type.title}
						description={type.description}
						question={type.question}
						isSelected={formData.marketType === type.key}
						onClick={() => onSelectType(type.key)}
					/>
				))}
			</div>
		</div>
	)
}

export default Step1_TypeSelection
