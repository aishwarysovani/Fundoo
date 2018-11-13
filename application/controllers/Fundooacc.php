<?php
include "phpmailer/mail.php";
include_once 'jwt.php';
defined('BASEPATH') or exit('No direct script access allowed');
/**
 * @var string $connect
 */
class Fundooacc 
{
    protected $connect;

    public function getRegisterValue()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $name,$email,$password
             * @var integer $number
             */
            $name = $_POST['uname'];
            $email = $_POST['email'];
            $password = $_POST['pswd'];
            $number = $_POST['num'];
            $token = md5($email);
            //echo $name .$email.$password.$number ;
            $sql = "INSERT INTO register (uname, email, pswd, num,token) VALUES ('$name', '$email', '$password', '$number','$token')";
            // use exec() because no results are returned
            $res = $this->connect->exec($sql);
            $ref = new MailClass();
           
            $ref->sendmail1($name, $email,$token);
            json_encode($res);
            echo "New record created successfully";
            $connect = null;
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getLoginValue()
    {
        $flag = false;
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $this->connect->prepare("SELECT email,pswd FROM register");
            $stmt->execute();

            $email = $_POST['loginemail'];
            $password = $_POST['password'];
            $result=array();
            $jwt1=new JWT();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach( $result as $arr){
                if ($email == $arr['email'] && $password == $arr['pswd']) {
                     $jwt = $jwt1->createJwtToken($email);
                     $flag=true;
                }
            }

            if ($flag == true) {
                $msg=array(
                    "message" => "Successful login.",
                    "jwt" => $jwt
                );
                print json_encode($msg);
            } else {
                $msg=array("message" => "Login failed.");
                print json_encode($msg);
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        $this->connect = null;
    }

    public function getforgotValue()
    {
        $flag = false;
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $this->connect->prepare("SELECT uname,email FROM register");
            $stmt->execute();
            $email = $_POST['forgotemail'];
            // set the resulting array to associative
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($email == $result['email']) {
                    $name = $result['uname'];
                    $flag = 1;
                    $ref = new MailClass();
                    $token = md5($email);
                    $query = "UPDATE register SET token='$token' WHERE email='$email'";
                    $statement = $this->connect->prepare($query);
                    $statement->execute();
                    $ref->sendmail($name, $email, $token);
                    break;
                }
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
        $this->connect = null;
    }

    public function getResetValue()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $email,$password
             */
            $email = $_POST['resetemail'];
            $password = $_POST['resetpassword'];
            $token=$_POST['token'];
            $stmt = $this->connect->prepare("SELECT token FROM register");
            $stmt->execute();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($token == $result['token']) {
            //echo $name .$email.$password.$number ;
            $sql = "UPDATE register SET pswd='$password',token=null WHERE email='$email'";
            // use exec() because no results are returned
            $res = $this->connect->exec($sql);
            json_encode($res);
            echo "Record updated successfully";
            $connect = null;
                }
            }
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }


    public function getconformValue()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $token
             */
            $token=$_POST['token1'];
            $status1='1';
            $stmt = $this->connect->prepare("SELECT token FROM register");
            $stmt->execute();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($token == $result['token']) {
            //echo $name .$email.$password.$number ;
            $sql = "UPDATE register SET isSet='$status1',token=null WHERE token='$token'";
            // use exec() because no results are returned
            $res = $this->connect->exec($sql);
            json_encode($res);
            echo "Record updated successfully";
            $connect = null;
                }
            }
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

}
