/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import MarketFilters from "@/components/MarketFilters"
import MarketGrid from "@/components/MarketGrid"
import MarketSearch from "@/components/MarketSearch"
import { Bell, CircleUserRound, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { markets as dummyMarkets } from "@/data/markets"

const Markets = () => {
	const [status, setStatus] = useState("trending")
	const [type, setType] = useState("All Market")
	const [page, setPage] = useState(1)
	const [loading, setLoading] = useState(true)
	const [imageLoaded, setImageLoaded] = useState(false)
	const [displayed, setDisplayed] = useState([] as typeof dummyMarkets)

	const PAGE_SIZE = 6

	// Filter markets
	const filtered = useMemo(() => {
		return dummyMarkets.filter((item) => {
			const statusMatch = item.status === status
			const typeMatch = type === "All Market" ? true : item.type === type
			return statusMatch && typeMatch
		})
	}, [status, type])

	// Calculate total pages
	const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
	const canGoNext = page < totalPages
	const canGoBack = page > 1

	// Load markets for current page
	useEffect(() => {
		setLoading(true)

		const timeout = setTimeout(() => {
			const startIndex = (page - 1) * PAGE_SIZE
			const endIndex = startIndex + PAGE_SIZE
			setDisplayed(filtered.slice(startIndex, endIndex))
			setLoading(false)
		}, 700)

		return () => clearTimeout(timeout)
	}, [filtered, page])

	// Handle filter changes - reset to page 1
	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus)
		setPage(1) // Reset page when filter changes
	}

	const handleTypeChange = (newType: string) => {
		setType(newType)
		setPage(1)
	}

	const handleNext = () => {
		if (canGoNext) {
			setPage((prev) => prev + 1)
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}

	const handlePrevious = () => {
		if (canGoBack) {
			setPage((prev) => prev - 1)
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}

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
				<div className="relative p-6 mt-8 rounded-xl border border-gradient overflow-hidden w-full hidden md:block h-[180px] sm:h-[260px] md:h-[350px] lg:h-[450px] bg-zinc-900">
					{/* Loading skeleton */}
					{!imageLoaded && (
						<div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
					)}

					<Image
						src="/markets.png"
						alt="banner"
						fill
						className={`object-cover object-center transition-opacity duration-500 ${
							imageLoaded ? "opacity-100" : "opacity-0"
						}`}
						sizes="(max-width: 768px) 0vw, (max-width: 1024px) 100vw, 1200px"
						priority
						quality={85}
						placeholder="blur"
						blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxRjFGMUYiLz48L3N2Zz4="
						onLoad={() => setImageLoaded(true)}
					/>
					<div className="overlay absolute top-0 left-0 w-full h-full bg-black/10" />
				</div>

				{/* Markets */}
				<div className="pt-20 container px-0.5 ">
					<MarketFilters
						activeStatus={status}
						onStatusChange={handleStatusChange}
						activeType={type}
						onTypeChange={handleTypeChange}
					/>
					<MarketGrid markets={displayed} loading={loading} />

					{/* Pagination Controls */}
					<div className="flex flex-col items-center gap-4 mt-10">
						{/* Navigation Buttons */}
						<div className="flex justify-center items-center gap-4">
							{/* Previous Button */}
							<button
								onClick={handlePrevious}
								disabled={!canGoBack || loading}
								className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed">
								<ChevronLeft className="w-4 h-4" />
								Previous
							</button>

							{/* Page Indicator */}
							{!loading && (
								<span className="text-gray-300 text-sm font-medium min-w-[100px] text-center">
									Page {page} of {totalPages}
								</span>
							)}

							{/* Next Button */}
							<button
								onClick={handleNext}
								disabled={!canGoNext || loading}
								className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg text-sm hover:bg-gray-700 transition disabled:opacity-30 disabled:cursor-not-allowed">
								Next
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>

						{/* Results Info */}
						{!loading && (
							<p className="text-gray-500 text-sm">
								Showing {displayed.length} of {filtered.length} markets
							</p>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}

export default Markets
