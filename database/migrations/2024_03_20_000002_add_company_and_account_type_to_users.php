<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('account_type_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('onboarding_completed_at')->nullable();
            $table->boolean('is_company_admin')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropForeign(['account_type_id']);
            $table->dropColumn(['company_id', 'account_type_id', 'onboarding_completed_at', 'is_company_admin']);
        });
    }
}; 