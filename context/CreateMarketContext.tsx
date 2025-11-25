import { CreateMarketContextType, MarketFormData, MarketStep } from "@/types/types"
import React, { useState, useMemo, createContext, useCallback } from "react"

export const MARKET_STEPS: MarketStep[] = [
	{
		id: 1,
		title: "Choose Market Category",
		description: "Select the structure that best fits your prediction market.",
	},
	{ id: 2, title: "Market Type", description: "Select the outcome format for your prediction market." },
	{ id: 3, title: "Market Details", description: "Input the specifics of your prediction question and parameters." },
	{ id: 4, title: "Review & Deploy", description: "Final check before deploying your immutable market." },
]
export const TOTAL_STEPS = MARKET_STEPS.length

export const initialFormData: MarketFormData = {
	marketType: "binary",
	question: "",
	description: "",
	tradingFee: 0.5,
	liquidity: 500,
}

export const CreateMarketContext = createContext<CreateMarketContextType | undefined>(undefined)

export const CreateMarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<MarketFormData>(initialFormData)

	const handleFormChange = useCallback((field: keyof MarketFormData, value: string | number) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}, [])

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
	}, [])

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

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()
			console.log("[handleSubmit] Deploying market with data:", formData)

			// TODO: lockchain deployment logic

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
			marketSteps: MARKET_STEPS,
			handleFormChange,
			handleNext,
			handleBack,
			handleSubmit,
		}),
		[formData, currentStep, handleFormChange, handleNext, handleBack, handleSubmit]
	)

	return <CreateMarketContext.Provider value={contextValue}>{children}</CreateMarketContext.Provider>
}
