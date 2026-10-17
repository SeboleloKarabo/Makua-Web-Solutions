<?php
// Makua Web Solutions — Native PHP Quotation Handler for Hostinger
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed. Only POST is accepted.']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON payload received.']);
    exit;
}

// Honeypot spam check
if (!empty($data['_hp'])) {
    echo json_encode([
        'success' => true,
        'reference' => 'MWS-Q-FILTERED',
        'message' => 'Your quotation request has been submitted successfully.'
    ]);
    exit;
}

$fullName = trim($data['fullName'] ?? '');
$businessName = trim($data['businessName'] ?? 'N/A');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$service = trim($data['service'] ?? '');
$package = trim($data['package'] ?? '');
$requirements = trim($data['projectRequirements'] ?? '');
$budget = trim($data['budget'] ?? 'Not specified');
$timeline = trim($data['timeline'] ?? 'Not specified');

// Validation
$errors = [];
if (strlen($fullName) < 2) {
    $errors['fullName'] = 'Full name is required (minimum 2 characters).';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'A valid email address is required.';
}
if (strlen(preg_replace('/\D/', '', $phone)) < 7) {
    $errors['phone'] = 'A valid phone or WhatsApp number is required.';
}
if (empty($service)) {
    $errors['service'] = 'Please select a valid service.';
}
if (empty($package)) {
    $errors['package'] = 'Please select a package or custom quotation.';
}
if (strlen($requirements) < 10) {
    $errors['projectRequirements'] = 'Please describe your project requirements (at least 10 characters).';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Please correct the highlighted form errors.',
        'errors' => $errors
    ]);
    exit;
}

// Generate unique reference
$randomSuffix = rand(1000, 9999);
$refCode = 'MWS-Q-' . date('Y') . '-' . $randomSuffix;
$timestamp = date('c');

$quoteRecord = [
    'reference' => $refCode,
    'createdAt' => $timestamp,
    'fullName' => $fullName,
    'businessName' => $businessName,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'package' => $package,
    'budget' => $budget,
    'timeline' => $timeline,
    'projectRequirements' => $requirements
];

// 1. Save to local JSON file for backup
$storeFile = __DIR__ . '/quotations.json';
try {
    $existing = [];
    if (file_exists($storeFile)) {
        $content = file_get_contents($storeFile);
        $decoded = json_decode($content, true);
        if (is_array($decoded)) {
            $existing = $decoded;
        }
    }
    array_unshift($existing, $quoteRecord);
    file_put_contents($storeFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
} catch (Exception $e) {
    // Non-blocking
}

// 2. Send email via Hostinger native PHP mail()
$to = 'info@makuawebsolutions.co.za';
$subject = "New Quotation Request [$refCode] — $fullName";
$body = "NEW CLIENT QUOTATION REQUEST\n"
      . "----------------------------------------\n"
      . "Reference: $refCode\n"
      . "Date: " . date('Y-m-d H:i:s') . "\n\n"
      . "CLIENT DETAILS:\n"
      . "- Full Name: $fullName\n"
      . "- Business Name: $businessName\n"
      . "- Email: $email\n"
      . "- Phone/WhatsApp: $phone\n\n"
      . "SERVICE & PACKAGE:\n"
      . "- Service: $service\n"
      . "- Package: $package\n"
      . "- Estimated Budget: $budget\n"
      . "- Project Timeline: $timeline\n\n"
      . "PROJECT REQUIREMENTS:\n"
      . "$requirements\n\n"
      . "PAYMENT TERMS:\n"
      . "50% deposit before work starts and 50% on completion.\n"
      . "----------------------------------------\n";

$headers = "From: Makua Web Solutions <no-reply@makuawebsolutions.co.za>\r\n"
         . "Reply-To: $email\r\n"
         . "X-Mailer: PHP/" . phpversion();

@mail($to, $subject, $body, $headers);

http_response_code(200);
echo json_encode([
    'success' => true,
    'reference' => $refCode,
    'message' => 'Your quotation request has been submitted successfully!',
    'data' => [
        'reference' => $refCode,
        'fullName' => $fullName,
        'service' => $service,
        'package' => $package,
        'phone' => $phone
    ]
]);
