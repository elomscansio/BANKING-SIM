<?php
require_once 'config.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$recipient = isset($data['recipient']) ? trim($data['recipient']) : '';
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;

// Validate data
if (empty($recipient)) {
    jsonResponse(['error' => 'Recipient is required'], 400);
}

if ($amount <= 0) {
    jsonResponse(['error' => 'Invalid amount'], 400);
}

// In a real app, you would authenticate the user and get their ID
// For this simulation, we'll use a hardcoded user ID
$userId = 1;

try {
    // Start transaction
    $pdo->beginTransaction();
    
    // Check if user has sufficient balance
    $stmt = $pdo->prepare("SELECT balance FROM accounts WHERE user_id = ?");
    $stmt->execute([$userId]);
    $account = $stmt->fetch();
    
    if (!$account) {
        throw new Exception('Account not found');
    }
    
    if (floatval($account['balance']) < $amount) {
        throw new Exception('Insufficient balance');
    }
    
    // Update account balance
    $stmt = $pdo->prepare("
        UPDATE accounts 
        SET balance = balance - ? 
        WHERE user_id = ?
    ");
    $stmt->execute([$amount, $userId]);
    
    // Add transaction record
    $stmt = $pdo->prepare("
        INSERT INTO transactions (user_id, type, amount, date, description) 
        VALUES (?, 'withdrawal', ?, NOW(), ?)
    ");
    $stmt->execute([$userId, $amount, "Payment to $recipient"]);
    
    // Get updated balance
    $stmt = $pdo->prepare("SELECT balance FROM accounts WHERE user_id = ?");
    $stmt->execute([$userId]);
    $account = $stmt->fetch();
    
    // Commit transaction
    $pdo->commit();
    
    jsonResponse([
        'success' => true,
        'message' => 'Payment successful',
        'balance' => floatval($account['balance'])
    ]);
} catch (Exception $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    jsonResponse(['error' => $e->getMessage()], 500);
}
?>
