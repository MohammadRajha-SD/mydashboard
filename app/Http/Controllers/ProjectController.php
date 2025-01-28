<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

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
        return Inertia::render('Projects/CreateProject');
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'required|numeric',
            'country' => 'required|string',
            'city' => 'required|string',
            'dob' => 'nullable|date',
            'address' => 'required',
        ]);

        Project::create($validatedData);

        return redirect()->route('customers.index')->with('success', 'Customers created successfully.');
    }

    public function edit($id)
    {
        $customer = Project::findOrFail($id);
        return inertia('Customers/EditCustomer', ['customer' => $customer]);
    }

    public function update(Request $request, $id)
    {
        $customer = Project::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'phone' => 'required|numeric',
            'country' => 'required|string',
            'city' => 'required|string',
            'dob' => 'nullable|date',
            'address' => 'required',
        ]);

        $customer->update($validated);

        return redirect()->route('customers.index')->with('success', 'Customer updated successfully.');
    }

    public function destroy($id)
    {
        $customer = Project::findOrFail($id);

        try {
            $customer->delete();
            return redirect()->back()->with('success', 'customer deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete the customer.');
        }
    }
}
