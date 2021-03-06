<?php
require_once __DIR__ . '/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
include_once "/var/www/html/codeigniter/application/static/EmailConstant.php";
include "/var/www/html/codeigniter/application/RabbitMQ/receive.php";
class SendMail
{
    /**
     * @method sendEmail()
     * @var connection creates the AMPQSTREAMconnection
     * @return void
     */
    public function sendEmail($toEmail, $subject, $body)
    {

        $data=new EmailConstantE();
        $connection = new AMQPStreamConnection($data->host, $data->port, $data->hHost, $data->hPassword);
        $channel = $connection->channel();
        /*
            name: hello
            passive: false
            durable: true // the queue will survive server restarts
            exclusive: false // the queue can be accessed in other channels
            auto_delete: false //the queue won't be deleted once the channel is closed.
         */

        $channel->queue_declare('hello', false, false, false, false);

        $data = json_encode(array(
            "from" => "aishusovani@gmail.com",
            "from_email" => "aishusovani@gmail.com",
            "to_email" => $toEmail,
            "subject" => $subject,
            "message" => $body
        ));

        $msg = new AMQPMessage($data, array('delivery_mode' => 2));

        $channel->basic_publish($msg, '', 'hello');

        // echo "\n\nMessage Sending.......\n";
        // echo " [x] Sent 'Hello World!'\n";

        /**
         * calling the receiver
         */
        $obj = new Receiver();

        $obj->receiverMail();

        $channel->close();

        $connection->close();

        return '{"status":"200"}';
    }
}
?>