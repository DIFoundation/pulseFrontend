import { StatCard } from "@/components/StatCard"
import { FeatureCard } from "@/components/FeatureCard"
import { Stars } from "@/components/Stars"
import { Button } from "@/components/ui/button"
import { TrendingUp, CircleCheckBig, Sparkles, Telescope, ChevronsRight } from "lucide-react"
import { CategoryCard } from "@/components/CategoryCard"
import Image from "next/image"
import { InfiniteCarousel } from "@/components/InfiniteCarousel"

const Page = () => {
	const categories = [
		{ iconUrl: "/weather.png", label: "Weather" },
		{ iconUrl: "/sports.png", label: "Sport" },
		{ iconUrl: "/crypto.png", label: "Crypto" },
		{ iconUrl: "/entertainment.png", label: "Entertainment" },
		{ iconUrl: "/politics.png", label: "Politics" },
		{ iconUrl: "/others.png", label: "Others" },
	]
	return (
		<div className="min-h-screen cosmic-gradient">
			{/* <Navbar /> */}

			<main className="pt-12">
				{/* Hero Section */}
				<section className="relative w-full py-16 overflow-hidden">
					<Stars />
					<div className="container mx-auto px-4 text-center relative z-20">
						<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
							Predict the Future
						</h1>
						<p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-2xl mx-auto">
							Trade on outcomes of the real-world with transparent, decentralized market. <br />
							Powered by blockchain technology
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-6 max-w-4xl mx-auto mb-16">
							<StatCard value="200" label="Active Traders" />
							<StatCard value="13k+" label="Active Market" />
							<StatCard value="4k+" label="Active Members" />
						</div>
					</div>

					{/* Horizon glow */}
					<div className="blur-xl container mb-0 -mt-10">
						<div className="relative w-full h-[285px] ">
							<Image
								src="/gloww.png"
								alt="gloww"
								fill
								className="object-contain"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
							/>
						</div>
					</div>
				</section>
				{/* Why PulseDelta matters */}
				<section className="container mx-auto px-4 py-16 bg-transparent border-none border-transparent -mt-20">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why PulseDelta Matters</h2>
						<p className="text-muted-foreground">See how PulseDelta gets you from guess to reward.</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
						<FeatureCard
							icon={<TrendingUp className="w-8 h-8" />}
							title="Choose a Market"
							description="Browse different categories like crypto, sports, entertainment, weather, politics, and more. Pick any question you want to predict on."
						/>
						<FeatureCard
							icon={<Telescope className="w-8 h-8" />}
							title="Make Your Prediction"
							description="Elect the outcome you believe will happen and place your stake. Your prediction is locked in instantly and recorded on-chain for transparency."
						/>
						<FeatureCard
							icon={<Sparkles className="w-8 h-8" />}
							title="Win Automatically"
							description="When the event ends, trusted oracles verify the results. If your prediction is correct, your winnings are paid to your wallet instantly—no delays, no manual claims."
						/>
					</div>

					{/* Why PulseDelta Matters - B */}
					<div className="bg-inherit">
						<div className="text-center my-12 pt-8">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
								Why PulseDelta Matters
							</h2>
							<p className="text-foreground">Turning everyday questions into earning opportunities.</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
							<div className="px-6 py-3 text-center hover:border hover:border-primary hover:bg-secondary-dark glow-primary-light rounded-lg">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Accurate Oracles</h3>
								<p className="text-sm text-foreground">Reliable data sources for market resolution.</p>
							</div>
							<div className="px-6 py-3 text-center hover:border hover:border-primary hover:bg-secondary-dark glow-primary-light rounded-lg">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Instant Payouts</h3>
								<p className="text-sm text-foreground">Rewards distributed automatically.</p>
							</div>
							<div className="px-6 py-3 text-center hover:border hover:border-primary hover:bg-secondary-dark glow-primary-light rounded-lg">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Fun & Engaging</h3>
								<p className="text-sm text-foreground">
									Compete, predict, and learn with the community.
								</p>
							</div>
						</div>

						<div className="text-center mt-4">
							<Button
								size="lg"
								className="px-8 hover:border border-secondary-light flex items-center justify-center gap-2 mx-auto">
								Learn more <ChevronsRight className="w-6 h-6 sm:w-5 sm:h-5 transition-colors" />
							</Button>
						</div>
					</div>
				</section>
				{/* Market Categories */}
				<section className="bg-market-spot relative">
					<Stars />
					<div className="container mx-auto px-4 py-16 pb-24">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Market Categories</h2>
							<p className="text-foreground font-thin">Find the right market for your next prediction.</p>
						</div>

						<div className="w-full">
							<InfiniteCarousel speed={40}>
								{categories.map((cat, index) => (
									<li key={index} className="list-none">
										<div className="w-[280px] sm:w-[350px]">
											<CategoryCard iconUrl={cat.iconUrl} label={cat.label} className="" />
										</div>
									</li>
								))}
							</InfiniteCarousel>
						</div>
					</div>
				</section>
			</main>

			{/* <Footer /> */}
		</div>
	)
}

export default Page
