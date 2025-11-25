import { StatCard } from "@/components/StatCard"
import { FeatureCard } from "@/components/FeatureCard"
import { Stars } from "@/components/Stars"
import { Button } from "@/components/ui/button"
import { TrendingUp, Target, Trophy, CircleCheckBig } from "lucide-react"
import { CategoryCard } from "@/components/CategoryCard"
import Image from "next/image"

const Page = () => {
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
							icon={<Target className="w-8 h-8" />}
							title="Choose a Market"
							description="Browse different categories like crypto, sports, entertainment, weather, politics, and more. Each market presents unique real-world events."
						/>
						<FeatureCard
							icon={<TrendingUp className="w-8 h-8" />}
							title="Make Your Prediction"
							description="Place the outcome you believe will happen and place your stake. You participate in prediction markets utilizing blockchain transparency."
						/>
						<FeatureCard
							icon={<Trophy className="w-8 h-8" />}
							title="Win Automatically"
							description="When the event ends, trusted oracles verify the results. If your prediction is correct, rewards are distributed automatically, no manual claims."
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
							<div className="p-4 text-center hover:border hover:border-primary hover:bg-secondary-dark transition-colors duration-300 rounded-lg hover:shadow-primary-light shadow-md">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Accurate Oracles</h3>
								<p className="text-sm text-foreground">Reliable data sources for market resolution.</p>
							</div>
							<div className="p-4 text-center hover:border hover:border-primary hover:bg-secondary-dark transition-colors duration-300 rounded-lg hover:shadow-primary-light shadow-md">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Instant Payouts</h3>
								<p className="text-sm text-foreground">Rewards distributed automatically.</p>
							</div>
							<div className="p-4 text-center hover:border hover:border-primary hover:bg-secondary-dark transition-colors duration-300 rounded-lg hover:shadow-primary-light shadow-md">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
									<CircleCheckBig className="w-6 h-6" />
								</div>
								<h3 className="text-lg font-semibold text-foreground mb-2">Fun & Engaging</h3>
								<p className="text-sm text-foreground">
									Compete, predict, and learn with the community.
								</p>
							</div>
						</div>

						<div className="text-center mt-4">
							<Button size="lg" className="px-8">
								Get Started
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

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
							<CategoryCard iconUrl={"/weather.png"} label="Weather" />
							<CategoryCard iconUrl={"/sports.png"} label="Sport" />
							<CategoryCard iconUrl={"/crypto.png"} label="Crypto" />
							<CategoryCard iconUrl={"/entertainment.png"} label="Entertainment" />
							<CategoryCard iconUrl={"/politics.png"} label="Politics" />
							<CategoryCard iconUrl={"/others.png"} label="Others" />
						</div>
					</div>
				</section>
			</main>

			{/* <Footer /> */}
		</div>
	)
}

export default Page
