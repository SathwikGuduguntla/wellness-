<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Collect form data
    $name = htmlspecialchars($_POST['patient-name']);
    $email = htmlspecialchars($_POST['patient-email']);
    $phone = htmlspecialchars($_POST['patient-phone']);
    $issues = htmlspecialchars($_POST['patient-issues']);
    $video_call = htmlspecialchars($_POST['video-call']);
    $payment_method = htmlspecialchars($_POST['payment-method']);

    // (Optional) Save the data to a database or send an email
    // Example: save to a database or log file
    $log = "Name: $name\nEmail: $email\nPhone: $phone\nIssues: $issues\nVideo Call: $video_call\nPayment Method: $payment_method\n\n";
    file_put_contents('appointments.log', $log, FILE_APPEND);

    // Redirect to a confirmation page (e.g., dash.html)
    header('Location: dash.html');
    exit;
} else {
    // If not a POST request, return a 405 error
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
