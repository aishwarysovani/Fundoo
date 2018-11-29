<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @var string $connect
 */
class FundooAccountService 
{
    protected $connect;

    function __construct()
    {
        /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
       

    }

    /**
     * @method getRegisterValue() add the registration details
     * @return void
     */
    public function getRegisterValue($name,$email,$password,$number)
    {
        try {
            $token = md5($email);

            $sql = "INSERT INTO register (uname, email, pswd, num,token) VALUES ('$name', '$email', '$password', '$number','$token')";
            // use exec() because no results are returned
            $res = $this->connect->exec($sql);
            $ref = new MailClass();

            $ref->sendmail1($name, $email, $token);
            json_encode($res);
            echo "New record created successfully";
            $connect = null;
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}