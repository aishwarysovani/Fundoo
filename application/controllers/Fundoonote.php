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
             * @var string $email,$title,$note,$label,$color
             * @var integer $date,$time
             */
            $email = $_POST['email'];
            $title = $_POST['title'];
            $note = $_POST['note'];
            $date = $_POST['date'];
            $time = $_POST['Time'];
            $color = $_POST['color'];
            $label = $_POST['label'];
            $val = "undefined";

            if ($title == $val || $note == $val) {
                $msg = array("mes" => "not pass value");
            } else {
                $date = str_replace("00:00:00", $time, $date);
                $date = substr($date, 0, 24);
                $sql = "INSERT INTO note (email,title,note,remind_date,color,label) VALUES ('$email','$title', '$note','$date','$color','$label')";
                $res = $this->connect->exec($sql);

            }

            /**
             * $stmt perform query execuction to selection from database
             */
            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL AND archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function allnotes()
    {
        /**
         * fetch header section from from end service
         */
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
            $header = $value;
        }
        /**
         * @var string $token
         */
        $token = $headers['Authorization'];
        $token = substr($token, 7);
        $jwt1 = new JWT();
        $val = $jwt1->verify($token);
        if ($val) {
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST['email'];

            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL AND archive IS NULL or id in(select noteid from collaborator where sharemail='$email')");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }

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
             * @var string $email,$title,$note,$color
             * @var integer $id
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
             * @var string $email,$color
             * @var integer $id
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
            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
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
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET deleted='1' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function changereminder()
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
             * @var integer $id,$date,$time
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $date = $_POST['date'];
            $time = $_POST['time'];
            $val = "undefined";
            if ($date != $val && $time != $val) {
                $date = str_replace("00:00:00", $time, $date);
                $date = substr($date, 0, 24);
                $result = array();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach ($result as $arr) {
                    if ($email == $arr['email']) {

                        $sql = "UPDATE note SET remind_date='$date' WHERE id='$id'";
                        $res = $this->connect->exec($sql);

                    }
                }
            }
            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function deletereminder()
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
             * @var integer $id,$date
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $date = $_POST['date'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET remind_date='undefined' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email'  or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function allreminder()
    {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
            $header = $value;
        }
        /**
         * @var string $token
         */
        $token = $headers['Authorization'];
        $token = substr($token, 7);
        $jwt1 = new JWT();
        $val = $jwt1->verify($token);
        if ($val) {
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST['email'];
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL and remind_date !='undefined'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    public function alldeletednotes()
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
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted='1'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    public function deleteforever()
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
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "DELETE from note WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' AND deleted='1'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function restore()
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
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET deleted=NULL WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' AND deleted='1'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function archive()
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
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET archive='1' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL AND archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function allarchivenotes()
    {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
            $header = $value;
        }
        /**
         * @var string $token
         */
        $token = $headers['Authorization'];
        $token = substr($token, 7);
        $jwt1 = new JWT();
        $val = $jwt1->verify($token);
        if ($val) {
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST['email'];
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND archive='1'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    public function unarchive()
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

                    $sql = "UPDATE note SET archive=NULL WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL AND archive='1'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function addnotelabel()
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
             * @var string $email,$label
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $label = $_POST['label'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET label='$label' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }
            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function deletenotelabel()
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
             * @var string $email,$label
             * @var integer $id
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $label = $_POST['label'];

            $result = array();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $arr) {
                if ($email == $arr['email']) {

                    $sql = "UPDATE note SET label='undefined' WHERE id='$id'";
                    $res = $this->connect->exec($sql);

                }
            }

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);

        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function addcollaborator()
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
             * @var string $email,$sharemail
             * @var integer $id
             */
            $flag = false;
            $email = $_POST['email'];
            $id = $_POST['id'];
            $sharemail = $_POST['sharemail'];
            $token = md5($email);

            if ($sharemail == '') {
                $msg = "not sharemail";
            } else {
                $stmt1 = $this->connect->prepare("SELECT email FROM register");
                $stmt1->execute();
                $res = array();
                $res = $stmt1->fetchAll(PDO::FETCH_ASSOC);
                foreach ($res as $arr1) {
                    if ($sharemail == $arr1['email']) {
                        $flag = true;
                    }
                }

                if ($flag) {
                    $sql1 = "INSERT INTO collaborator (noteid,email,sharemail) values ('$id','$email','$sharemail')";
                    $res = $this->connect->exec($sql1);

                    $ref = new MailClass();
                    $ref->sendmail2($sharemail, $token);
                }
            }

            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' and noteid='$id'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getcollaborator()
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
            $id = $_POST['id'];
            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' and noteid='$id'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        }
    }

    public function deletecollaborator()
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
             * @var string $email,$sharemail
             * @var integer $noteid
             */
            $email = $_POST['email'];
            $noteid = $_POST['noteid'];
            $sharemail = $_POST['sharemail'];

            $sql1 = "DELETE FROM collaborator WHERE noteid='$noteid' AND email='$email' AND sharemail='$sharemail'";
            $res = $this->connect->exec($sql1);

            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' and noteid='$noteid'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function getcollaborator1()
    {
        $headers = apache_request_headers();
        foreach ($headers as $header => $value) {
            $header = $value;
        }
        /**
         * @var string $token
         */
        $token = $headers['Authorization'];
        $token = substr($token, 7);
        $jwt1 = new JWT();
        $val = $jwt1->verify($token);
        if ($val) {
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $email = $_POST['email'];
            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' or sharemail='$email'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        }
    }

    public function addimage()
    {
        try {
            /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            /**
             * @var string $email,$file,$name
             */
            $email = $_POST['email'];
            $id=$_POST['id'];
            $file = $_FILES['file'];
            $name = $_FILES['file']['name'];
            $fileTmpName = $_FILES['file']['tmp_name'];
            //Set location for image
            $newfileloc = '/var/www/html/codeigniter/my-app/src/assets/profile/' . $_FILES['file']['name'];
            $upload = move_uploaded_file($fileTmpName, $newfileloc);

            $sql = "UPDATE note SET image='$name' WHERE email='$email' and id='$id'";
            $res = $this->connect->exec($sql);

            $stmt = $this->connect->prepare("SELECT * From note where email='$email' or id in(select noteid from collaborator where sharemail='$email') and deleted IS NULL and archive IS NULL");
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
