<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function show()
    {
        $accountTypes = AccountType::all();
        
        $data = [
            'user' => auth()->user(),
            'accountTypes' => $accountTypes,
            'industries' => [
                'Technology',
                'Healthcare',
                'Education',
                'Finance',
                'Retail',
                'Manufacturing',
                'Non-Profit',
                'Other'
            ],
            'companySizes' => [
                '1-10',
                '11-50',
                '51-200',
                '201-500',
                '501-1000',
                '1000+'
            ]
        ];
        
        return Inertia::render('onboarding', $data);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'accountTypeId' => ['required', 'exists:account_types,id'],
            'isCompany' => ['required', 'boolean'],
            // Company details validation (only required if business account type)
            'companyName' => ['required_if:isCompany,true', 'string', 'max:255'],
            'companyWebsite' => ['nullable', 'url', 'max:255'],
            'companySize' => ['required_if:isCompany,true', 'string', 'max:255'],
            'industry' => ['required_if:isCompany,true', 'string', 'max:255'],
            'companyPhone' => ['required_if:isCompany,true', 'string', 'max:255'],
            'companyAddress' => ['required_if:isCompany,true', 'string', 'max:1000'],
        ]);

        $user = auth()->user();
        $accountType = AccountType::findOrFail($validated['accountTypeId']);
        
        // If it's a company account, create company
        if ($validated['isCompany']) {
            $company = Company::create([
                'name' => $validated['companyName'],
                'website' => $validated['companyWebsite'] ?? null,
                'size' => $validated['companySize'],
                'industry' => $validated['industry'],
                'phone' => $validated['companyPhone'],
                'address' => $validated['companyAddress'],
                'account_type_id' => $accountType->id,
            ]);

            $user->update([
                'company_id' => $company->id,
                'account_type_id' => $accountType->id,
                'is_company_admin' => true,
                'onboarding_completed_at' => now(),
            ]);
        } else {
            $user->update([
                'account_type_id' => $accountType->id,
                'onboarding_completed_at' => now(),
            ]);
        }

        return redirect()->route('dashboard');
    }
} 