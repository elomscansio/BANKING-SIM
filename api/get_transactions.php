<?php
require_once 'config.php';

// In a real app, you would authenticate the user and get their ID
// For this simulation, we'll use a hardcoded user ID
$userId = 1;

try {
    // Get user's transactions, ordered by most recent first
    $stmt = $pdo->prepare("
        SELECT id, type, amount, date, description 
        FROM transactions 
        WHERE user_id = ? 
        ORDER BY date DESC
        LIMIT 10
    ");
    $stmt->execute([$userId]);
    $transactions = $stmt->fetchAll();
    
    // Format the transactions
    $formattedTransactions = array_map(function($transaction) {
        return [
            'id' => intval($transaction['id']),
            'type' => $transaction['type'],
            'amount' => floatval($transaction['amount']),
            'date' => $transaction['date'],
            'description' => $transaction['description']
        ];
    }, $transactions);
    
    jsonResponse($formattedTransactions);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
