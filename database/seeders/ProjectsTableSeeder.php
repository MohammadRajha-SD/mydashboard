<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->truncate();

        DB::table('projects')->insert([
            [
                'customer_id' => Customer::first()->id,
                'title' => 'Website Design',
                'description' => 'Designing a responsive website for the client.',
                'total_amount' => 500.00,
                'status' => 'Pending',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => Customer::first()->id,
                'title' => 'Mobile App Development',
                'description' => 'Developing an Android and iOS application.',
                'total_amount' => 1200.00,
                'status' => 'In Progress',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'customer_id' => Customer::first()->id,
                'title' => 'Digital Marketing Campaign',
                'description' => 'Managing a digital marketing campaign for 3 months.',
                'total_amount' => 800.00,
                'status' => 'Completed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
