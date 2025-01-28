<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\Project;
class PaymentController extends Controller
{
    public function index()
    {
        $customers = Customer::paginate(10);
        return Inertia::render('Customers/Customers', [
            'customers' => $customers,
            'total' => Customer::count(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Customers/CreateCustomer');
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

        Customer::create($validatedData);

        return redirect()->route('customers.index')->with('success', 'Customers created successfully.');
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return inertia('Customers/EditCustomer', ['customer' => $customer]);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
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
        $customer = Customer::findOrFail($id);

        try {
            $customer->delete();
            return redirect()->back()->with('success', 'customer deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete the customer.');
        }
    }
}
