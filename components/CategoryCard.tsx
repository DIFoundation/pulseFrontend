import Image from "next/image"

interface CategoryCardProps {
	iconUrl: string
	label: string
}

export const CategoryCard = ({ iconUrl, label }: CategoryCardProps) => {
	return (
		<div className="group backdrop-blur-sm rounded-2xl bg-background shadow-primary-dark shadow-md w-2/3 mx-auto md:w-full p-20 md:p-10 text-2xl md:text-lg">
			<div className="flex items-center justify-center gap-3">
				<Image src={iconUrl} alt="icon" width={25} height={25} />
				<span className="text-foreground font-semibold">{label}</span>
			</div>
		</div>
	)
}
