import React from "react"
import { Zap, Code, TrendingUp } from "lucide-react"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import { MarketTypeCard } from "../form/MarketTypeCard"

const Step1_TypeSelection: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const marketTypes = [
		{
			key: "binary",
			title: "Binary Number",
			description: "Will bitcoin reach $100,000 by end of 2025?",
			icon: <Zap />,
		},
		{
			key: "multi",
			title: "Multi-Outcome Market",
			description: "Which team will win super bowl 2025?",
			icon: <Code />,
		},
		{
			key: "scalar",
			title: "Scalar Market",
			description: "What will be the final score in the NBA finals?",
			icon: <TrendingUp />,
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
						icon={type.icon}
						title={type.title}
						description={type.description}
						isSelected={formData.marketType === type.key}
						onClick={() => onSelectType(type.key)}
					/>
				))}
			</div>
		</div>
	)
}

export default Step1_TypeSelection
