import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { Github, Mail } from 'lucide-react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="grid min-h-dvh md:grid-cols-2">
            {/* Left side - Decorative */}
            <div className="relative hidden md:flex md:flex-col">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNikiLz48L3N2Zz4=')] opacity-40" />
                
                {/* Glow effects */}
                <div className="absolute top-1/4 -left-20 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[150px] animate-pulse" />
                <div className="absolute -right-20 bottom-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[150px] animate-pulse" />

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full p-8">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-0.5">
                            <div className="flex size-full items-center justify-center rounded-[10px] bg-black/80">
                                <AppLogoIcon className="size-5 fill-white" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">{name}</span>
                    </Link>

                    {quote && (
                        <div className="mt-auto">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                                <blockquote className="space-y-4">
                                    <p className="text-lg leading-relaxed text-white/90">&ldquo;{quote.message}&rdquo;</p>
                                    <footer className="flex items-center gap-4">
                                        <div className="h-px flex-1 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                                        <cite className="not-italic text-sm text-white/70">{quote.author}</cite>
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right side - Form */}
            <div className="relative flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-6">
                    {/* Mobile Logo */}
                    <div className="text-center md:hidden">
                        <Link href={route('home')} className="inline-flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-600 p-0.5">
                                <div className="flex size-full items-center justify-center rounded-[10px] bg-black/80">
                                    <AppLogoIcon className="size-5 fill-white" />
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight">{name}</span>
                        </Link>
                    </div>

                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>

                    <div className="[&_input]:mt-2 [&_input]:block [&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-gray-200 [&_input]:bg-white [&_input]:p-3 [&_input]:text-sm [&_input]:outline-none [&_input]:transition-colors dark:[&_input]:border-gray-800 dark:[&_input]:bg-gray-950 [&_input:hover]:bg-gray-50 dark:[&_input:hover]:bg-gray-900/50 [&_input:focus]:border-indigo-500 [&_input:focus]:ring-2 [&_input:focus]:ring-indigo-500/20">
                        {children}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-muted-foreground dark:bg-gray-950">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900">
                            <Github className="size-4" />
                            GitHub
                        </button>
                        <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900">
                            <Mail className="size-4" />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
