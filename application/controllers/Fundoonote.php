<?php
include "phpmailer/mail.php";
include_once 'jwt.php';

defined('BASEPATH') or exit('No direct script access allowed');
/**
 * @var string $connect
 */
class Fundoonote
{
    protected $connect;

    public function getNoteValue()
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
            $title = $_POST['title'];
            $note = $_POST['note'];
            $date = $_POST['date'];
            $time = $_POST['Time'];
            $color = $_POST['color'];
            $val = "undefined";

           if ($date == $val && $time == $val) {
                $date = "";
                $time = "";
                $sql = "INSERT INTO note (email,title,note,remind_date,color) VALUES ('$email','$title', '$note','$date','$color')";
                $res = $this->connect->exec($sql);

                $stmt = $this->connect->prepare("SELECT * From note where email='$email'");
                $stmt->execute();

                $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $myjson = json_encode($myArray);
                print($myjson);
            } else {
                $date = str_replace("00:00:00", $time, $date);
                $date = substr($date, 0, 24);
                $sql = "INSERT INTO note (email,title,note,remind_date) VALUES ('$email','$title', '$note','$date')";
                $res = $this->connect->exec($sql);

                $stmt = $this->connect->prepare("SELECT * From note where email='$email'");
                $stmt->execute();

                $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $myjson = json_encode($myArray);
                print($myjson);

            }
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function allnotes()
    {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
            $header = $value;
        }
        $token = $headers['Authorization'];
        $token = substr($token, 7);
        $jwt1 = new JWT();
        $val = $jwt1->verify($token);
        if ($val) {
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST['email'];
            $statement = $this->connect->prepare("SELECT * From note where email='$email'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
        // echo "succes";

    }

    public function updatenotes()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();
            /**
             * @var string $email
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $title = $_POST['title'];
            $note = $_POST['note'];
            $color = $_POST['color'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET title='$title',note='$note',color='$color' WHERE id='$id'";
                    $res = $this->connect->exec($sql);
                }
            }

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function changecolor()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();
            /**
             * @var string $email
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $color = $_POST['color'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET color='$color' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }
            $stmt = $this->connect->prepare("SELECT * From note where email='$email'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }


    public function deletenote()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();
            /**
             * @var string $email
             */
            $email = $_POST['email'];
            $id = $_POST['id'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "DELETE FROM note WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                    }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email'");
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
