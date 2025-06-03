<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Handle KYC document & selfie upload.
     * Expects multipart/form-data with 'document' and 'selfie' files.
     */
    public function uploadKyc(Request $request)
    {
        $request->validate([
            'document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'selfie'   => 'required|image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $user = Auth::user();

        // Store files
        $docPath    = $request->file('document')->store("kyc/{$user->id}", 'private');
        $selfiePath = $request->file('selfie')->store("kyc/{$user->id}", 'private');

        // Update user record
        $user->kyc_document_path = $docPath;
        $user->kyc_selfie_path   = $selfiePath;
        $user->kyc_status        = 'pending';
        $user->save();

        return response()->json([
            'message' => 'KYC documents uploaded, pending review.',
            'status'  => 'pending'
        ]);
    }
}
