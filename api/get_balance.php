<?php
require_once 'config.php';

$userId = isset($_GET['user_id']) ? ($_GET['user_id']) : '';

if (empty($userId)) {
    jsonResponse(['error' => 'User ID is required'], 400);
}

try {
    // Check for user's balance
    $stmt = $pdo->prepare("SELECT balance FROM accounts WHERE user_id = ?");
    $stmt->execute([$userId]);
    $account = $stmt->fetch();

    if (!$account) {
        // Create the account with zero balance
        $stmt = $pdo->prepare("INSERT INTO accounts (user_id, balance) VALUES (?, 0)");
        $stmt->execute([$userId]);

        $account = ['balance' => 0.0];
    }

    jsonResponse(['balance' => floatval($account['balance'])]);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error: ' . $e->getMessage()], 400);
}