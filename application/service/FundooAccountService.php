<?php
include "/var/www/html/codeigniter/application/controllers/phpmailer/mail.php";
include_once '/var/www/html/codeigniter/application/controllers/jwt.php';
include "/var/www/html/codeigniter/application/static/Constant.php";
//include "/var/www/html/codeigniter/application/static/EmailConstant.php";
include "/var/www/html/codeigniter/application/RabbitMQ/send.php";
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @var string $connect
 */
class FundooAccountService
{
    protected $connect;

    public function __construct()
    {
        /**
         * Database conncetion using PDO
         */
        $data = new Constant();
        $this->connect = new PDO("$data->database:host=$data->host;dbname=$data->dbname", "$data->user", "$data->password");
        $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    }

    /**
     * @method getRegisterValue() add the registration details
     * @return void
     */
    public function getRegisterValue($name, $email, $password, $number)
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

    /**
     * @method getLoginValue() check the login values for login to app
     * @return void
     */
    public function getLoginValue($email, $password)
    {
        $flag = false;
        try {
            $stmt = $this->connect->prepare("SELECT email,pswd FROM register");
            $stmt->execute();

            $result = array();
            $jwt1 = new JWT();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email'] && $password == $arr['pswd']) {
                    $jwt = $jwt1->createJwtToken($email);
                    $flag = true;
                }
            }

            if ($flag == true) {
                $msg = array(
                    "message" => "Successful login.",
                    "jwt" => $jwt,
                );
                print json_encode($msg);
            } else {
                $msg = array("message" => "Login failed.");
                print json_encode($msg);
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    /**
     * @method getforgotValue() send the email to reset password
     * @return void
     */
    public function getForgotValue($email)
    {
        $flag = false;
        try {
            $stmt = $this->connect->prepare("SELECT uname,email FROM register");
            $stmt->execute();

            // set the resulting array to associative
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($email == $result['email']) {
                    $name = $result['uname'];
                    $flag = 1;
                    // $ref = new MailClass();
                    $ref=new SendMail();
                    $token = md5($email);
                    $query = "UPDATE register SET token='$token' WHERE email='$email'";
                    $statement = $this->connect->prepare($query);
                    $statement->execute();
                    $subject="Forgot Password Recovery";
                    $body="Click this link to recover your password http://localhost:4200/resetpassword?token=" . $token;
                    $ref->sendEmail($email,$subject,$body);
                    break;
                }
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    }

    /**
     * @method getResetValue() update value for forgot password
     * @return void
     */
    public function getResetValue($email, $password, $token)
    {
        try {
            $stmt = $this->connect->prepare("SELECT token FROM register");
            $stmt->execute();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($token == $result['token']) {

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

    /**
     * @method getconformValue() set token for conform registration
     * @return void
     */
    public function getConformValue($token)
    {
        try {

            $status1 = '1';
            $stmt = $this->connect->prepare("SELECT token FROM register");
            $stmt->execute();
            while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if ($token == $result['token']) {
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

    /**
     * @method addprofile() function to add profile pic to user
     * @return void
     */
    public function addProfile($email, $filePath)
    {
        try {
            
            $stmt = $this->connect->prepare("UPDATE register SET `profilepic` = :filePath where `email`= :email ");

            $stmt->execute(array(
            ':filePath' => $filePath,
            ':email' => $email
            ));
            $stmt = $this->connect->prepare("SELECT profilepic From register where email='$email'");
            $stmt->execute();

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $res = $row['profilepic'];

            $ref=json_encode(base64_encode($res));
            print $ref;
        
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    /**
     * @method showprofile() function to fetch profile pic of currentuser
     * @return void
     */
    public function showProfile($email)
    {
        try {
            $stmt = $this->connect->prepare("SELECT * From register where email='$email'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

}
