import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
	label: string
	value: string
	icon: ReactNode
	iconColorClass: string
}

export default function StatCard({ label, value, icon, iconColorClass }: StatCardProps) {
	return (
		<div className="bg-secondary-dark border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[140px] transition-all hover:border-white/10 group">
			<span className="text-gray-400 font-medium text-sm mb-4">{label}</span>

			<div className="flex items-end justify-between">
				<span className="text-2xl font-bold text-white tracking-tight">{value}</span>
				<div
					className={cn(
						"w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
						iconColorClass
					)}>
					{icon}
				</div>
			</div>
		</div>
	)
}
