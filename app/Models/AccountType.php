<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'monthly_price',
        'annual_price',
        'features',
        'is_custom_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'features' => 'array',
        'monthly_price' => 'decimal:2',
        'annual_price' => 'decimal:2',
        'is_custom_price' => 'boolean',
    ];

    /**
     * Get the users that belong to this account type.
     */
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    /**
     * Get the companies that belong to this account type.
     */
    public function companies(): HasMany
    {
        return $this->hasMany(Company::class);
    }

    /**
     * Check if this is an individual plan.
     */
    public function isIndividual(): bool
    {
        return str_contains(strtolower($this->name), 'individual');
    }

    /**
     * Check if this is a business plan.
     */
    public function isBusiness(): bool
    {
        return str_contains(strtolower($this->name), 'business') || $this->slug === 'enterprise';
    }

    /**
     * Check if this is a free plan.
     */
    public function isFree(): bool
    {
        return $this->monthly_price === 0 && $this->annual_price === 0;
    }

    /**
     * Get the formatted monthly price.
     */
    public function getFormattedMonthlyPriceAttribute(): string
    {
        if ($this->is_custom_price) {
            return 'Custom';
        }

        return $this->monthly_price > 0 ? '$' . number_format($this->monthly_price, 2) : 'Free';
    }

    /**
     * Get the formatted annual price.
     */
    public function getFormattedAnnualPriceAttribute(): string
    {
        if ($this->is_custom_price) {
            return 'Custom';
        }

        return $this->annual_price > 0 ? '$' . number_format($this->annual_price, 2) : 'Free';
    }

    /**
     * Get the monthly savings compared to paying monthly for a year.
     */
    public function getMonthlySavingsAttribute(): ?float
    {
        if ($this->is_custom_price || $this->monthly_price === 0 || $this->annual_price === 0) {
            return null;
        }

        return ($this->monthly_price * 12) - $this->annual_price;
    }

    /**
     * Get the savings percentage when paying annually.
     */
    public function getAnnualSavingsPercentageAttribute(): ?float
    {
        if ($this->is_custom_price || $this->monthly_price === 0 || $this->annual_price === 0) {
            return null;
        }

        $yearlyPrice = $this->monthly_price * 12;
        return (($yearlyPrice - $this->annual_price) / $yearlyPrice) * 100;
    }
} 