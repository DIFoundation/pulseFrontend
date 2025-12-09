import { Activity, LiquidityPosition, Market } from "@/types/types"

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
					{ id: "5", option: "Option E", percentage: 20 },
					{ id: "6", option: "Option F", percentage: 20 },
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

// Generate mock liquidity positions
export const mockLiquidityPositions: LiquidityPosition[] = [
	{
		id: "1",
		marketId: 1,
		question: "Will $SOL get to $300 before December 1",
		amount: "337.230 wDAG",
		shares: 268,
		status: "active",
		percentEarned: "0.25",
	},
	{
		id: "2",
		marketId: 5,
		question: "Will Aster reach $5 before November 30",
		amount: "38.00 wDAG",
		shares: 308,
		status: "active",
		percentEarned: "0.76",
	},
	{
		id: "3",
		marketId: 12,
		question: "Which cryptocurrency will have the highest market cap in 2024?",
		amount: "364.960 wDAG",
		shares: 277,
		status: "active",
		percentEarned: "2.13",
	},
]

// Generate mock activities
export const mockActivities: Activity[] = [
	{
		id: "1",
		type: "trade",
		description: "Received 200wDAG from will $SOL get......",
		amount: "200wDAG",
		timestamp: "2 mins ago",
		status: "success",
	},
	{
		id: "2",
		type: "trade",
		description: "Which cryptocurrency......",
		amount: "200wDAG",
		timestamp: "5 hrs ago",
		status: "success",
	},
	{
		id: "3",
		type: "trade",
		description: "Will Aster reach $5 before......",
		amount: "50wDAG",
		timestamp: "8 hrs ago",
		status: "failed",
	},
	{
		id: "4",
		type: "create",
		description: "Created market: Bitcoin",
		amount: "",
		timestamp: "1 day ago",
		status: "success",
	},
]
