"use client"
import MarketFilters from "@/components/MarketFilters"
import MarketGrid from "@/components/MarketGrid"
import MarketSearch from "@/components/MarketSearch"
import { Bell, CircleUserRound } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { markets as dummyMarkets } from "@/data/markets"

const Markets = () => {
	const [status, setStatus] = useState("trending")
	const [type, setType] = useState("All")
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [displayed, setDisplayed] = useState([] as typeof dummyMarkets)

	const PAGE_SIZE = 6

	// Filter first
	const filtered = useMemo(() => {
		return dummyMarkets.filter((item) => {
			const statusMatch = item.status === status

			const typeMatch = type === "All Market" ? true : item.type === type

			return statusMatch && typeMatch
		})
	}, [status, type])

	useEffect(() => {
		Promise.resolve().then(() => {
			setLoading(true)
			setPage(1)
		})

		const timeout = setTimeout(() => {
			setDisplayed(filtered.slice(0, PAGE_SIZE))
			setLoading(false)
		}, 700)

		return () => clearTimeout(timeout)
	}, [filtered])

	// Load more handler
	const loadMore = () => {
		Promise.resolve().then(() => {
			setLoading(true)
		})

		const timeout = setTimeout(() => {
			const nextPage = page + 1
			const nextItems = filtered.slice(0, nextPage * PAGE_SIZE)

			setDisplayed(nextItems)
			setPage(nextPage)
			setLoading(false)
		}, 700)

		return () => clearTimeout(timeout)
	}

	const canLoadMore = displayed.length < filtered.length

	return (
		<div className="min-h-screen cosmic-gradient mb-10">
			<main className="container pt-16 px-4">
				{/* Market search */}
				<div className="flex flex-col sm:flex-row sm:gap-6 mt-14 justify-between items-center w-full">
					<MarketSearch className="w-full sm:w-3/4 bg-transparent" placeholder="Search for markets" />

					<div className="hidden md:flex gap-4 justify-between mt-4 sm:mt-0 ">
						<Bell />
						<CircleUserRound />
					</div>
				</div>

				{/* Banner Image */}
				<div className="relative p-6 mt-8 rounded-xl border border-gradient overflow-hidden w-full hidden md:block h-[180px] sm:h-[260px] md:h-[350px] lg:h-[450px] bg-transparent">
					<Image src="/markets.png" alt="banner" fill className="object-cover object-center" sizes="100vw" />
					<div className="overlay absolute top-0 left-0 w-full h-full bg-black/10" />
				</div>
				{/* Markets */}
				<div className="pt-20 container px-0.5 ">
					<MarketFilters
						activeStatus={status}
						onStatusChange={setStatus}
						activeType={type}
						onTypeChange={setType}
					/>
					<MarketGrid markets={displayed} loading={loading} />

					<div className="flex justify-center mt-10">
						{!loading && canLoadMore ? (
							<button
								onClick={loadMore}
								className="px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-700 transition">
								Load More
							</button>
						) : !loading ? (
							<p className="text-gray-500 text-sm">No more markets to load.</p>
						) : null}
					</div>
				</div>
			</main>
		</div>
	)
}

export default Markets
