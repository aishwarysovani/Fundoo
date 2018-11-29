<?php
defined('BASEPATH') or exit('No direct script access allowed');

/**
 * @var string $connect
 */
class FundooLabelService
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
     * @method createlabel() function to add new entry to label table
     * @return void
     */
    public function createLabel()
    {
        try {
             /**
             * @var string $email,$label
             */
            $email = $_POST['email'];
            $label = $_POST['label'];
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
    public function showLabel()
    {
        try {
            /**
             * @var string $email
             */
            $email = $_POST['email'];

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
    public function deleteLabel()
    {
        try{
            /**
             * @var string $email
             * @var int $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];

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
    public function editLabel()
    {
        try {
            /**
             * @var string $email,$label
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $label = $_POST['label'];

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
