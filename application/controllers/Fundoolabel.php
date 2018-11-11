<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Fundoolabel
{
    protected $connect;

    public function createlabel()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $email
             */
            $email = $_POST['email'];
            $label=$_POST['label'];
            $empty="undefined";
            if($label!=$empty)
            {
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

    public function showlabel()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $email
             */
            $email = $_POST['email'];

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


?>