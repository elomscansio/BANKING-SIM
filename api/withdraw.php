<?php
require_once 'config.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$recipient = isset($data['recipient']) ? trim($data['recipient']) : '';
$userId = isset($data['user_id']) ? trim($data['user_id']) : '';
$description = isset($data['description']) ? trim($data['description']) : '';
$date = isset($data['date']) ? trim($data['date']) : '';

// Validate data
if (empty($recipient)) {
    jsonResponse(['error' => 'Recipient is required'], 400);
}

if ($amount <= 0) {
    jsonResponse(['error' => 'Invalid amount'], 400);
}

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
        INSERT INTO transactions (user_id, type, amount, recipient, description, date) 
        VALUES (?, 'withdrawal', ?, ?, ?, ?)
    ");
    $stmt->execute([
        $userId,
        $amount,
        $recipient,
        $description,
        $date,
    ]);

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
