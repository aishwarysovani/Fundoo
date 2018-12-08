<?php
require_once "/var/www/html/codeigniter/application/controllers/FundooNoteController.php";
include "/var/www/html/codeigniter/application/tests/controllers/TeastCaseConstants.php";
class NotesController_test extends TestCase
{
    /**
     * variable to the constants
     */
    public $constantClassObj = null;
    public function __construct()
    {
        $this->constantClassObj = new TeastCaseConstants();
    }

    public function testCreateNote()
    {
        $url                  = $this->constantClassObj->noteCreateTestCaseUrl;
        $file                 = $this->constantClassObj->noteCreateTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $title        = $value['title'];
            $note     = $value['note'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "title=$title&note=$note");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }

    public function testDeleteNote()
    {
        $url                  = $this->constantClassObj->noteDeleteTestCaseUrl;
        $file                 = $this->constantClassObj->noteDeleteTestcaseFileName;
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

    public function testArchiveNote()
    {
        $url                  = $this->constantClassObj->noteArchiveTestcaseUrl;
        $file                 = $this->constantClassObj->noteArchiveTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $archive        = $value['archive'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "archive=$archive");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }

    public function testNoteLabel()
    {
        $url                  = $this->constantClassObj->noteLabelTestcaseUrl;
        $file                 = $this->constantClassObj->noteLabelTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $id           =$value['id'];
            $label        = $value['label'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "id=$id&label=$label");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }

    public function testCollaboratedNote()
    {
        $url                  = $this->constantClassObj->collaboratedNoteTestcaseUrl;
        $file                 = $this->constantClassObj->collaboratedNoteTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);
        foreach ($testCaseExampleArray as $key => $value) {
            $id           =$value['id'];
            $email        =$value['email'];
            $sharemail        = $value['sharemail'];
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POSTFIELDS, "id=$id&email=$email&sharemail=$sharemail");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            curl_close($ch);
            $res = json_decode($result);
            $this->assertEquals($value['expected'], $res->message);
        }

    }
}
