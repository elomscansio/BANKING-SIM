<?php
require_once 'config.php';

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$sender = isset($data['sender']) ? ($data['sender']) : '';
$userId = isset($data['user_id']) ? ($data['user_id']) : '';
$description = isset($data['description']) ? ($data['description']) : '';
$date = isset($data['date']) ? ($data['date']) : '';

// Validate amount
if ($amount <= 0) {
    jsonResponse(['error' => 'Invalid amount'], 400);
}

try {
    // Start transaction
    $pdo->beginTransaction();

    // Update account balance
    $stmt = $pdo->prepare("
        UPDATE accounts 
        SET balance = balance + ? 
        WHERE user_id = ?
    ");
    $stmt->execute([$amount, $userId]);

    if ($stmt->rowCount() === 0) {
        throw new Exception('Account not found');
    }

    // Add transaction record
    $stmt = $pdo->prepare("
        INSERT INTO transactions (user_id, type, amount, sender, description, date) 
        VALUES (?, 'deposit', ?, ?, ?, ?)
    ");
    $stmt->execute([
        $userId,
        $amount,
        $sender,
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
        'message' => 'Deposit successful',
        'balance' => floatval($account['balance'])
    ]);
} catch (Exception $e) {
    // Rollback transaction on error
    $pdo->rollBack();
    jsonResponse(['error' => $e->getMessage()], 400);
}
