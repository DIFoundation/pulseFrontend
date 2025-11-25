// Markets
export interface Market {
	id: number
	title: string
	category: "trending" | "ending-soon" | "high-value" | "newest" | "closed"
	question: string
	liquidity: string
	volume: string
	duration: string
	participants: number
}

export interface MarketTypeCardProps {
	title: string
	description: string
	question: string
	isSelected?: boolean
	onClick?: () => void
}

export interface MarketCategoryCardProps {
	icon: React.ReactNode
	title: string
	isSelected?: boolean
	onClick?: () => void
}

// Create form context
export interface MarketFormData {
	marketCategory: string
	marketType: string
	question: string
	description: string
	tradingFee: number
	liquidity: number
	resolutionSource?: string
	resolutionDate?: string
}

export interface MarketStep {
	id: number
	title: string
	description: string
}

export interface CreateMarketContextType {
	formData: MarketFormData
	currentStep: number
	totalSteps: number
	marketSteps: MarketStep[]
	handleFormChange: (field: keyof MarketFormData, value: string | number) => void
	handleNext: () => void
	handleBack: () => void
	handleSubmit: (e: React.FormEvent) => void
}
