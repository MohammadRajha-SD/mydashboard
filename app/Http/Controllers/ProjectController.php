<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\Customer;

use function PHPSTORM_META\map;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('customer')->paginate(10);
        return Inertia::render('Projects/Projects', [
            'projects' => $projects,
            'total' => Project::count(),
        ]);
    }

    public function create()
    {
        $customers = Customer::all();

        return Inertia::render('Projects/CreateProject', [
            'customers' => $customers,
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric',
            'status' => 'required',
        ]);

        Project::create($validatedData);

        return redirect()->route('projects.index')->with('success', 'Projects created successfully.');
    }

    public function edit($id)
    {
        $project = Project::findOrFail($id);
        $customers = Customer::all();

        return inertia('Projects/EditProject', ['project' => $project, 'customers' => $customers]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'customer_id' => 'required|exists:customers,id',
            'total_amount' => 'required|numeric',
            'status' => 'required',
        ]);
        
        $project = Project::findOrFail($id);
        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Projects updated successfully.');
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);

        try {
            $project->delete();
            return redirect()->back()->with('success', 'Project deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete the Project.');
        }
    }
}
