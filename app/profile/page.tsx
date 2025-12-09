"use client"

import { TrendingUp, Users, Plus, Bell, DollarSign } from "lucide-react"
import StatCard from "@/components/profile/StatCard"
import ProfileStatsContainer from "@/components/profile/ProfileStatsContainer"

import { currentUser } from "@/data/user"
import { mockActivities, mockLiquidityPositions } from "@/data/markets"
import LiquidityPositionCard from "@/components/profile/LiquidityPositionCard"
import ActivityItem from "@/components/profile/ActivityItem"

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
		<div className="min-h-screen cosmic-gradient px-4">
			{/* Header / Top Bar */}
			<header className="continer mx-auto px-4 pt-6 pb-2">
				<div className="flex items-center justify-end">
					<button className="p-2 text-gray-400 hover:text-white transition-colors relative">
						<Bell className="w-6 h-6" />
						{/* Notification Dot */}
						<span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>
					</button>
				</div>
			</header>

			<main className="container mx-auto pt-4 px-4 pb-20 ">
				<div className="pb-10 md:pb-12 border-b border-primary rounded-b-[40px] md:rounded-b-[60px] mb-12">
					<ProfileStatsContainer>
						{stats.map((stat, index) => (
							<StatCard key={index} {...stat} />
						))}
					</ProfileStatsContainer>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-3 gap-8 px-2">
					<div className="bg-secondary-dark rounded-2xl p-4 sm:p-6 min-h-[300px] col-span-3">
						<h2 className="font-bold text-xl text-primary-foreground mb-2">Liquidity Positions</h2>
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
						) : null}
					</div>

					<div className="p-4 sm:p-6 min-h-[300px] col-span-3 md:col-span-2 lg:col-span-1 bg-secondary-dark rounded-2xl">
						<h2 className="font-bold text-xl text-primary-foreground mb-2">Recent Activities</h2>
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
						) : null}
					</div>
				</div>
			</main>
		</div>
	)
}
