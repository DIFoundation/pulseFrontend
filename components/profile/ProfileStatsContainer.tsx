import { ReactNode } from "react"

export default function ProfileStatsContainer({ children }: { children: ReactNode }) {
	return (
		<div className="relative w-full">
			<div className="">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>
			</div>

			{/* Optional: Add a subtle glow at the bottom to match the vibe */}
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-orange-500/20 blur-xl" />
		</div>
	)
}
