"use client"

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { useMemo } from "react"
import { ChevronDown } from "lucide-react"

const statusCategories = [
	{ id: "trending", label: "Trending" },
	{ id: "ending-soon", label: "Ending Soon" },
	{ id: "high-value", label: "High Value" },
	{ id: "newest", label: "Newest" },
	{ id: "closed", label: "Closed" },
]

const typeCategories = ["All Market", "Crypto", "Entertainment", "Sports", "Politics", "Other"]

interface Props {
	activeStatus: string
	onStatusChange: (status: string) => void
	activeType: string
	onTypeChange: (type: string) => void
}

export default function MarketFilters({ activeStatus, onStatusChange, activeType, onTypeChange }: Props) {
	const orderedTypes = useMemo(() => {
		return [activeType, ...typeCategories.filter((t) => t !== activeType)]
	}, [activeType])

	return (
		<div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center flex-wrap mb-8 md:-mt-8">
			<div className="category-wrapper bg-secondary-light p-2 rounded-lg w-fit">
				{statusCategories.map((c) => (
					<button
						key={c.id}
						className={`px-4 py-2 rounded-lg text-sm transition 
              ${activeStatus === c.id ? "border border-primary text-primary" : ""}`}
						onClick={() => onStatusChange(c.id)}>
						{c.label}
					</button>
				))}
			</div>

			<div className=" bg-secondary-light p-1 rounded-lg pr-2 w-fit">
				<Menu as="div" className="relative inline-block text-left">
					<MenuButton
						className="
              group
              ml-auto 
              flex items-center gap-2
              bg-inherit 
              text-primary-foreground 
              rounded-lg 
              px-4 
              py-2 
              border 
              border-primary 
              outline-none 
              focus:outline-none
            ">
						{activeType}

						<ChevronDown
							className="
                h-4 w-4 
                transition-transform duration-200 
                group-data-[open]:rotate-180
              "
						/>
					</MenuButton>

					<MenuItems
						anchor="bottom"
						className="
              z-50 
              mt-2 
              w-48 
              origin-top-right 
              rounded-lg 
              bg-secondary-light 
              border 
              border-gray-700 
              shadow-lg 
              p-1 
              focus:outline-none
            ">
						{orderedTypes.map((type) => (
							<MenuItem key={type}>
								{({ active }) => (
									<button
										onClick={() => onTypeChange(type)}
										className={`w-full text-left px-3 py-2 rounded-md text-sm transition
                      ${active ? "bg-gray-700 text-white" : "text-primary-foreground"}
                      ${type === activeType ? "font-semibold border border-primary" : ""}
                    `}>
										{type}
									</button>
								)}
							</MenuItem>
						))}
					</MenuItems>
				</Menu>
			</div>
		</div>
	)
}
