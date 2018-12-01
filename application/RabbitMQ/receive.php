<?php
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

include_once "/var/www/html/codeigniter/application/static/EmailConstant.php";
class Receiver
{
    public function receiverMail()
    {

        $data = new EmailConstantE();
        $connection = new AMQPStreamConnection($data->host, $data->port, $data->hHost, $data->hPassword);
        $channel = $connection->channel();

        $channel->queue_declare('hello', false, false, false, false);

// echo "\nReceiving the Message ....\n";

// echo "[*] Waiting for messages. To exit press CTRL+C\n";

        $callback = function ($msg) {

// echo " * Message received", "\n";
            $data = json_decode($msg->body, true);

            $from = $data['from'];
            $from_email = $data['from_email'];
            $to_email = $data['to_email'];
            $subject = $data['subject'];
            $message = $data['message'];

/**
 * Create the Transport
 */
            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 587, 'tls'))
                ->setUsername('aishsovani1234@gmail.com')
                ->setPassword('aish@1234');
/**
 * Create the Mailer using your created Transport
 */
            $mailer = new Swift_Mailer($transport);

/**
 * Create a message
 */
            $message = (new Swift_Message($subject))
                ->setFrom([$data['from'] => 'Aishwarya'])
                ->setTo([$to_email])
                ->setBody($message);
/**
 * Send the message
 */
            $result = $mailer->send($message);

            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };

        $channel->basic_consume($queue_name, '', false, true, false, false, $callback);

        while (count($channel->callbacks)) {
            $channel->wait();
        }
// $channel->basic_qos(null, 1, null);
        // $channel->close();
        // $connection->close();
        // $channel->basic_qos(null, 1, null);
        // $channel->basic_consume('hello', '', false, false, false, false, $callback);
    }
}
