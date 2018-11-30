<?php
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/FundooAccountService.php";
include '/var/www/html/codeigniter/application/vendor/autoload.php';

/**
 * @var string $connect
 */
class FundooAccountController extends \PHPUnit_Framework_TestCase
{
    // protected $connect;
    public $ref;

    public function __construct()
    {

        $this->ref = new FundooAccountService();

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

        $this->ref->getRegisterValue($name, $email, $password, $number);

    }

    /**
     * @method getLoginValue() check the login values for login to app
     * @return void
     */
    public function getLoginValue()
    {
        /**
         * @var string $email,$password
         */
        $email = $_POST['loginemail'];
        $password = $_POST['password'];

        $this->ref->getLoginValue($email, $password);
    }

    /**
     * @method getforgotValue() send the email to reset password
     * @return void
     */
    public function getForgotValue()
    {
        $email = $_POST['forgotemail'];
        
        $this->ref->getForgotValue($email);

    }

    /**
     * @method getResetValue() update value for forgot password
     * @return void
     */
    public function getResetValue()
    {
        /**
         * @var string $email,$password
         */
        $email = $_POST['resetemail'];
        $password = $_POST['resetpassword'];
        $token = $_POST['token'];
        $this->ref->getResetValue($email, $password, $token);

    }

    /**
     * @method getconformValue() set token for conform registration
     * @return void
     */
    public function getConformValue()
    {
        /**
         * @var string $token
         */
        $token = $_POST['token'];
        $this->ref->getConformValue($token);

    }

    /**
     * @method addprofile() function to add profile pic to user
     * @return void
     */
    public function addProfile()
    {
        /**
         * @var string $email,$file,$name
         */
        $email = $_POST['email'];
        $file = $_FILES['file'];
        $name = $_FILES['file']['name'];
        $fileTmpName = $_FILES['file']['tmp_name'];
    
        $this->ref->addProfile($email, $name, $fileTmpName);

    }

    /**
     * @method showprofile() function to fetch profile pic of currentuser
     * @return void
     */
    public function showProfile()
    {
        /**
         * @var string $email
         */
        $email = $_POST['email'];
        $this->ref->showProfile($email);

    }

}
