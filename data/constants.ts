import { Market } from "@/types/types"

export const TYPE_BADGE_STYLES: Record<Market["type"], string> = {
	Crypto: "bg-green-500/20 text-primary-foreground border border-green-500/40",
	Entertainment: "bg-pink-500/20 text-primary-foreground border border-pink-500/40",
	Sports: "bg-yellow-500/20 text-primary-foreground border border-yellow-500/40",
	Politics: "bg-red-500/20 text-primary-foreground border border-red-500/40",
	Weather: "bg-purple-500/20 text-primary-foreground border border-purple-500/40",
	Other: "bg-blue-500/20 text-primary-foreground border border-blue-500/40",
}

export const statusCategories = [
	{ id: "trending", label: "Trending" },
	{ id: "ending-soon", label: "Ending Soon" },
	{ id: "high-value", label: "High Value" },
	{ id: "newest", label: "Newest" },
	{ id: "closed", label: "Closed" },
]

export const typeCategories = ["All Market", "Crypto", "Entertainment", "Politics", "Sports", "Weather", "Other"]
