<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\Project; //

class PaymentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $projects = Project::all();

        foreach ($projects as $project) {
            // Generate a random number of payments for each project
            $totalPayments = rand(1, 5);

            for ($i = 0; $i < $totalPayments; $i++) {
                DB::table('payments')->insert([
                    'project_id' => $project->id,
                    'amount' => $faker->randomFloat(2, 10, 500), // Random amount between $10.00 and $500.00
                    'payment_date' => $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
                    'note' => $faker->optional()->sentence(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
