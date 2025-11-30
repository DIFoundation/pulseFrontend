import { CreateMarketContextType, MarketFormData, MarketStep } from "@/types/types"
import React, { useState, useMemo, createContext, useCallback } from "react"

export const BASE_MARKET_STEPS: MarketStep[] = [
	{ id: 1, title: "Market Category", description: "Select the best structure for your prediction market." },
	{ id: 2, title: "Market Type", description: "Select the outcome format for your prediction market." },
	{
		id: 3,
		title: "Market Details",
		description: "Provide clear and specific information about your prediction market",
	},
	{ id: 4, title: "Market Outcomes", description: "Define the possible outcomes for your market." }, // Conditional step - after details
	{ id: 5, title: "Review & Deploy", description: "Final check before deploying your immutable market." },
]

export const initialFormData: MarketFormData = {
	marketCategory: "",
	marketType: "binary",
	question: "",
	description: "",
	tradingFee: 0.5,
	liquidity: 100,
	resolutionSource: "",
	resolutionDate: "",
	// Multi-outcome specific fields
	outcomes: [
		{ id: "1", option: "", description: "" },
		{ id: "2", option: "", description: "" },
	],
}

// Create the Context, initialized to undefined
export const CreateMarketContext = createContext<CreateMarketContextType | undefined>(undefined)

export const CreateMarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<MarketFormData>(initialFormData)

	// Calculate steps dynamically based on market type
	const marketSteps = useMemo(() => {
		const steps = [...BASE_MARKET_STEPS]

		// If not multi-outcome, remove the "Market Outcomes" step
		if (formData.marketType !== "multi") {
			return steps
				.filter((step) => step.id !== 3)
				.map((step, index) => ({
					...step,
					id: index + 1, // Reindex steps
				}))
		}

		return steps
	}, [formData.marketType])

	const TOTAL_STEPS = marketSteps.length

	// 1. Stabilize handleFormChange
	const handleFormChange = useCallback((field: keyof MarketFormData, value: MarketFormData[keyof MarketFormData]) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}, [])

	// 2. Handle Next with conditional step logic
	const handleNext = useCallback(() => {
		setCurrentStep((prev) => {
			console.log(`[handleNext] Current step: ${prev}, Total steps: ${TOTAL_STEPS}`)

			if (prev < TOTAL_STEPS) {
				console.log(`[handleNext] Moving to step ${prev + 1}`)
				return prev + 1
			}

			console.log(`[handleNext] Already at final step, staying at ${prev}`)
			return prev
		})
	}, [TOTAL_STEPS])

	// 3. Handle Back with conditional step logic
	const handleBack = useCallback(() => {
		setCurrentStep((prev) => {
			console.log(`[handleBack] Current step: ${prev}`)
			if (prev > 1) {
				console.log(`[handleBack] Moving to step ${prev - 1}`)
				return prev - 1
			}
			return prev
		})
	}, [])

	// 4. Handle final submission
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()
			console.log("[handleSubmit] Deploying market with data:", formData)

			// Prepare data for blockchain
			const marketData = {
				category: formData.marketCategory,
				type: formData.marketType,
				question: formData.question,
				description: formData.description,
				tradingFee: formData.tradingFee,
				liquidity: formData.liquidity,
				resolutionSource: formData.resolutionSource,
				resolutionDate: formData.resolutionDate,
				// Only include outcomes for multi-outcome markets
				...(formData.marketType === "multi" && {
					outcomes: formData.outcomes?.filter((o) => o.option.trim() !== ""),
				}),
			}

			console.log("[handleSubmit] Formatted market data:", marketData)

			// TODO: Add your blockchain deployment logic here
			// Example: await deployMarket(marketData)

			// Reset form after successful deployment
			setFormData(initialFormData)
			setCurrentStep(1)
		},
		[formData]
	)

	const contextValue = useMemo(
		() => ({
			formData,
			currentStep,
			totalSteps: TOTAL_STEPS,
			marketSteps,
			handleFormChange,
			handleNext,
			handleBack,
			handleSubmit,
		}),
		[formData, currentStep, TOTAL_STEPS, marketSteps, handleFormChange, handleNext, handleBack, handleSubmit]
	)

	return <CreateMarketContext.Provider value={contextValue}>{children}</CreateMarketContext.Provider>
}
