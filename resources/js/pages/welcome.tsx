import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Bell, Calendar, CheckCircle, ChevronRight, Clock, MessageSquare, Sparkles, Users, ArrowUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useFloatAnimation } from '@/hooks/use-float-animation';
import { useCountUp } from '@/hooks/use-count-up';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const { getFloatingStyle } = useFloatAnimation();
    const observerRef = useRef<HTMLDivElement>(null);
    const { scrollToTop } = useSmoothScroll({ offset: 0 });

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const staggerItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When the sentinel is visible (at top of viewport), navbar is transparent
                setIsScrolled(!entry.isIntersecting);
            },
            { 
                threshold: 0,
                rootMargin: '-5px 0px 0px 0px' // Matches the top-5 position of sentinel
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Head title="WishWave - Personalized Messaging">
                <link rel="dns-prefetch" href="https://fonts.bunny.net" />
                <link rel="preconnect" href="https://fonts.bunny.net" crossOrigin="anonymous" />
                <link href="https://fonts.bunny.net/css?family=outfit:400,500,600,700|plus-jakarta-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            {/* Sentinel div for scroll observation - positioned at scroll trigger point */}
            <div 
                ref={observerRef} 
                className="absolute top-5 h-[1px] w-full pointer-events-none opacity-0" 
                aria-hidden="true"
            />

            {/* Scroll to top button */}
            <AnimatePresence>
                {isScrolled && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 8px 20px -8px rgba(79, 70, 229, 0.5)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="group fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-fuchsia-600 p-0.5 text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/25"
                        aria-label="Scroll to top"
                    >
                        <span className="absolute inset-0.5 rounded-[10px] bg-black/80 transition-opacity group-hover:opacity-0" />
                        <span className="relative flex items-center justify-center">
                            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Gradient background with noise texture */}
            <div className="relative min-h-screen overflow-hidden bg-black text-white">
                {/* Background gradient and dots */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNikiLz48L3N2Zz4=')] opacity-40"></div>

                {/* Glow elements */}
                <div className="absolute top-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[150px]"></div>
                <div className="absolute -right-20 bottom-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[150px]"></div>

                {/* Navbar - glassmorphism effect */}
                <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/70 backdrop-blur-lg' : 'bg-transparent'}`}>
                    <div className="container mx-auto flex h-20 items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-0.5">
                                <div className="flex size-full items-center justify-center rounded-[10px] bg-black/80">
                                    <AppLogoIcon className="size-5 fill-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight">WishWave</span>
                        </div>

                        <nav className="hidden items-center gap-8 md:flex">
                            <a href="#features" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                                Features
                            </a>
                            <a href="#how-it-works" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                                How It Works
                            </a>
                            <a href="#pricing" className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                                Pricing
                            </a>
                        </nav>

                        <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                    className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                    <Link href={route('login')} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                        className="inline-flex h-10 items-center justify-center rounded-lg bg-white/10 px-5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15"
                                >
                                        Sign up
                                </Link>
                            </>
                        )}
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero Section with 3D-like elements */}
                    <section className="relative py-20 md:py-32">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                                className="reveal flex flex-col items-center"
                            >
                                {/* Eyebrow text */}
                                <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                                    <Sparkles className="mr-2 size-4 text-fuchsia-400" />
                                    <span className="text-xs font-medium text-white/80">Never miss another special moment</span>
                                </div>

                                {/* Hero heading */}
                                <h1 className="font-outfit relative z-10 max-w-4xl bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-center text-5xl leading-tight font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl">
                                    Celebrate Life's Moments With Personalized Messages
                                </h1>

                                {/* Description */}
                                <p className="mt-6 max-w-2xl text-center text-lg text-white/70 md:text-xl">
                                    Smart scheduling and beautiful templates to help you send the perfect message at the perfect time—via SMS,
                                    WhatsApp, or email to individuals and groups.
                                </p>

                                {/* CTA buttons */}
                                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                    <Link href={route('register')}>
                                        <Button
                                            size="lg"
                                            className="relative h-12 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 px-8 text-base font-medium text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                                        >
                                            <span className="relative z-10">Get Started Free</span>
                                            <span className="absolute inset-0 flex items-center justify-end pr-4 opacity-60">
                                                <ArrowRight className="size-5" />
                                    </span>
                                        </Button>
                                    </Link>
                                    <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-white/10">
                                        Watch Demo
                                    </button>
                                </div>

                                {/* App mockup */}
                                <div className="relative mt-20 flex w-full max-w-4xl justify-center">
                                    {/* Decoration elements */}
                                    <div className="absolute top-1/4 -left-10 size-20 rounded-full bg-fuchsia-500/30 blur-2xl"></div>
                                    <div className="absolute -right-10 bottom-1/3 size-20 rounded-full bg-indigo-500/30 blur-2xl"></div>

                                    {/* Main mockup - Using embedded CSS design instead of external images */}
                                    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-950/30 to-fuchsia-950/30 p-1 shadow-2xl backdrop-blur-sm">
                                        <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900">
                                            {/* App UI mockup using pure CSS */}
                                            <div className="absolute inset-0 flex flex-col p-6">
                                                {/* App header */}
                                                <div className="mb-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500">
                                                            <MessageSquare className="h-4 w-4 text-white" />
                                                        </div>
                                                        <span className="font-medium text-white">WishWave</span>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Bell className="h-5 w-5 text-white/70" />
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                                                            <span className="text-sm text-white">JD</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* App content */}
                                                <div className="flex h-full gap-6">
                                                    {/* Sidebar */}
                                                    <div className="flex w-64 flex-col rounded-xl bg-slate-800/50 p-4">
                                                        <div className="mb-4">
                                                            <h3 className="mb-3 text-sm font-medium text-white">Dashboard</h3>
                                                            <div className="space-y-2">
                                                                <div className="flex items-center gap-3 rounded-lg bg-indigo-500/20 p-2">
                                                                    <Calendar className="h-4 w-4 text-indigo-400" />
                                                                    <span className="text-sm text-white">Upcoming</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 rounded-lg p-2">
                                                                    <Users className="h-4 w-4 text-white/60" />
                                                                    <span className="text-sm text-white/70">Contacts</span>
                                                                </div>
                                                                <div className="flex items-center gap-3 rounded-lg p-2">
                                                                    <MessageSquare className="h-4 w-4 text-white/60" />
                                                                    <span className="text-sm text-white/70">Templates</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Main content */}
                                                    <div className="flex flex-1 flex-col">
                                                        <h2 className="mb-4 text-lg font-medium text-white">Upcoming Events</h2>

                                                        {/* Events list */}
                                                        <div className="space-y-3">
                                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                                                                        <span className="text-sm text-indigo-300">EM</span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-medium text-white">Emily's Birthday</div>
                                                                        <div className="text-xs text-indigo-300">Tomorrow</div>
                                                                    </div>
                                                                </div>
                                                                <button className="rounded-lg bg-indigo-500 px-3 py-1 text-xs text-white">
                                                                    Send Now
                                                                </button>
                                                            </div>

                                                            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20">
                                                                        <span className="text-sm text-indigo-300">MJ</span>
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-medium text-white">Michael's Anniversary</div>
                                                                        <div className="text-xs text-indigo-300">In 3 days</div>
                                                                    </div>
                                                                </div>
                                                                <button className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white">Edit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating notification element */}
                                        <div className="absolute -top-6 right-10 w-64 rotate-6 transform rounded-xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 md:-top-10 md:right-20">
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/20">
                                                    <Bell className="h-5 w-5 text-indigo-400" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-white">Birthday Reminder</h4>
                                                    <p className="mt-1 text-xs text-white/70">Emily's birthday is tomorrow! Send her a message.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating message element */}
                                        <div className="absolute -bottom-6 -left-4 w-64 -rotate-3 transform rounded-xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md transition-transform duration-500 hover:rotate-0 md:-left-10">
                                            <div className="flex flex-col">
                                                <span className="mb-1 text-xs text-indigo-300">Message Template</span>
                                                <p className="text-sm text-white/90">
                                                    Happy Birthday, Emily! 🎂 Wishing you a fantastic day filled with joy and celebration!
                                                </p>
                                                <div className="mt-2 flex justify-end">
                                                    <span className="text-xs text-indigo-300">Scheduled for tomorrow</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Trusted by section */}
                                <div className="mt-20">
                                    <p className="mb-6 text-center text-sm font-medium tracking-wider text-white/60 uppercase">Trusted by teams at</p>
                                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
                                        {['Google', 'Microsoft', 'Airbnb', 'Uber', 'Spotify'].map((brand) => (
                                            <span key={brand} className="text-lg font-bold tracking-tight text-white/50">
                                                {brand}
                                        </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Animated Metrics Section */}
                                <motion.div 
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={staggerContainer}
                                    className="relative mt-24"
                                >
                                    {/* Animated particles background */}
                                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                        {/* Randomly positioned animated dots and shapes */}
                                        <div className="absolute top-[10%] left-[15%] h-2 w-2 animate-pulse rounded-full bg-indigo-500/30"></div>
                                        <div className="absolute top-[20%] left-[80%] h-3 w-3 animate-pulse rounded-full bg-fuchsia-500/30"></div>
                                        <div className="absolute top-[70%] left-[25%] h-2 w-2 animate-pulse rounded-full bg-indigo-500/30"></div>
                                        <div className="absolute top-[80%] left-[70%] h-2.5 w-2.5 animate-pulse rounded-full bg-fuchsia-500/30"></div>

                                        {/* Floating shapes with different animations */}
                                        <div
                                            style={getFloatingStyle(6, 0)}
                                            className="absolute top-[15%] left-[10%] h-16 w-16 rotate-12 rounded-lg border border-indigo-500/20 opacity-40"
                                        ></div>
                                        <div
                                            style={getFloatingStyle(8, 0.5)}
                                            className="absolute top-[60%] left-[80%] h-12 w-12 rounded-full border border-fuchsia-500/20 opacity-30"
                                        ></div>
                                        <div
                                            style={getFloatingStyle(10, 1)}
                                            className="absolute top-[70%] left-[5%] h-24 w-24 -rotate-12 rounded-xl border border-white/10 opacity-20"
                                        ></div>
                                        <div
                                            style={getFloatingStyle(7, 1.5)}
                                            className="absolute top-[10%] left-[85%] h-20 w-20 rotate-45 rounded-full border border-indigo-500/20 opacity-30"
                                        ></div>
                        </div>

                                    {/* Animated metrics content */}
                                    <div className="mx-auto max-w-5xl">
                                        <motion.div 
                                            className="grid grid-cols-2 gap-8 md:grid-cols-4"
                                            variants={staggerContainer}
                                        >
                                            <motion.div variants={staggerItem}>
                                                <AnimatedMetric
                                                    value={5000}
                                                    label="Active Users"
                                                    icon={<Users className="h-5 w-5 text-indigo-400" />}
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem}>
                                                <AnimatedMetric
                                                    value={125000}
                                                    label="Messages Sent"
                                                    icon={<MessageSquare className="h-5 w-5 text-fuchsia-400" />}
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem}>
                                                <AnimatedMetric
                                                    value={99.8}
                                                    isPercentage={true}
                                                    label="Delivery Rate"
                                                    icon={<CheckCircle className="h-5 w-5 text-indigo-400" />}
                                                />
                                            </motion.div>
                                            <motion.div variants={staggerItem}>
                                                <AnimatedMetric
                                                    value={98}
                                                    isPercentage={true}
                                                    label="User Satisfaction"
                                                    icon={<Sparkles className="h-5 w-5 text-fuchsia-400" />}
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Features section with glassmorphism cards */}
                    <section id="features" className="py-20 md:py-32">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                className="mb-16 text-center transform-3d"
                            >
                                <h2 className="font-outfit bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                                    Features designed for connection
                                </h2>
                                <p className="mt-4 text-white/70">Everything you need to stay in touch with the people who matter most.</p>
                            </motion.div>

                            <motion.div 
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={staggerContainer}
                                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                            >
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<MessageSquare />}
                                        title="Smart Templates"
                                        description="Choose from hundreds of pre-designed templates or create your own personalized messages for any occasion."
                                    />
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<Calendar />}
                                        title="Automated Scheduling"
                                        description="Set up messages to be delivered at the perfect time, days, weeks, or even months in advance."
                                    />
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<Users />}
                                        title="Contact Management"
                                        description="Organize contacts with custom groups, tags, and important dates to never miss a special moment."
                                    />
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<Bell />}
                                        title="Smart Reminders"
                                        description="Get notified about upcoming events so you can personalize your messages ahead of time."
                                    />
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<Clock />}
                                        title="Time Zone Intelligence"
                                        description="Messages are delivered at the appropriate local time, regardless of where your contacts are located."
                                    />
                                </motion.div>
                                <motion.div variants={staggerItem}>
                                    <FeatureCard
                                        icon={<CheckCircle />}
                                        title="Multi-Channel Delivery"
                                        description="Send messages via SMS, WhatsApp, or email to individuals or groups for birthdays, new months, and other occasions."
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </section>

                    {/* How It Works section */}
                    <section id="how-it-works" className="relative overflow-hidden py-20 md:py-32">
                        {/* Background decoration */}
                        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[150px]"></div>

                        <div className="container mx-auto px-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                                className="reveal mb-16 text-center"
                            >
                                <h2 className="font-outfit bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                                    How WishWave Works
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-white/70">Three simple steps to never miss an important moment again</p>
                            </motion.div>

                            <div className="reveal-sequence relative grid gap-12 md:grid-cols-3">
                                {/* Connecting line for desktop */}
                                <div className="absolute top-16 right-[calc(16.67%+1rem)] left-[calc(16.67%+1rem)] hidden h-0.5 bg-gradient-to-r from-indigo-500/40 to-fuchsia-500/40 md:block"></div>

                                {/* Step 1 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-lg"></div>
                                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                                            <span className="font-outfit text-xl font-bold text-white">1</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">Connect Your Contacts</h3>
                                    <p className="mt-3 text-sm text-white/70">
                                        Import or add contacts with important dates like birthdays, anniversaries, and other special occasions.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-lg"></div>
                                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                                            <span className="font-outfit text-xl font-bold text-white">2</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">Personalize Messages</h3>
                                    <p className="mt-3 text-sm text-white/70">
                                        Choose from templates or create custom messages for each occasion. Add personal touches to make them special.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-lg"></div>
                                        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm">
                                            <span className="font-outfit text-xl font-bold text-white">3</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">Schedule & Automate</h3>
                                    <p className="mt-3 text-sm text-white/70">
                                        Set delivery times and WishWave handles the rest. Messages are sent automatically at the perfect moment.
                                    </p>
                                </div>
                            </div>

                            {/* Screenshot mockup */}
                            <div className="mt-20 flex justify-center">
                                <div className="relative w-full max-w-5xl overflow-hidden">
                                    {/* App interface mockup */}
                                    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-1 shadow-xl backdrop-blur-sm">
                                        {/* Dashboard UI */}
                                        <div className="aspect-[16/9] rounded-lg p-6">
                                            {/* Header */}
                                            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-md bg-indigo-600 p-1.5">
                                                        <MessageSquare className="h-5 w-5 text-white" />
                                                    </div>
                                                    <span className="text-lg font-semibold text-white">WishWave</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-full bg-white/5 p-2">
                                                        <Bell className="h-4 w-4 text-white/80" />
                                                    </div>
                                                    <div className="rounded-full bg-white/5 p-2">
                                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                                                            <span className="text-[10px] text-white">JD</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dashboard Content */}
                                            <div className="grid grid-cols-3 gap-4">
                                                {/* Stats cards */}
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                                    <span className="text-xs text-white/60">Upcoming Events</span>
                                                    <div className="mt-2 text-2xl font-bold text-white">12</div>
                                                    <div className="mt-4 flex items-center">
                                                        <div className="h-1 w-2/3 rounded-full bg-indigo-500"></div>
                                                        <div className="h-1 w-1/3 rounded-full bg-white/10"></div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                                    <span className="text-xs text-white/60">Sent Messages</span>
                                                    <div className="mt-2 text-2xl font-bold text-white">48</div>
                                                    <div className="mt-4 flex items-center">
                                                        <div className="h-1 w-4/5 rounded-full bg-fuchsia-500"></div>
                                                        <div className="h-1 w-1/5 rounded-full bg-white/10"></div>
                                                    </div>
                                                </div>

                                                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                                    <span className="text-xs text-white/60">Total Contacts</span>
                                                    <div className="mt-2 text-2xl font-bold text-white">86</div>
                                                    <div className="mt-4 flex items-center">
                                                        <div className="h-1 w-full rounded-full bg-indigo-500"></div>
                                                    </div>
                                                </div>

                                                {/* Calendar */}
                                                <div className="col-span-2 rounded-lg border border-white/10 bg-white/5 p-4">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <span className="font-medium text-white">Upcoming Events</span>
                                                        <div className="flex gap-2">
                                                            <button className="rounded-md bg-white/10 p-1">
                                                                <ChevronRight className="h-4 w-4 rotate-180 text-white" />
                                                            </button>
                                                            <button className="rounded-md bg-white/10 p-1">
                                                                <ChevronRight className="h-4 w-4 text-white" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 grid grid-cols-7 gap-1">
                                                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                                                            <div key={i} className="text-center text-xs text-white/60">
                                                                {day}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="grid grid-cols-7 gap-1">
                                                        {Array(35)
                                                            .fill(0)
                                                            .map((_, i) => {
                                                                const isToday = i === 15;
                                                                const hasEvent = i === 18 || i === 22;
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className={`flex h-7 items-center justify-center rounded-md text-xs ${
                                                                            isToday
                                                                                ? 'bg-indigo-500 text-white'
                                                                                : hasEvent
                                                                                  ? 'text-white ring-1 ring-indigo-500/50'
                                                                                  : 'text-white/60'
                                                                        }`}
                                                                    >
                                                                        {i - 2}
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>

                                                {/* Messages */}
                                                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <span className="font-medium text-white">Recent Messages</span>
                                                        <button className="text-xs text-indigo-400">View All</button>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20">
                                                                <span className="text-[10px] text-indigo-300">JM</span>
                                                            </div>
                                                            <span className="text-xs text-white/80">John • 2h ago</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-fuchsia-500/20">
                                                                <span className="text-[10px] text-fuchsia-300">KL</span>
                                                            </div>
                                                            <span className="text-xs text-white/80">Kate • 5h ago</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating phone mockup */}
                                    <div className="absolute -right-10 -bottom-10 hidden w-56 rotate-6 transform transition-transform duration-500 hover:rotate-0 md:right-0 md:block">
                                        <div className="relative overflow-hidden rounded-3xl border-8 border-slate-950 shadow-xl">
                                            <div className="aspect-[9/16] bg-gradient-to-b from-slate-900 to-black p-3">
                                                {/* Phone notch */}
                                                <div className="absolute inset-x-0 top-0 h-6 rounded-b-xl bg-slate-950"></div>

                                                {/* Phone UI */}
                                                <div className="pt-8">
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-white">WishWave</span>
                                                        <div className="flex items-center gap-2">
                                                            <Bell className="h-3 w-3 text-white/70" />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 rounded-lg border border-white/10 bg-white/5 p-2">
                                                        <div className="mb-1 text-[10px] font-medium text-white">Emily's Birthday</div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[8px] text-indigo-300">Tomorrow</span>
                                                            <button className="rounded bg-indigo-500 px-2 py-0.5 text-[8px] text-white">Send</button>
                                                        </div>
                                                    </div>

                                                    <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                                                        <div className="mb-1 text-[10px] font-medium text-white">Michael's Anniversary</div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[8px] text-indigo-300">In 3 days</span>
                                                            <button className="rounded bg-white/10 px-2 py-0.5 text-[8px] text-white">Edit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Floating tablet element */}
                                    <div className="absolute -bottom-16 -left-10 hidden w-64 -rotate-12 transform transition-transform duration-500 hover:rotate-0 md:-left-20 md:block">
                                        <div className="relative overflow-hidden rounded-2xl border-[10px] border-slate-900 shadow-xl">
                                            <div className="aspect-[4/3] bg-gradient-to-b from-slate-900 to-black p-4">
                                                {/* Tablet UI */}
                                                <div className="mb-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="rounded bg-indigo-600 p-1">
                                                            <MessageSquare className="h-3 w-3 text-white" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-white">WishWave</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <div className="w-1/3 rounded-lg border border-white/10 bg-white/5 p-2">
                                                        <div className="mb-1 text-[8px] text-white/60">Templates</div>
                                                        <div className="space-y-1">
                                                            <div className="h-2 w-2/3 rounded-full bg-white/10"></div>
                                                            <div className="h-2 w-full rounded-full bg-white/10"></div>
                                                            <div className="h-2 w-1/2 rounded-full bg-white/10"></div>
                                                        </div>
                                                    </div>

                                                    <div className="w-2/3 rounded-lg border border-white/10 bg-white/5 p-2">
                                                        <div className="mb-2 text-[10px] font-medium text-white">Birthday Template</div>
                                                        <div className="space-y-1">
                                                            <div className="h-1.5 w-full rounded-full bg-white/10"></div>
                                                            <div className="h-1.5 w-full rounded-full bg-white/10"></div>
                                                            <div className="h-1.5 w-2/3 rounded-full bg-white/10"></div>
                                                        </div>

                                                        <div className="mt-3 flex justify-end">
                                                            <button className="rounded bg-indigo-500 px-2 py-0.5 text-[8px] text-white">
                                                                Use Template
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pricing Section */}
                    <section id="pricing" className="relative py-20 md:py-32">
                        {/* Background decoration */}
                        <div className="absolute top-1/3 -right-40 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[150px]"></div>

                        <div className="container mx-auto px-6">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={fadeInUp}
                                className="reveal mb-16 text-center"
                            >
                                <h2 className="font-outfit bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                                    Simple, Transparent Pricing
                                </h2>
                                <p className="mx-auto mt-4 max-w-2xl text-white/70">Choose the plan that works best for your messaging needs</p>
                            </motion.div>

                            <div className="reveal-sequence grid gap-8 lg:grid-cols-3">
                                {/* Free Plan */}
                                <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/5">
                                    <div className="flex-1 p-8">
                                        <h3 className="font-outfit text-xl font-semibold text-white">Free</h3>
                                        <div className="mt-4 flex items-baseline">
                                            <span className="font-outfit text-4xl font-bold text-white">$0</span>
                                            <span className="ml-2 text-white/60">/month</span>
                                        </div>
                                        <p className="mt-2 text-sm text-white/60">For personal use</p>

                                        <ul className="mt-8 space-y-4">
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Up to 10 contacts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">5 scheduled messages per month</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Email messages only</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Basic templates</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Email support</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-8 pt-0">
                                        <Link href={route('register')}>
                                            <button className="h-11 w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                                                Get Started
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Premium Plan - Highlighted */}
                                <div className="group relative flex flex-col overflow-hidden rounded-xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/50 to-fuchsia-950/30 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
                                    {/* Popular badge */}
                                    <div className="absolute top-4 right-4 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-medium text-white">
                                        Most Popular
                                    </div>
                                    <div className="flex-1 p-8">
                                        <h3 className="font-outfit text-xl font-semibold text-white">Premium</h3>
                                        <div className="mt-4 flex items-baseline">
                                            <span className="font-outfit text-4xl font-bold text-white">$9.99</span>
                                            <span className="ml-2 text-white/60">/month</span>
                                        </div>
                                        <p className="mt-2 text-sm text-white/60">For individuals and families</p>

                                        <ul className="mt-8 space-y-4">
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Unlimited contacts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">100 scheduled messages per month</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">SMS, WhatsApp & email messages</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Group messaging (up to 10 recipients)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">All templates + custom messages</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Priority email support</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Advanced scheduling</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-8 pt-0">
                                        <Link href={route('register')}>
                                            <button className="h-11 w-full rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-600 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40">
                                                Get Started
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Business Plan */}
                                <div className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/5">
                                    <div className="flex-1 p-8">
                                        <h3 className="font-outfit text-xl font-semibold text-white">Business</h3>
                                        <div className="mt-4 flex items-baseline">
                                            <span className="font-outfit text-4xl font-bold text-white">$29.99</span>
                                            <span className="ml-2 text-white/60">/month</span>
                                        </div>
                                        <p className="mt-2 text-sm text-white/60">For teams and businesses</p>

                                        <ul className="mt-8 space-y-4">
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Unlimited contacts</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Unlimited scheduled messages</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">SMS, WhatsApp & email messages</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Unlimited group messaging</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Custom branding</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">24/7 priority support</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">Analytics & reporting</span>
                                            </li>
                                            <li className="flex items-start">
                                                <CheckCircle className="mr-3 size-5 shrink-0 text-indigo-400" />
                                                <span className="text-sm text-white/80">API access</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="p-8 pt-0">
                                        <Link href={route('register')}>
                                            <button className="h-11 w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                                                Contact Sales
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8 }}
                                className="reveal overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-950/50 to-fuchsia-950/50 backdrop-blur-md"
                            >
                                <div className="p-12 md:p-16">
                                    <div className="mx-auto max-w-2xl text-center">
                                        <h2 className="font-outfit text-3xl font-bold tracking-tight text-white md:text-4xl">
                                            Ready to strengthen your connections?
                                        </h2>
                                        <p className="mt-4 text-lg text-white/70">
                                            Join thousands of users who use WishWave to create memorable moments through perfectly timed messages.
                                        </p>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4, duration: 0.6 }}
                                            className="mt-10"
                                        >
                                            <Link href={route('register')}>
                                                <Button
                                                    size="lg"
                                                    className="h-12 rounded-xl bg-white px-8 text-base font-medium text-indigo-950 hover:bg-white/90"
                                                >
                                                    Start your free trial <ChevronRight className="ml-2 size-4" />
                                                </Button>
                                            </Link>
                                            <p className="mt-3 text-xs text-white/60">No credit card required. 14-day free trial.</p>
                                        </motion.div>
                        </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                    </main>

                {/* Footer */}
                <footer className="relative z-10 mt-10 border-t border-white/20 py-16">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-0.5">
                                    <div className="flex size-full items-center justify-center rounded-[6px] bg-black/80">
                                        <AppLogoIcon className="size-5 fill-white" />
                </div>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-white">WishWave</span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-8">
                                <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                                    About
                                </a>
                                <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                                    Features
                                </a>
                                <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                                    Pricing
                                </a>
                                <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                                    Contact
                                </a>
                            </div>

                            <div className="flex flex-col items-end text-sm">
                                <div className="mb-2 text-white/60">&copy; {new Date().getFullYear()} WishWave. All rights reserved.</div>
                                <div className="rounded-md border border-indigo-500/30 bg-gradient-to-r from-indigo-400 to-fuchsia-500 bg-clip-text px-3 py-1 text-base font-medium text-transparent">
                                    Code With Zhine
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <Card className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <CardContent className="relative p-6">
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 text-indigo-400">
                    {icon}
                </div>
                <h3 className="font-outfit mb-2 text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{description}</p>
            </CardContent>
        </Card>
    );
}

function AnimatedMetric({
    value,
    label,
    isPercentage = false,
    icon,
}: {
    value: number;
    label: string;
    isPercentage?: boolean;
    icon: React.ReactNode;
}) {
    const formattedValue = useCountUp({
        end: value,
        duration: 2000,
        formatter: (val) => Math.floor(val).toLocaleString() + (isPercentage ? '%' : '')
    });

    return (
        <div className="group relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:transform hover:border-white/20 hover:bg-white/10">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 opacity-0 blur-lg transition-opacity group-hover:opacity-100"></div>
            <div className="relative flex flex-col items-center text-center">
                <div className="mb-3 rounded-full bg-gradient-to-br from-indigo-600/20 to-fuchsia-600/20 p-2.5">{icon}</div>
                <div className="mb-1 text-3xl font-bold text-white">
                    {formattedValue}
                </div>
                <div className="text-sm text-white/60">{label}</div>
            </div>
        </div>
    );
}
