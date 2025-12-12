import Image from "next/image"
import { cn } from "@/lib/utils"

interface CategoryCardProps {
	iconUrl: string
	label: string
	className?: string
}

export const CategoryCard = ({ iconUrl, label, className }: CategoryCardProps) => {
	return (
		<div className={cn("relative group w-full rounded-2xl p-[1px] overflow-hidden", className)}>
			<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

			<div className="relative h-full bg-secondary-dark backdrop-blur-sm rounded-2xl p-6 md:p-8 flex items-center justify-center gap-3 z-10">
				<Image src={iconUrl} alt={label} width={30} height={30} className="w-8 h-8 md:w-6 md:h-6" />
				<span className="text-foreground font-semibold whitespace-nowrap text-xl md:text-lg">{label}</span>
			</div>

			<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</div>
	)
}
