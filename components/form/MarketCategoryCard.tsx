import { MarketCategoryCardProps } from "@/types/types"
import Image from "next/image"

export const MarketCategoryCard: React.FC<MarketCategoryCardProps> = ({
	iconUrl,
	title,
	isSelected = false,
	onClick,
}) => {
	const baseClasses =
		"p-8 border rounded-xl transition-all cursor-pointer flex justify-center gap-2 align-center w-3/4 mx-auto cosmic-gradient-2 shadow-sm shadow-primary-dark"

	// Conditional styling based on selection state
	const stateClasses = isSelected
		? "bg-accent/40 border-primary shadow-lg shadow-primary/20"
		: "bg-accent/10 border-border hover:bg-accent/20"

	return (
		<div className={`${baseClasses} ${stateClasses}`} onClick={onClick}>
			<div className="text-primary mb-3">
				<Image src={iconUrl} alt="icon" width={25} height={25} />
			</div>
			<h4 className="text-base font-semibold text-foreground mb-1">{title}</h4>
		</div>
	)
}
