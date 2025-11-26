import { CreateMarketContextType, MarketFormData, MarketStep } from "@/types/types"
import React, { useState, useMemo, createContext, useCallback } from "react"

export const MARKET_STEPS: MarketStep[] = [
	{ id: 1, title: "Market Category", description: "Select the best structure for your prediction market." },
	{ id: 2, title: "Market Type", description: "Select the outcome format for your prediction market." },
	{
		id: 3,
		title: "Market Details",
		description: "Provide clear and specific information about your prediction market",
	},
	{ id: 4, title: "Review & Deploy", description: "Final check before deploying your immutable market." },
]
export const TOTAL_STEPS = MARKET_STEPS.length

export const initialFormData: MarketFormData = {
	marketCategory: "",
	marketType: "binary",
	question: "",
	description: "",
	tradingFee: 0.5,
	liquidity: 100,
}

// Create the Context, initialized to undefined
export const CreateMarketContext = createContext<CreateMarketContextType | undefined>(undefined)

export const CreateMarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [formData, setFormData] = useState<MarketFormData>(initialFormData)

	// 1. Stabilize handleFormChange (Dependencies: [])
	const handleFormChange = useCallback((field: keyof MarketFormData, value: string | number) => {
		setFormData((prev) => ({ ...prev, [field]: value }))
	}, [])

	// 2. FIX: Remove formData dependencies and add better logging
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

	// 3. Stabilize handleBack
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

	// 4. Handle final submission (should only be called from step 4)
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault()
			console.log("[handleSubmit] Deploying market with data:", formData)

			//Our deployment logic here
			// TODO: Add your blockchain deployment logic

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
