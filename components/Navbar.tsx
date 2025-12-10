// "use client"
// import Link from "next/link"
// import { Button } from "./ui/button"
// import { TrendingUp, Menu, Droplet, Plus, User } from "lucide-react"
// import { useState } from "react"
// // import { ThemeToggle } from "./ThemeToggle"

// export const Navbar = () => {
// 	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

// 	return (
// 		<nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-lg border-none">
// 			<div className="container mx-auto px-4 pt-4">
// 				<div className="flex items-center justify-between h-16">
// 					<Link href={"/"} className="flex items-center gap-2 text-2xl font-bold">
// 						<span className="text-foreground">
// 							<span className="animate-pulse duration-100 ease-in-out">Pulse</span>Delta
// 						</span>
// 					</Link>

// 					{/* Desktop Navigation */}
// 					<div className="hidden md:flex items-center gap-8">
// 						<Link
// 							href={"/markets"}
// 							className="text-base font-normal text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
// 							<TrendingUp className="w-5 h-5" />
// 							Market
// 						</Link>
// 						<Link
// 							href={"/create"}
// 							className="text-base font-normal text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
// 							<Plus className="w-5 h-5" />
// 							Create
// 						</Link>
// 						<Link
// 							href={"/liquidity"}
// 							className="text-base font-normal text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
// 							<Droplet className="w-5 h-5" />
// 							Liquidity
// 						</Link>
// 						<Link
// 							href={"/profile"}
// 							className="text-base font-normal text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
// 							<User className="w-5 h-5" />
// 							Profile
// 						</Link>
// 					</div>

// 					<div className="flex items-center gap-4">
// 						{/* <ThemeToggle /> */}
// 						<Button
// 							variant="default"
// 							className="hidden md:inline-flex font-semibold text-base shadow-md shadow-gray-800 hover:bg-primary-dark transition-colors ease-in-out duration-300">
// 							Connect Wallet
// 						</Button>

// 						{/* Mobile Menu Button */}
// 						<button
// 							className="md:hidden text-foreground"
// 							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
// 							<Menu className="w-6 h-6" />
// 						</button>
// 					</div>
// 				</div>

// 				{/* Mobile Menu */}
// 				{mobileMenuOpen && (
// 					<div className="md:hidden py-4 border-t border-border">
// 						<div className="flex flex-col gap-4">
// 							<Link
// 								href={"/markets"}
// 								className="text-sm text-muted-foreground hover:text-foreground transition-colors">
// 								Market
// 							</Link>
// 							<button className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
// 								Create
// 							</button>
// 							<button className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
// 								Liquidity
// 							</button>
// 							<button className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
// 								Profile
// 							</button>
// 							<Button
// 								variant="default"
// 								className="w-3/4 mx-auto hover:bg-primary-dark transition-colors ease-in-out duration-300">
// 								Connect Wallet
// 							</Button>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</nav>
// 	)
// }

"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { TrendingUp, Menu, Droplet, Plus, User, X } from "lucide-react"
import { useState, useEffect } from "react"

export const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const handleClose = () => setMobileMenuOpen(false)

	useEffect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = "unset"
		}
		return () => {
			document.body.style.overflow = "unset"
		}
	}, [mobileMenuOpen])

	return (
		<nav className="fixed top-0 left-0 right-0 z-50">
			<div className="relative z-[60] bg-black/20 backdrop-blur-lg transition-all duration-200">
				<div className="container mx-auto px-4 pt-4 pb-4">
					<div className="flex items-center justify-between h-12">
						<Link href={"/"} className="flex items-center gap-2 text-2xl font-bold" onClick={handleClose}>
							<span className="text-foreground">
								<span className="animate-pulse duration-100 ease-in-out">Pulse</span>Delta
							</span>
						</Link>

						{/* Desktop Nav */}
						<div className="hidden md:flex items-center gap-8">
							<Link
								href={"/markets"}
								className="text-muted-foreground hover:text-foreground flex gap-1 items-center transition-colors">
								<TrendingUp className="w-5 h-5" /> Market
							</Link>
							<Link
								href={"/create"}
								className="text-muted-foreground hover:text-foreground flex gap-1 items-center transition-colors">
								<Plus className="w-5 h-5" /> Create
							</Link>
							<Link
								href={"/liquidity"}
								className="text-muted-foreground hover:text-foreground flex gap-1 items-center transition-colors">
								<Droplet className="w-5 h-5" /> Liquidity
							</Link>
							<Link
								href={"/profile"}
								className="text-muted-foreground hover:text-foreground flex gap-1 items-center transition-colors">
								<User className="w-5 h-5" /> Profile
							</Link>
						</div>

						<div className="flex items-center gap-4">
							<Button className="hidden md:inline-flex shadow-md shadow-gray-800 hover:bg-primary-dark transition-colors">
								Connect Wallet
							</Button>

							{/* Mobile Toggle Button */}
							<button
								className="md:hidden text-foreground p-2 hover:bg-white/10 rounded-lg transition-colors"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
								{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* 2. Mobile Menu Overlay */}
			{mobileMenuOpen && (
				<div className="fixed inset-0 z-50 md:hidden h-screen w-screen">
					{/* Backdrop: Semi-transparent + Blur (The "Frosted Window" effect) */}
					<div
						className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
						onClick={handleClose}
					/>

					{/* Menu Content Wrapper */}
					<div className="relative z-60 flex flex-col pt-24 px-4 h-full pointer-events-none">
						{/* The Glass Card */}
						{/* bg-black/70 + backdrop-blur-xl creates the deep glass look */}
						<div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl pointer-events-auto animate-in slide-in-from-top-5 duration-300">
							<div className="flex flex-col gap-6">
								<Link
									href="/markets"
									onClick={handleClose}
									className="flex items-center gap-4 text-lg font-medium text-gray-200 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all">
									<div className="p-2 bg-primary/10 rounded-lg text-primary">
										<TrendingUp className="w-5 h-5" />
									</div>
									Market
								</Link>
								<Link
									href="/create"
									onClick={handleClose}
									className="flex items-center gap-4 text-lg font-medium text-gray-200 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all">
									<div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
										<Plus className="w-5 h-5" />
									</div>
									Create
								</Link>
								<Link
									href="/liquidity"
									onClick={handleClose}
									className="flex items-center gap-4 text-lg font-medium text-gray-200 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all">
									<div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
										<Droplet className="w-5 h-5" />
									</div>
									Liquidity
								</Link>
								<Link
									href="/profile"
									onClick={handleClose}
									className="flex items-center gap-4 text-lg font-medium text-gray-200 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all">
									<div className="p-2 bg-green-500/10 rounded-lg text-green-500">
										<User className="w-5 h-5" />
									</div>
									Profile
								</Link>

								<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

								<Button
									onClick={handleClose}
									className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
									Connect Wallet
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	)
}
