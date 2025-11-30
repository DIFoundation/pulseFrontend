import { Market } from "@/types/types"

export const markets: Market[] = Array.from({ length: 100 }).map((_, idx) => {
	const statuses = ["trending", "ending-soon", "high-value", "newest", "closed"] as const
	const types = ["Crypto", "Entertainment", "Sports", "Politics", "Weather", "Other"] as const
	const marketTypes = ["binary", "multi", "scalar"] as const

	const marketType = marketTypes[Math.floor(Math.random() * marketTypes.length)]
	const outcomes =
		marketType === "multi"
			? [
					{ id: "1", option: "Option A", percentage: 25 },
					{ id: "2", option: "Option B", percentage: 35 },
					{ id: "3", option: "Option C", percentage: 20 },
					{ id: "4", option: "Option D", percentage: 20 },
			  ]
			: undefined

	return {
		id: idx + 1,
		title: "PulseDelta Market",
		status: statuses[Math.floor(Math.random() * statuses.length)],
		type: types[Math.floor(Math.random() * types.length)],
		marketType: marketType,
		question: `Sample market question number ${idx + 1}?`,
		description: `This is a detailed description of market ${idx + 1}. It provides context and rules for traders.`,
		liquidity: `${(Math.random() * 2).toFixed(2)} wDAG`,
		volume: `${(Math.random() * 0.1).toFixed(2)} wDAG`,
		duration: `${Math.floor(Math.random() * 40)}d left`,
		participants: Math.floor(Math.random() * 50),
		outcomes: outcomes,
		createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
		endsAt: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
	}
})
