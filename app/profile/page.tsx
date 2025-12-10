"use client"

import { TrendingUp, Users, Plus, Bell, DollarSign } from "lucide-react"
import StatCard from "@/components/profile/StatCard"
import ProfileStatsContainer from "@/components/profile/ProfileStatsContainer"
import LiquidityPositionCard from "@/components/profile/LiquidityPositionCard"
import ActivityItem from "@/components/profile/ActivityItem"

import { currentUser } from "@/data/user"
import { mockActivities, mockLiquidityPositions } from "@/data/markets"

export default function ProfilePage() {
	const stats = [
		{
			label: "Total Volume",
			value: currentUser.totalVolume || "0.000 wDAG",
			icon: <DollarSign className="w-5 h-5" />,
			iconColorClass: "bg-red-500/10 text-red-500",
		},
		{
			label: "Market Traded",
			value: currentUser.marketsTraded.toString() || "0.000 wDAG",
			icon: <Users className="w-5 h-5" />,
			iconColorClass: "bg-indigo-500/10 text-indigo-500",
		},
		{
			label: "Market Created",
			value: currentUser.marketsCreated.toString() || "0.000 wDAG",
			icon: <Plus className="w-5 h-5" />,
			iconColorClass: "bg-purple-500/10 text-purple-500",
		},
		{
			label: "LP Value",
			value: currentUser.lpValue || "0.000 wDAG",
			icon: <TrendingUp className="w-5 h-5" />,
			iconColorClass: "bg-yellow-500/10 text-yellow-500",
		},
	]

	return (
		<div className="min-h-screen cosmic-gradient">
			<div className="w-full pt-14 pb-8 md:pb-10 border-b border-primary rounded-b-[40px] md:rounded-b-[60px] bg-black/20">
				<header className="container mx-auto px-4 pt-8 pb-4">
					<div className="flex items-center justify-end">
						<button className="p-2 text-gray-400 hover:text-white transition-colors relative">
							<Bell className="w-6 h-6" />
							<span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
						</button>
					</div>
				</header>
				<div className="container mx-auto px-4">
					<ProfileStatsContainer>
						{stats.map((stat, index) => (
							<StatCard key={index} {...stat} />
						))}
					</ProfileStatsContainer>
				</div>
			</div>

			<main className="container mx-auto px-4 pt-12 pb-20 grid grid-cols-3 gap-y-8">
				<div className="bg-secondary-dark rounded-2xl p-4 sm:p-6 min-h-[300px] col-span-3">
					<h2 className="font-bold text-xl text-primary-foreground mb-6">Liquidity Positions</h2>
					{mockLiquidityPositions.length > 0 ? (
						<div className="flex flex-col">
							{mockLiquidityPositions.map((position) => (
								<LiquidityPositionCard
									key={position.id}
									marketQuestion={position.question}
									lpTokens={position.shares.toString()}
									value={position.amount}
									feesEarned={`${position.percentEarned} fees earned`}
								/>
							))}
						</div>
					) : (
						<p className="text-gray-500 text-sm">No active positions.</p>
					)}
				</div>

				{/* Recent Activities Section */}
				<div className="bg-secondary-dar rounded-2xl p-4 sm:p-6 min-h-[300px] col-span-3 md:col-span-1">
					<h2 className="font-bold text-xl text-primary-foreground mb-6">Recent Activities</h2>
					{mockActivities.length > 0 ? (
						<div className="flex flex-col pt-2">
							{mockActivities.map((activity, index) => (
								<ActivityItem
									key={activity.id}
									type={activity.type}
									title={activity.description}
									amount={activity.amount}
									time={activity.timestamp}
									status={activity.status === "success" ? "Successful" : "Failed"}
									isLast={index === mockActivities.length - 1}
								/>
							))}
						</div>
					) : (
						<p className="text-gray-500 text-sm">No recent activity.</p>
					)}
				</div>
			</main>
		</div>
	)
}
