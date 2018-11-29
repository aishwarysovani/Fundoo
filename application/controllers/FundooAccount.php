<?php
include "phpmailer/mail.php";
include_once 'jwt.php';
include "config/constant.php";
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/FundooAccountService.php";
include '/var/www/html/codeigniter/application/vendor/autoload.php';
/**
 * @var string $connect
 */
class FundooAccount extends \PHPUnit_Framework_TestCase
{
    // protected $connect;
    public $ref;

    function __construct()
    {

        $this->ref=new FundooAccountService();

    }

    /**
     * @method getRegisterValue() add the registration details
     * @return void
     */
    public function getRegisterValue()
    {

            /**
             * @var string $name,$email,$password
             * @var integer $number
             */
            $name = $_POST['uname'];
            $email = $_POST['email'];
            $password = $_POST['pswd'];
            $number = $_POST['num'];

            $this->ref->getRegisterValue($name,$email,$password,$number);
            
    }

     /**
     * @method getLoginValue() check the login values for login to app
     * @return void
     */
    public function getLoginValue()
    {
        $flag = false;
        try {
            $stmt = $this->connect->prepare("SELECT email,pswd FROM register");
            $stmt->execute();

            $email = $_POST['loginemail'];
            //assertEquals($email,'aishsovani1234@gmail.com');

            $password = $_POST['password'];
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
        $this->connect = null;
    }

    /**
     * @method getforgotValue() send the email to reset password
     * @return void
     */
    public function getForgotValue()
    {
        $flag = false;
        try {
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

     /**
     * @method getResetValue() update value for forgot password
     * @return void
     */
    public function getResetValue()
    {
        try {
            /**
             * @var string $email,$password
             */
            $email = $_POST['resetemail'];
            $password = $_POST['resetpassword'];
            $token = $_POST['token'];
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
    public function getConformValue()
    {
        try {
            /**
             * @var string $token
             */
            $token = $_POST['token1'];
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
    public function addProfile()
    {
        try {
            /**
             * @var string $email,$file,$name
             */
            $email = $_POST['email'];
            $file = $_FILES['file'];
            $name = $_FILES['file']['name'];
            $fileTmpName = $_FILES['file']['tmp_name'];
            //Set location for image
            $newfileloc = '/var/www/html/codeigniter/my-app/src/assets/profile/' . $_FILES['file']['name'];
            $upload = move_uploaded_file($fileTmpName, $newfileloc);

            $sql = "UPDATE register SET profilepic='$name' WHERE email='$email'";
            $res = $this->connect->exec($sql);

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

    /**
     * @method showprofile() function to fetch profile pic of currentuser
     * @return void
     */
    public function showProfile()
    {
        try {
            /**
             * @var string $email
             */
            $email = $_POST['email'];

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
