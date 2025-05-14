<?php

namespace App\Http\Controllers\Api;

use App\Models\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ContactController extends Controller
{
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'string' ,
            'email'=> 'email|unique:contacts,email',
            'phone'=> 'nullable|string|max:10',
            'message'=> 'string'

        ]);

        $contact = Contact::create($request->all());
        return response()->json(['message' => 'Contact created successfully', 'contact' => $contact]);
    }

}
