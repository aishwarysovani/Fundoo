<?php
include "/var/www/html/codeigniter/application/controllers/phpmailer/mail.php";
include_once '/var/www/html/codeigniter/application/controllers/jwt.php';
include "/var/www/html/codeigniter/application/static/Constant.php";

defined('BASEPATH') or exit('No direct script access allowed');
/**
 * @var string $connect
 */
class FundooNoteService
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
     * @method getNoteValue() add note entry to note database
     * @return void
     */
    public function getNoteValue($email, $title, $note, $label, $color, $date, $time)
    {

         try {
            $val = "undefined";

            if ($title == $val || $note == $val) {
                $msg = array("mes" => "not pass value");
            } else {
                $date = str_replace("00:00:00", $time, $date);
                $date = substr($date, 0, 24);
                $sql = "INSERT INTO note (email,title,note,remind_date,color,label) VALUES ('$email','$title', '$note','$date','$color','$label')";
                $res = $this->connect->exec($sql);

                if ($res) {
                    $sql    = "select max(id) as id from note where email = '$email'";
                    $stmt   = $this->connect->prepare($sql);
                    $var    = $stmt->execute();
                    $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
                    $noteid = $noteid['id'];
                    /**
                     * To update ID for Drag and drop.
                     */
                    $sqlquerry         = "UPDATE note set DragAndDropID = $noteid where id = '$noteid'";
                    $statementofQuerry = $this->connect->prepare($sqlquerry);
                    $var               = $statementofQuerry->execute();
        

            }
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

    /**
     * @method allnotes() fetch all notes from database
     * @return void
     */
    public function allNotes($email)
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

            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL AND archive IS NULL order by DragAndDropID DESC ");
            // $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL AND archive IS NULL  or id in(select noteid from collaborator where sharemail='$email')");

            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }

    }

    /**
     * @method updatenotes() update note and title notes from database
     * @return void
     */
    public function updateNotes($email, $id, $title, $note, $color)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method changecolor() change background color of note
     * @return void
     */
    public function changeColor($email, $id, $color)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method deletenote() delete note from note
     * @return void
     */
    public function deleteNote($email, $id)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method changereminder() change reminder of note
     * @return void
     */
    public function changeReminder($email, $id, $date, $time)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method deletereminder() delete reminder of note
     * @return void
     */
    public function deleteReminder($email, $id, $date)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method allreminder()fetch all reminders of all notes
     * @return void
     */
    public function allReminder($email)
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
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted IS NULL and remind_date !='undefined'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    /**
     * @method alldeletednotes()fetch all deleted notes
     * @return void
     */
    public function allDeletedNotes($email)
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
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND deleted='1'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    /**
     * @method deleteforever()deleted note permantly
     * @return void
     */
    public function deleteForever($email, $id)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method restore() restore note
     * @return void
     */
    public function restore($email, $id)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method archive() archive note
     * @return void
     */
    public function archive($email, $id)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method allarchivenotes() fetch all archive note
     * @return void
     */
    public function allArchiveNotes($email)
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
            $statement = $this->connect->prepare("SELECT * From note where email='$email' AND archive='1'");
            if ($statement->execute()) {
                $arr = $statement->fetchAll(PDO::FETCH_ASSOC);

                print json_encode($arr);
            }
        }
    }

    /**
     * @method unarchive() unarchive note with perticular id
     * @return void
     */
    public function unarchive($email, $id)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method addnotelabel() add label to perticular note
     * @return void
     */
    public function addNoteLabel($email, $id, $label)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method deletenotelabel() delete label to perticular note
     * @return void
     */
    public function deleteNoteLabel($email, $id, $label)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method addcollaborator() add collaborator
     * @return void
     */
    public function addCollaborator($flag, $email, $id, $sharemail)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method getcollaborator()fetch all collaborator
     * @return void
     */
    public function getCollaborator($email, $id)
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
            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' and noteid='$id'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        }
    }

    /**
     * @method deletecollaborator()delete collaborator for note
     * @return void
     */
    public function deleteCollaborator($email, $id, $sharemail)
    {
        try {
            $stmt = $this->connect->prepare("SELECT email FROM note");
            $stmt->execute();

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

    /**
     * @method getAllCollaborator()fetch collaboraror from collaborator table
     * @return void
     */
    public function getAllCollaborator($email)
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
            $stmt = $this->connect->prepare("SELECT * From collaborator where email='$email' or sharemail='$email'");
            $stmt->execute();

            $myArray = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $myjson = json_encode($myArray);
            print($myjson);
        }
    }

    /**
     * @method addimage()add image to perticular note
     * @return void
     */
    public function addImage($email, $id, $name,$fileTmpName)
    {
        try {
            $dataD=new Constant();
            $newfileloc = $dataD->fileUploadPath . $name;
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

    public function  DragAndDrop($email,$id,$loop,$direction){

        for ($i = 0; $i < $loop; $i++) {
            /**
             * If direction is upward get the note id which is less than current id
             */
            if ($direction == "upward") {
                $querry = "SELECT max(DragAndDropID) as nextid from note where DragAndDropID < '$id' and email='$email'";
            }
            /**
             * If direction is not upward get the note id which is greater than current id
             */
            else {
                $querry = "SELECT min(DragAndDropID) as nextid from note where DragAndDropID > '$id' and email='$email'";
            }
            $stmt   = $this->connect->prepare($querry);
            $var    = $stmt->execute();
            $noteid = $stmt->fetch(PDO::FETCH_ASSOC);
            $noteid = $noteid['nextid'];
            /**
             * Querry to Swap the notes.
             */
            $querry = "UPDATE note a inner join note b on a.DragAndDropID <> b.DragAndDropID  set
			a.DragAndDropID =b.DragAndDropID  where a.DragAndDropID in('$noteid','$id') and b.DragAndDropID in('$noteid','$id')";
            $stmt = $this->connect->prepare($querry);
            $var  = $stmt->execute();
            /**
             * Swap the id's
             */
            $id = $noteid;
        }
    
    }
}
