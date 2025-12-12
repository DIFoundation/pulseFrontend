import React from "react"

interface InfiniteCarouselProps {
	children: React.ReactNode
	speed?: number
	className?: string
}

export const InfiniteCarousel = ({ children, speed = 40, className = "" }: InfiniteCarouselProps) => {
	return (
		<div
			className={`w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] ${className}`}>
			<ul
				className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll"
				style={{ animationDuration: `${speed}s` }}>
				{children}
			</ul>

			<ul
				className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll"
				aria-hidden="true"
				style={{ animationDuration: `${speed}s` }}>
				{children}
			</ul>
		</div>
	)
}
