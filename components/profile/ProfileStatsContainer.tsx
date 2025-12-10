import { ReactNode } from "react"

export default function ProfileStatsContainer({ children }: { children: ReactNode }) {
	return (
		<div className="w-full  backdrop-blur-sm relative z-10">
			<div className="pt-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{children}</div>
			</div>
		</div>
	)
}
