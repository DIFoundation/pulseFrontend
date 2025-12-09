import { Check, ArrowUpRight, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityItemProps {
	type: "success" | "failed" | "create" | "trade"
	title: string
	amount: string
	time: string
	status: "Successful" | "Failed"
	isLast?: boolean
}

export default function ActivityItem({ type, title, amount, time, status, isLast }: ActivityItemProps) {
	const getIconConfig = () => {
		if (status === "Failed") {
			return {
				icon: <X className="w-3 h-3 text-red-300" />,
				bg: "bg-red-900",
			}
		}

		switch (type) {
			case "success":
				return {
					icon: <Check className="w-3 h-3 bg-green-300" />,
					bg: "bg-green-900",
				}
			case "create":
				return {
					icon: <Plus className="w-3 h-3 text-yellow-300" />,
					bg: "bg-yellow-900",
				}
			case "trade":
				return {
					icon: <ArrowUpRight className="w-3 h-3 text-green-300" />,
					bg: "bg-green-900",
				}
			case "failed":
				return {
					icon: <X className="w-3 h-3 text-red-300" />,
					bg: "bg-red-900",
				}
			default:
				return { icon: <Check className="w-3 h-3" />, bg: "bg-green-500" }
		}
	}

	const config = getIconConfig()

	return (
		<div className="flex gap-4 relative">
			{!isLast && <div className="absolute left-[11px] top-8 bottom-[-16px] w-[1px] bg-zinc-800" />}

			{/* Icon Circle */}
			<div className="relative z-10 flex-shrink-0 mt-1">
				<div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-white", config.bg)}>
					{config.icon}
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col pb-8">
				<h4 className="text-base font-semibold text-white mb-1 line-clamp-1">{title}</h4>
				<div className="flex items-center gap-2 text-xs">
					<span className="text-gray-400 font-mono">{amount}</span>
					<span className="text-zinc-600">•</span>
					<span className="text-gray-500">{time}</span>

					{/* Status Badge */}
					<span
						className={cn(
							"ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium bg-opacity-10",
							status === "Successful" ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"
						)}>
						{status}
					</span>
				</div>
			</div>
		</div>
	)
}
