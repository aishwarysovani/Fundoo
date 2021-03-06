<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
include "/var/www/html/codeigniter/application/static/EmailConstant.php";


//Load Composer's autoloader
require 'vendor/autoload.php';
class MailClass
{
    public function sendmail($name, $email, $token)
    {
        $mail = new PHPMailer(true);
        $data =new EmailConstant();
        // Passing `true` enables exceptions
        try {
//Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = $data->email; // SMTP username
            $mail->Password = $data->emailPassword; // SMTP password
            $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587; // TCP port to connect to
            //Recipients
            $mail->setFrom($data->email, 'mailer');
            $mail->addAddress($email, $name); // Add a recipient
            define("PROJECT_HOME", "http://localhost:4200/resetpassword");
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Forgot Password Recovery';
            $mail->Body = "<div> Hello <br>" . $name . "
<p>Click this link to recover your password<br>
<a href='" . PROJECT_HOME . "?token=" . $token . "'>"
                . PROJECT_HOME .
                "</a><br></p>Regards,<br> Aishwarya.</div>";

//$mail->Body = 'Reset your password click on this link <b>http://localhost:4200/reset</b>';
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            $msg = array(
                "mes1" => "Message has been sent",
            );
            print json_encode($msg);
//echo 'Message has been sent';
        } catch (Exception $e) {
            $msg = array(
                "mes1" => 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo,
            );
            print json_encode($msg);
//echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }

    public function sendmail1($name, $email, $token)
    {
        $data =new EmailConstant();
        $mail = new PHPMailer(true); // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = $data->email; // SMTP username
            $mail->Password = $data->emailPassword; // SMTP password
            $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587; // TCP port to connect to
            //Recipients
            $mail->setFrom($data->email, 'mailer');
            $mail->addAddress($email, $name); // Add a recipient
            define("PROJECT_HOME", "http://localhost:4200/conformregi");
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Conform your registration';
            $mail->Body = "<div> Hello <br>" . $name . "
    <p>Click this link to conform your registration<br>
    <a href='" . PROJECT_HOME . "?token=" . $token . "'>"
                . PROJECT_HOME .
                "</a><br></p>Regards,<br> Aishwarya.</div>";

            //$mail->Body = 'Reset your password click on this link <b>http://localhost:4200/reset</b>';
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            $msg = array(
                "mes1" => "Message has been sent",
            );
            print json_encode($msg);
            //echo 'Message has been sent';
        } catch (Exception $e) {
            $msg = array(
                "mes1" => 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo,
            );
            print json_encode($msg);
            //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }

    public function sendmail2($email, $token)
    {
        $data =new EmailConstant();
        $mail = new PHPMailer(true); // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = 'smtp.gmail.com'; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = $data->email; // SMTP username
            $mail->Password = $data->emailPassword; // SMTP password
            $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = 587; // TCP port to connect to
            //Recipients
            $mail->setFrom($data->email, 'mailer');
            $mail->addAddress($email); // Add a recipient
            define("PROJECT_HOME", "http://localhost:4200/fundoonote");
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Note share with your fundoonote';
            $mail->Body = "<div> Hello <br>" . $email . "
        <p>Click this link to see share note with you<br>
        <a href='" . PROJECT_HOME . "'>"
                . PROJECT_HOME .
                "</a><br></p>Regards,<br> Aishwarya.</div>";

            //$mail->Body = 'Reset your password click on this link <b>http://localhost:4200/reset</b>';
            //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();
            $msg = array(
                "mes1" => "Message has been sent",
            );
            //echo 'Message has been sent';
        } catch (Exception $e) {
            $msg = array(
                "mes1" => 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo,
            );
            // print json_encode($msg);
            //echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        }
    }
}
