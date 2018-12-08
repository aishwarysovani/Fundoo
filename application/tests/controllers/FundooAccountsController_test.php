<?php
require_once "/var/www/html/codeigniter/application/controllers/FundooAccountController.php";
include "/var/www/html/codeigniter/application/tests/controllers/TeastCaseConstants.php";
class FundooAccountsController_test extends TestCase
{
    /**
     * variable to the constants
     */
    public $constantClassObj = null;
    public function __construct()
    {
        $this->constantClassObj = new TeastCaseConstants();
    }


    public function testForgotPasswordforgotPassword()
    {
        $file                 = $this->constantClassObj->forgotTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        $testCaseExampleArray = $testCaseExampleArray[0]['email'];
        foreach ($testCaseExampleArray as $key => $value) {
            $_POST["email"] = $value['email'];
            $ref            = new FundooAccountController();
            $result         = $ref->getForgotValue();
            $res            = $this->assertEquals("404", $result);
        }
    }

    public function testRegistration()
    {
        $url                  = $this->constantClassObj->registrationTestcaseUrl;
        $file                 = $this->constantClassObj->registrationTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $email        = $value['email'];
            $password     = $value['password'];
            $username     = $value['name'];
            $mobilenumber = $value['number'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "username=$username&email=$email&mobilenumber=$mobilenumber&password=$password");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }
    public function testResetPassword()
    {
        $url                  = $this->constantClassObj->resetTestcaseUrl;
        $file                 = $this->constantClassObj->resetTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $password        = $value['password'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "password=$password");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }
    }
    public function testLoginValue()
    {
        $url                  = $this->constantClassObj->loginTestcaseUrl;
        $file                 = $this->constantClassObj->loginTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $email        = $value['email'];
            $password     = $value['password'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "email=$email&password=$password");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }
}