<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        // TODO: Replace with actual database query
        $messages = [
            [
                'id' => '1',
                'type' => 'birthday',
                'title' => 'Birthday Wishes',
                'recipients' => 24,
                'status' => 'sent',
                'timestamp' => '2 hours ago',
            ],
            [
                'id' => '2',
                'type' => 'new_month',
                'title' => 'March Blessings',
                'recipients' => 156,
                'status' => 'scheduled',
                'timestamp' => 'Scheduled for Mar 1',
            ],
            [
                'id' => '3',
                'type' => 'custom',
                'title' => 'Prayer Meeting Reminder',
                'recipients' => 85,
                'status' => 'sent',
                'timestamp' => 'Yesterday',
            ],
        ];

        return Inertia::render('messages', [
            'messages' => $messages
        ]);
    }

    public function show(Request $request, $message)
    {
        // TODO: Replace with actual database query
        $messageData = [
            'id' => $message,
            'type' => 'custom',
            'title' => 'Sample Message',
            'content' => 'This is a sample message content.',
            'recipients' => 150,
            'status' => 'sent',
            'timestamp' => '2 hours ago',
            'group' => 'Church Members'
        ];

        $contacts = [
            ['id' => '1', 'name' => 'John Doe', 'phone' => '+1234567890', 'status' => 'delivered'],
            ['id' => '2', 'name' => 'Jane Smith', 'phone' => '+1234567891', 'status' => 'failed'],
        ];

        return Inertia::render('messages/[id]', [
            'message' => $messageData,
            'contacts' => $contacts
        ]);
    }

    public function resend(Request $request, $message)
    {
        // TODO: Implement message resending logic
        return response()->json([
            'message' => 'Message queued for resending'
        ]);
    }

    public function recipients(Request $request, $message)
    {
        // TODO: Fetch message recipients from database
        return response()->json([
            'recipients' => []
        ]);
    }
} 