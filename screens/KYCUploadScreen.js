<?php
// File: backend/database/migrations/2025_05_21_000000_add_kyc_columns_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddKycColumnsToUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('kyc_document_path')->nullable()->after('password');
            $table->string('kyc_selfie_path')->nullable()->after('kyc_document_path');
            $table->string('kyc_status')->default('not_submitted')->after('kyc_selfie_path');
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'kyc_document_path',
                'kyc_selfie_path',
                'kyc_status',
            ]);
        });
    }
}
