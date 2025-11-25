import React from "react"
import { Bitcoin, CloudSun, Drama, Grid, Volleyball, Vote } from "lucide-react"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import { MarketCategoryCard } from "../form/MarketCategoryCard"

const Step0_CategorySelection: React.FC = () => {
	const { formData, handleFormChange } = useCreateMarket()

	const categoryTypes = [
		{ key: "weather", title: "Weather", icon: <CloudSun className="w-6 h-6" /> },
		{ key: "entertainment", title: "Entertainment", icon: <Drama className="w-6 h-6" /> },
		{ key: "sport", title: "Sport", icon: <Volleyball className="w-6 h-6" /> },
		{ key: "politics", title: "Politics", icon: <Vote className="w-6 h-6" /> },
		{ key: "crypto", title: "Crypto", icon: <Bitcoin className="w-6 h-6" /> },
		{ key: "others", title: "Others", icon: <Grid className="w-6 h-6" /> },
	]

	const onSelectType = (type: string) => {
		handleFormChange("marketType", type)
	}

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{categoryTypes.map((type) => (
					<MarketCategoryCard
						key={type.key}
						icon={type.icon}
						title={type.title}
						isSelected={formData.marketType === type.key}
						onClick={() => onSelectType(type.key)}
					/>
				))}
			</div>
		</div>
	)
}

export default Step0_CategorySelection
