<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require './src/assets/PHPMailer/Exception.php';
require './src/assets/PHPMailer/PHPMailer.php';
require './src/assets/PHPMailer/SMTP.php';

ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ERROR);

header('Content-Type: application/json');



//      Sanitize and Validate Form Inputs
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));



//      Mail Config
$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'contacto.rosario360@gmail.com';
    $mail->Password   = 'whjg otya qlzb ifvr';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('contacto.rosario360@gmail.com', 'Rosario360');
    $mail->addReplyTo($email, $name);


//      Mail Body
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject =    "Mensaje de: $name. $subject";
    $mail->Body    =    "Enviado por: $name, $email<br><br>
                        $message<br><br>
                        Enviado desde tu formulario de contacto en Rosario360.";
    $mail->send();

//      Mail Response
    http_response_code(200);
    echo json_encode(['success' => 'Email sent successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}

?>