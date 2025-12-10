"use client"

import { TrendingUp, Users, Bell, DollarSign, Trophy } from "lucide-react"
import StatCard from "@/components/profile/StatCard"
import ProfileStatsContainer from "@/components/profile/ProfileStatsContainer"
import { currentUser } from "@/data/user"

export default function LiquidityPage() {
	const stats = [
		{
			label: "Total Value",
			value: currentUser.totalVolume || "0.000 wDAG",
			icon: <DollarSign className="w-5 h-5" />,
			iconColorClass: "bg-red-500/10 text-red-500",
		},
		{
			label: "Total LP Fee",
			value: currentUser.totalVolume || "0.000 wDAG",
			icon: <Users className="w-5 h-5" />,
			iconColorClass: "bg-indigo-500/10 text-indigo-500",
		},
		{
			label: "Total Rewards",
			value: currentUser.totalVolume || "0.000 wDAG",
			icon: <Trophy className="w-5 h-5" />,
			iconColorClass: "bg-purple-500/10 text-purple-500",
		},
		{
			label: "Average APY",
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

			<main className="container mx-auto px-4 pt-12 pb-20 grid grid-cols-3 gap-y-8"></main>
		</div>
	)
}
