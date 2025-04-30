<?php
require_once 'config.php';

// In a real app, you would authenticate the user and get their ID
// For this simulation, we'll use a hardcoded user ID
$userId = 1;

try {
    // Get user's balance
    $stmt = $pdo->prepare("SELECT balance FROM accounts WHERE user_id = ?");
    $stmt->execute([$userId]);
    $account = $stmt->fetch();
    
    if ($account) {
        jsonResponse(['balance' => floatval($account['balance'])]);
    } else {
        jsonResponse(['error' => 'Account not found'], 404);
    }
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 500);
}
?>
