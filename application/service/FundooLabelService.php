<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include "/var/www/html/codeigniter/application/static/Constant.php";
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @var string $connect
 */
class FundooLabelService
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
     * @method createlabel() function to add new entry to label table
     * @return void
     */
    public function createLabel($email, $label)
    {
        try {
            $empty = "undefined";
            if ($label != $empty) {
                $sql = "INSERT INTO label (email,label) VALUES ('$email','$label')";
                $res = $this->connect->exec($sql);
            }

            $stmt = $this->connect->prepare("SELECT * From label where email='$email' and label!='undefined'");
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
     * @method showlabel() function to fetch all labels from table
     * @return void
     */
    public function showLabel($email)
    {
        try {
            /**
             * Query to perfom selection operation from database table
             */
            $stmt = $this->connect->prepare("SELECT * From label where email='$email' and label!='undefined'");
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
     * @method deletelabel() delete label from table
     * @return void
     */
    public function deleteLabel($email, $id)
    {
        try {

            $sql = "DELETE FROM  label  WHERE id='$id'";
            $res = $this->connect->exec($sql);

            $stmt = $this->connect->prepare("SELECT * From label where email='$email' and label!='undefined'");
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
     * @method editlabel() edit label from table
     * @return void
     */
    public function editLabel($email, $id, $label)
    {
        try {

            $sql = "UPDATE label set label='$label' WHERE id='$id'";
            $res = $this->connect->exec($sql);

            $stmt = $this->connect->prepare("SELECT * From label where email='$email' and label!='undefined'");
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
