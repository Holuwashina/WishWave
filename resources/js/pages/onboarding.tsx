import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, User, Check, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface OnboardingProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    accountTypes: Array<{
        id: number;
        name: string;
        slug: string;
        description: string;
        monthly_price: number | null;
        annual_price: number | null;
        features: string[];
        is_custom_price: boolean;
    }>;
    industries: string[];
    companySizes: string[];
}

export default function Onboarding({ user, accountTypes, industries, companySizes }: OnboardingProps) {
    const [step, setStep] = useState(1);
    const [selectedAccountTypeId, setSelectedAccountTypeId] = useState<number | null>(null);
    const [isCompany, setIsCompany] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({
        companyName: '',
        companyWebsite: '',
        companySize: '',
        industry: '',
        companyPhone: '',
        companyAddress: '',
    });

    // Get individual and company account types - simplified approach 
    // If filtering doesn't work well, fall back to showing all plans
    const individualTypes = accountTypes;
    const businessTypes = accountTypes;
    
    const handleSubmit = () => {
        const data = {
            accountTypeId: selectedAccountTypeId,
            isCompany,
            billingCycle: isAnnual ? 'annual' : 'monthly',
            ...(isCompany ? companyDetails : {})
        };

        router.post('/onboarding', data);
    };

    const isCompanyDetailsValid = () => {
        if (!isCompany) return true;
        
        return (
            companyDetails.companyName &&
            companyDetails.companySize &&
            companyDetails.industry &&
            companyDetails.companyPhone &&
            companyDetails.companyAddress
        );
    };

    const getStepTitle = () => {
        switch (step) {
            case 1:
                return 'Choose your account type';
            case 2:
                return isCompany ? 'Enter company details' : 'Choose your plan';
            case 3:
                return 'Choose your plan';
            default:
                return '';
        }
    };

    // Function to get the price display
    const getPriceDisplay = (type: {
        is_custom_price: boolean;
        monthly_price: number | null;
        annual_price: number | null;
    }) => {
        if (type.is_custom_price) return 'Custom';
        
        const price = isAnnual 
            ? type.annual_price 
            : type.monthly_price;
            
        if (price === 0) return 'Free';
        return `$${price}${isAnnual ? '/year' : '/month'}`;
    };

    // Identify the recommended plan
    const getRecommendedPlan = (types: Array<{id: number; slug: string}>) => {
        return types.find(type => type.slug === 'premium')?.id || null;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Head title="Welcome to WishWave" />
            
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-5xl">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight">Welcome to WishWave</h1>
                        <p className="mt-2 text-muted-foreground">Let's get you set up in just a few steps</p>
                    </div>

                    <div className="mt-8">
                        {/* Progress Steps */}
                        <div className="mb-8">
                            <div className="flex items-center justify-center space-x-4">
                                <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                                    step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                                )}>
                                    1
                                </div>
                                <div className="h-0.5 w-16 bg-muted" />
                                <div className={cn(
                                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                                    step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                                )}>
                                    2
                                </div>
                                {isCompany && (
                                    <>
                                        <div className="h-0.5 w-16 bg-muted" />
                                        <div className={cn(
                                            "flex h-8 w-8 items-center justify-center rounded-full border-2",
                                            step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted"
                                        )}>
                                            3
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>{getStepTitle()}</CardTitle>
                                <CardDescription>
                                    {step === 1 && 'Select how you\'ll be using WishWave'}
                                    {step === 2 && isCompany && 'Tell us about your company'}
                                    {(step === 2 && !isCompany) || (step === 3 && isCompany) && 'Select a plan that best fits your needs'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="grid gap-4 sm:grid-cols-2"
                                    >
                                        <Button
                                            variant={!isCompany ? 'default' : 'outline'}
                                            className="h-auto flex-col gap-4 p-6"
                                            onClick={() => setIsCompany(false)}
                                        >
                                            <User className="size-8" />
                                            <div className="text-lg font-semibold">Individual</div>
                                            <p className="text-sm text-muted-foreground">
                                                Perfect for personal use or solo entrepreneurs
                                            </p>
                                        </Button>
                                        <Button
                                            variant={isCompany ? 'default' : 'outline'}
                                            className="h-auto flex-col gap-4 p-6"
                                            onClick={() => setIsCompany(true)}
                                        >
                                            <Building2 className="size-8" />
                                            <div className="text-lg font-semibold">Company</div>
                                            <p className="text-sm text-muted-foreground">
                                                For businesses and organizations
                                            </p>
                                        </Button>
                                    </motion.div>
                                )}

                                {step === 2 && isCompany && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="relative mx-auto max-w-3xl rounded-xl border border-indigo-100 bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-indigo-950/20 dark:bg-gray-950/50">
                                            <div className="absolute -top-4 -left-4">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md">
                                                    <Building2 className="size-5 text-white" />
                                                </div>
                                            </div>
                                            
                                            <div className="mb-6 space-y-1 text-center">
                                                <h3 className="text-lg font-semibold">Business Details</h3>
                                                <p className="text-sm text-muted-foreground">Tell us about your organization to customize your experience</p>
                                            </div>
                                            
                                            <div className="grid gap-6">
                                                <div className="grid gap-5 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companyName" className="flex items-center">
                                                            Company Name
                                                            <span className="ml-1 text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="companyName"
                                                            placeholder="Acme Inc."
                                                            className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30"
                                                            value={companyDetails.companyName}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                companyName: e.target.value
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companyWebsite">Company Website</Label>
                                                        <Input
                                                            id="companyWebsite"
                                                            type="url"
                                                            placeholder="https://example.com"
                                                            className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30"
                                                            value={companyDetails.companyWebsite}
                                                            onChange={(e) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                companyWebsite: e.target.value
                                                            }))}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="grid gap-5 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="industry" className="flex items-center">
                                                            Industry
                                                            <span className="ml-1 text-red-500">*</span>
                                                        </Label>
                                                        <Select
                                                            value={companyDetails.industry}
                                                            onValueChange={(value) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                industry: value
                                                            }))}
                                                        >
                                                            <SelectTrigger id="industry" className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30">
                                                                <SelectValue placeholder="Select industry" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {industries.map((industry) => (
                                                                    <SelectItem key={industry} value={industry}>
                                                                        {industry}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companySize" className="flex items-center">
                                                            Company Size
                                                            <span className="ml-1 text-red-500">*</span>
                                                        </Label>
                                                        <Select
                                                            value={companyDetails.companySize}
                                                            onValueChange={(value) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                companySize: value
                                                            }))}
                                                        >
                                                            <SelectTrigger id="companySize" className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30">
                                                                <SelectValue placeholder="Select company size" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {companySizes.map((size) => (
                                                                    <SelectItem key={size} value={size}>
                                                                        {size} employees
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid gap-5 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companyPhone" className="flex items-center">
                                                            Company Phone
                                                            <span className="ml-1 text-red-500">*</span>
                                                        </Label>
                                                        <Input
                                                            id="companyPhone"
                                                            type="tel"
                                                            placeholder="+1 (555) 123-4567"
                                                            className="border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30"
                                                            value={companyDetails.companyPhone}
                                                            onChange={(e) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                companyPhone: e.target.value
                                                            }))}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="companyAddress" className="flex items-center">
                                                            Company Address
                                                            <span className="ml-1 text-red-500">*</span>
                                                        </Label>
                                                        <Textarea
                                                            id="companyAddress"
                                                            placeholder="123 Business Ave., Suite 100, City, Country"
                                                            className="min-h-[80px] border-indigo-100 focus-visible:ring-indigo-500 dark:border-indigo-950/30"
                                                            value={companyDetails.companyAddress}
                                                            onChange={(e) => setCompanyDetails(prev => ({
                                                                ...prev,
                                                                companyAddress: e.target.value
                                                            }))}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8 flex items-center justify-center text-sm">
                                                <span className="text-muted-foreground">All fields marked with </span>
                                                <span className="mx-1 text-red-500">*</span>
                                                <span className="text-muted-foreground"> are required</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {((step === 2 && !isCompany) || step === 3) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* Billing cycle toggle */}
                                        <div className="flex items-center justify-center space-x-4">
                                            <span className={cn(
                                                "text-sm font-medium", 
                                                !isAnnual ? "text-primary" : "text-muted-foreground"
                                            )}>
                                                Monthly
                                            </span>
                                            <Switch 
                                                checked={isAnnual} 
                                                onCheckedChange={setIsAnnual} 
                                            />
                                            <div className="flex items-center space-x-1">
                                                <span className={cn(
                                                    "text-sm font-medium", 
                                                    isAnnual ? "text-primary" : "text-muted-foreground"
                                                )}>
                                                    Annual
                                                </span>
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                                                    Save 20%
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 md:grid-cols-3">
                                            {(isCompany ? businessTypes : individualTypes).length === 0 ? (
                                                // Fallback if filtered lists are empty
                                                accountTypes.map((type) => {
                                                    const isPopular = type.slug === 'premium';
                                                    return (
                                                        <div key={type.id} className={cn(
                                                            "relative",
                                                            isPopular && "pt-6"
                                                        )}>
                                                            {isPopular && (
                                                                <div className="absolute -top-3 left-0 right-0 mx-auto w-max z-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white">
                                                                    Most Popular
                                                                </div>
                                                            )}
                                                            <div 
                                                                className={cn(
                                                                    "relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200",
                                                                    isPopular 
                                                                        ? "border-indigo-400/50 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-gray-900" 
                                                                        : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
                                                                    selectedAccountTypeId === type.id
                                                                        ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
                                                                        : "hover:border-primary/50"
                                                                )}
                                                                onClick={() => setSelectedAccountTypeId(type.id)}
                                                            >
                                                                <div className="p-6">
                                                                    <div className="mb-2 flex items-center justify-between">
                                                                        <h3 className="text-lg font-semibold">{type.name}</h3>
                                                                        {selectedAccountTypeId === type.id && (
                                                                            <CheckCircle2 className="size-5 text-primary" />
                                                                        )}
                                                                    </div>
                                                                    <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
                                                                    <div className="mb-4">
                                                                        <span className="text-3xl font-bold">
                                                                            {getPriceDisplay(type)}
                                                                        </span>
                                                                    </div>
                                                                    <div className="grow">
                                                                        <ul className="space-y-3">
                                                                            {type.features.map((feature, index) => (
                                                                                <li key={index} className="flex items-start">
                                                                                    <CheckCircle2 className="mr-2 mt-0.5 size-4 shrink-0 text-primary/70" />
                                                                                    <span className="text-sm">{feature}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-auto p-6 pt-0">
                                                                    <Button
                                                                        variant={selectedAccountTypeId === type.id ? "default" : "outline"}
                                                                        className={cn(
                                                                            "w-full",
                                                                            isPopular && selectedAccountTypeId !== type.id && "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                                                                        )}
                                                                        onClick={() => setSelectedAccountTypeId(type.id)}
                                                                    >
                                                                        {selectedAccountTypeId === type.id ? "Selected" : "Select Plan"}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                // Use filtered lists if they have content
                                                (isCompany ? businessTypes : individualTypes).map((type) => {
                                                    const isPopular = type.slug === 'premium';
                                                    return (
                                                        <div key={type.id} className={cn(
                                                            "relative",
                                                            isPopular && "pt-6"
                                                        )}>
                                                            {isPopular && (
                                                                <div className="absolute -top-3 left-0 right-0 mx-auto w-max z-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-xs font-medium text-white">
                                                                    Most Popular
                                                                </div>
                                                            )}
                                                            <div 
                                                                className={cn(
                                                                    "relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200",
                                                                    isPopular 
                                                                        ? "border-indigo-400/50 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-gray-900" 
                                                                        : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950",
                                                                    selectedAccountTypeId === type.id
                                                                        ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900"
                                                                        : "hover:border-primary/50"
                                                                )}
                                                                onClick={() => setSelectedAccountTypeId(type.id)}
                                                            >
                                                                <div className="p-6">
                                                                    <div className="mb-2 flex items-center justify-between">
                                                                        <h3 className="text-lg font-semibold">{type.name}</h3>
                                                                        {selectedAccountTypeId === type.id && (
                                                                            <CheckCircle2 className="size-5 text-primary" />
                                                                        )}
                                                                    </div>
                                                                    <p className="mb-4 text-sm text-muted-foreground">{type.description}</p>
                                                                    <div className="mb-4">
                                                                        <span className="text-3xl font-bold">
                                                                            {getPriceDisplay(type)}
                                                                        </span>
                                                                    </div>
                                                                    <div className="grow">
                                                                        <ul className="space-y-3">
                                                                            {type.features.map((feature, index) => (
                                                                                <li key={index} className="flex items-start">
                                                                                    <CheckCircle2 className="mr-2 mt-0.5 size-4 shrink-0 text-primary/70" />
                                                                                    <span className="text-sm">{feature}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-auto p-6 pt-0">
                                                                    <Button
                                                                        variant={selectedAccountTypeId === type.id ? "default" : "outline"}
                                                                        className={cn(
                                                                            "w-full",
                                                                            isPopular && selectedAccountTypeId !== type.id && "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                                                                        )}
                                                                        onClick={() => setSelectedAccountTypeId(type.id)}
                                                                    >
                                                                        {selectedAccountTypeId === type.id ? "Selected" : "Select Plan"}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                <div className="mt-6 flex justify-between">
                                    {step > 1 && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setStep(step - 1)}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <div className="flex-1" />
                                    {step === 1 && (
                                        <Button
                                            onClick={() => setStep(2)}
                                        >
                                            Continue
                                        </Button>
                                    )}
                                    {step === 2 && (
                                        <Button
                                            onClick={() => isCompany ? setStep(3) : handleSubmit()}
                                            disabled={isCompany ? !isCompanyDetailsValid() : !selectedAccountTypeId}
                                        >
                                            {isCompany ? 'Continue' : 'Complete Setup'}
                                        </Button>
                                    )}
                                    {step === 3 && (
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={!selectedAccountTypeId}
                                        >
                                            Complete Setup
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
} 