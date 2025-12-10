import { ReactNode } from "react"

interface FeatureCardProps {
	icon: ReactNode
	title: string
	description: string
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
	return (
		<div className="relative group w-2/3 mx-auto md:w-full rounded-2xl p-[1px] overflow-hidden">
			{/* Top Glow */}

			<div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

			{/* CONTENT */}
			<div className="relative h-full bg-secondary-dark backdrop-blur-sm rounded-2xl p-8 z-10">
				<div className="text-primary mb-4">{icon}</div>
				<h3 className="text-xl font-bold text-primary-foreground mb-3 text-center">{title}</h3>
				<p className="text-sm text-primary-foreground leading-relaxed text-center">{description}</p>
			</div>

			{/* Bottom Glow  */}
			<div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
		</div>
	)
}
