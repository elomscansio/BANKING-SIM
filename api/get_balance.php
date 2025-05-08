<?php
require_once 'config.php';

$userId = isset($_GET['user_id']) ? ($_GET['user_id']) : '';

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
