"use client"
import React, { useMemo } from "react"
import { ChevronsRight } from "lucide-react"
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
				// marketCategory must be selected
				return formData.marketCategory !== "" && formData.marketCategory !== undefined

			case 2: // Step 1: Market Type Selection
				// marketType must be selected
				return formData.marketType !== "" && formData.marketType !== undefined

			case 3: // Step 2: Market Details
				// Question, liquidity, and resolution sources are required
				const hasQuestion = formData.question && formData.question.trim() !== ""
				const hasValidLiquidity = formData.liquidity && Number(formData.liquidity) >= 100
				const hasResolutionSource = formData.resolutionSource && formData.resolutionSource.trim() !== ""
				const hasResolutionDate = formData.resolutionDate && formData.resolutionDate.trim() !== ""

				console.log("[Validation] Step 3:", {
					question: formData.question,
					hasQuestion,
					liquidity: formData.liquidity,
					hasValidLiquidity,
					resolutionSource: formData.resolutionSource,
					hasResolutionSource,
					resolutionDate: formData.resolutionDate,
					hasResolutionDate,
					isValid: hasQuestion && hasValidLiquidity && hasResolutionSource && hasResolutionDate,
				})

				return hasQuestion && hasValidLiquidity && hasResolutionSource && hasResolutionDate

			case 4: // Step 3: Review
				// All validations must pass
				return (
					formData.marketCategory !== "" &&
					formData.marketType !== "" &&
					formData.question &&
					formData.question.trim() !== "" &&
					formData.liquidity &&
					Number(formData.liquidity) >= 100 &&
					formData.resolutionSource &&
					formData.resolutionSource.trim() !== "" &&
					formData.resolutionDate &&
					formData.resolutionDate.trim() !== ""
				)

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
				<div className="text-center mb-4">
					<h1 className="text-3xl sm:text-4xl font-extrabold text-foreground glow-text">
						Create Prediction Market
					</h1>
					<p className="text-foreground mt-2 max-w-xl mx-auto">
						Launch your own prediction market with out guided wizard. Choose from templates or creates
						custom markets.
					</p>
				</div>

				<div className="bg p-4 sm:p-8">
					<ProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={marketSteps} />

					<div className="mb-4 pb-4 text-center">
						<h2 className="text-2xl font-bold text-foreground">{currentStepData?.title}</h2>
						<p className="text-sm text-foreground mt-1">{currentStepData?.description}</p>
					</div>

					<form onSubmit={handleFormSubmit} className="space-y-8">
						{renderStepContent()}

						<div className={`${currentStep === 1 ? "justify-end" : "justify-between"} flex pt-6`}>
							{currentStep > 1 && (
								<Button
									type="button"
									onClick={handleBackClick}
									disabled={currentStep === 1}
									className="bg-transparent border border-secondary-light text-foreground shadow-none disabled:opacity-30">
									Previous
								</Button>
							)}

							{currentStep < totalSteps ? (
								<Button
									type="button"
									onClick={handleNextClick}
									disabled={!isStepValid}
									className="bg-primary hover:bg-transparent hover:border hover:border-secondary-light disabled:opacity-50 disabled:cursor-not-allowed">
									Next Step
									<ChevronsRight className="h-4 w-4 ml-2" />
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleDeployClick}
									disabled={!isStepValid}
									className="bg-primary text-primary-foreground hover:bg-transparent hover:border hover:border-secondary-light disabled:opacity-50 disabled:cursor-not-allowed">
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
