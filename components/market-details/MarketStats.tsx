import { MarketStatsProps } from "@/types/types"

export default function MarketStats({ market }: MarketStatsProps) {
	const stats = [
		{
			label: "Liquidity",
			value: market.liquidity,
			sub: "wDAG",
		},
		{
			label: "Volume",
			value: market.volume,
			sub: "wDAG",
		},
		{
			label: "Traders",
			value: market.participants.toString(),
			sub: null,
		},
		{
			label: "Ends in",
			value: market.duration,
			sub: null,
		},
	]

	return (
		<div className="flex flex-col gap-4">
			{stats.map((stat, index) => (
				<div
					key={index}
					className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-[110px]">
					<span className="text-gray-400 text-sm mb-1">{stat.label}</span>
					<p className="text-xl font-bold text-white tracking-wide">
						{stat.value}{" "}
						{stat.sub && <span className="text-base font-normal text-gray-500">{stat.sub}</span>}
					</p>
				</div>
			))}
		</div>
	)
}
