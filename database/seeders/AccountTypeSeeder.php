<?php

namespace Database\Seeders;

use App\Models\AccountType;
use Illuminate\Database\Seeder;

class AccountTypeSeeder extends Seeder
{
    public function run(): void
    {
        $accountTypes = [
            [
                'name' => 'Free',
                'slug' => 'free',
                'description' => 'For personal use',
                'monthly_price' => 0,
                'annual_price' => 0,
                'features' => [
                    'Up to 10 contacts',
                    '5 scheduled messages per month',
                    'Email messages only',
                    'Basic templates',
                    'Email support',
                ],
                'is_custom_price' => false,
            ],
            [
                'name' => 'Premium',
                'slug' => 'premium',
                'description' => 'For individuals and families',
                'monthly_price' => 9.99,
                'annual_price' => 99.99,
                'features' => [
                    'Unlimited contacts',
                    '100 scheduled messages per month',
                    'SMS, WhatsApp & email messages',
                    'Group messaging (up to 10 recipients)',
                    'All templates + custom messages',
                    'Priority email support',
                    'Advanced scheduling',
                ],
                'is_custom_price' => false,
            ],
            [
                'name' => 'Business',
                'slug' => 'business',
                'description' => 'For teams and businesses',
                'monthly_price' => 29.99,
                'annual_price' => 299.99,
                'features' => [
                    'Unlimited contacts',
                    'Unlimited scheduled messages',
                    'SMS, WhatsApp & email messages',
                    'Unlimited group messaging',
                    'Custom branding',
                    '24/7 priority support',
                    'Analytics & reporting',
                    'API access',
                ],
                'is_custom_price' => false,
            ],
        ];

        foreach ($accountTypes as $accountType) {
            AccountType::create($accountType);
        }
    }
} 