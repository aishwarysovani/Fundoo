<?php
require_once "/var/www/html/codeigniter/application/controllers/FundooLabelController.php";
include "/var/www/html/codeigniter/application/tests/controllers/TeastCaseConstants.php";
class LabelController_test extends TestCase
{
    /**
     * variable to the constants
     */
    public $constantClassObj = null;
    public function __construct()
    {
        $this->constantClassObj = new TeastCaseConstants();
    }

    public function testCreateLabel()
    {
        $url                  = $this->constantClassObj->labelCreateTestcaseUrl;
        $file                 = $this->constantClassObj->labelCreateTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $email        = $value['email'];
            $label     = $value['label'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "email=$email&label=$label");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }

    public function testDeleteLabel()
    {
        $url                  = $this->constantClassObj->deletedLabelTestcaseUrl;
        $file                 = $this->constantClassObj->deletedLabelTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $deleted        = $value['deleted'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "deleted=$deleted");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }
}
