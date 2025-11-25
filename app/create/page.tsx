"use client"
import React, { useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ProgressBar } from "@/components/form/ProgressBar"
import { Button } from "@/components/ui/button"
import { useCreateMarket } from "@/hooks/useCreateMarket"
import Step1_TypeSelection from "@/components/steps/Step1"
import Step2_MarketDetails from "@/components/steps/Step2"
import Step3_Review from "@/components/steps/Step3"
import Step0_CategorySeclection from "@/components/steps/Step0"

const CreateMarket: React.FC = () => {
	const { currentStep, totalSteps, marketSteps, formData, handleNext, handleBack, handleSubmit } = useCreateMarket()

	const currentStepData = useMemo(
		() => marketSteps.find((step) => step.id === currentStep),
		[currentStep, marketSteps]
	)

	// Validation function for each step
	const isStepValid = useMemo(() => {
		switch (currentStep) {
			case 1: // Step 0: Category Selection
				// marketType must be selected (not empty)
				return formData.marketType !== "" && formData.marketType !== "binary" // Assuming "binary" is the default

			case 2: // Step 1: Market Type Selection
				// marketType must be selected
				return formData.marketType !== ""

			case 3: // Step 2: Market Details
				// Question is required, liquidity must be >= 100
				return formData.question.trim() !== "" && formData.liquidity >= 100

			case 4: // Step 3: Review
				// All validations must pass
				return formData.marketType !== "" && formData.question.trim() !== "" && formData.liquidity >= 100

			default:
				return false
		}
	}, [currentStep, formData])

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <Step0_CategorySeclection />
			case 2:
				return <Step1_TypeSelection />
			case 3:
				return <Step2_MarketDetails />
			case 4:
				return <Step3_Review />
			default:
				return <div>Step not found.</div>
		}
	}

	// FIX: Prevent default form submission behavior
	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log("[Page] Form submit triggered on step:", currentStep)

		// Block any accidental form submissions (Enter key, etc.)
		console.warn("[Page] Form submission blocked - use Deploy button only")
	}

	// Prevent the Next button from being called multiple times
	const handleNextClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		// Validate before proceeding
		if (!isStepValid) {
			console.warn("[Page] Cannot proceed - step validation failed")
			return
		}

		console.log("[Page] Next button clicked on step:", currentStep)
		handleNext()
	}

	const handleBackClick = (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
		console.log("[Page] Back button clicked on step:", currentStep)
		handleBack()
	}

	// Handle the Deploy button click
	const handleDeployClick = () => {
		// Final validation check
		if (!isStepValid) {
			console.warn("[Page] Cannot deploy - validation failed")
			return
		}

		console.log("[Page] Deploy button clicked - submitting form")
		// Directly call handleSubmit with a synthetic event
		const syntheticEvent = { preventDefault: () => {} } as React.FormEvent
		handleSubmit(syntheticEvent)
	}

	return (
		<div className="min-h-screen cosmic-gradient px-4">
			<main className="container pt-24 px-4">
				<div className="text-center mb-8">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-foreground glow-text">
						Create Prediction Market
					</h1>
					<p className="text-muted-foreground mt-2 max-w-xl mx-auto">
						Launch your own prediction market on our decentralized platform.
					</p>
				</div>

				<div className="bg p-4 sm:p-8">
					<ProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={marketSteps} />

					<div className="mb-8 pb-4 text-center">
						<h2 className="text-2xl font-bold text-foreground">{currentStepData?.title}</h2>
						<p className="text-sm text-muted-foreground mt-1">{currentStepData?.description}</p>
					</div>

					{/* FIX: Use handleFormSubmit instead of handleSubmit directly */}
					<form onSubmit={handleFormSubmit} className="space-y-8">
						{renderStepContent()}

						<div className="flex justify-between pt-6 border-t border-border/50">
							<Button
								type="button"
								onClick={handleBackClick}
								disabled={currentStep === 1}
								className="bg-accent/50 text-foreground hover:bg-accent/70 shadow-none disabled:opacity-30">
								<ChevronLeft className="h-4 w-4 mr-2" />
								Previous
							</Button>

							{currentStep < totalSteps ? (
								<Button
									type="button"
									onClick={handleNextClick}
									disabled={!isStepValid}
									className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
									Next Step
									<ChevronRight className="h-4 w-4 ml-2" />
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleDeployClick}
									disabled={!isStepValid}
									className="bg-success text-success-foreground hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed">
									Deploy Market
								</Button>
							)}
						</div>
					</form>
				</div>
			</main>
		</div>
	)
}

export default CreateMarket
