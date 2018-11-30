<?php
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/FundooNoteService.php";

class FundooNoteController
{
    public $ref;

    public function __construct()
    {

        $this->ref = new FundooNoteService();

    }

    /**
     * @method getNoteValue() add note entry to note database
     * @return void
     */
    public function getNoteValue()
    {
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
        $this->ref->getNoteValue($email, $title, $note, $label, $color, $date, $time);
    }

    /**
     * @method allnotes() fetch all notes from database
     * @return void
     */
    public function allNotes()
    {
        $email = $_POST['email'];
        $this->ref->allNotes($email);

    }

    /**
     * @method updatenotes() update note and title notes from database
     * @return void
     */
    public function updateNotes()
    {
        /**
         * @var string $email,$title,$note,$color
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $title = $_POST['title'];
        $note = $_POST['note'];
        $color = $_POST['color'];
        $this->ref->updateNotes($email, $id, $title, $note, $color);

    }

    /**
     * @method changecolor() change background color of note
     * @return void
     */
    public function changeColor()
    {
        /**
         * @var string $email,$color
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $color = $_POST['color'];
        $this->ref->changeColor($email, $id, $color);

    }

    /**
     * @method deletenote() delete note from note
     * @return void
     */
    public function deleteNote()
    {
        /**
         * @var string $email
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->deleteNote($email, $id);

    }

    /**
     * @method changereminder() change reminder of note
     * @return void
     */
    public function changeReminder()
    {
        /**
         * @var string $email
         * @var integer $id,$date,$time
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $this->ref->changeReminder($email, $id, $date, $time);

    }

    /**
     * @method deletereminder() delete reminder of note
     * @return void
     */
    public function deleteReminder()
    {
        /**
         * @var string $email
         * @var integer $id,$date
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $date = $_POST['date'];
        $this->ref->deleteReminder($email, $id, $date);

    }

    /**
     * @method allreminder()fetch all reminders of all notes
     * @return void
     */
    public function allReminder()
    {
        $email = $_POST['email'];
        $this->ref->allReminder($email);

    }

    /**
     * @method alldeletednotes()fetch all deleted notes
     * @return void
     */
    public function allDeletedNotes()
    {
        $email = $_POST['email'];
        $this->ref->allDeletedNotes($email);

    }

    /**
     * @method deleteforever()deleted note permantly
     * @return void
     */
    public function deleteForever()
    {
        /**
         * @var string $email
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->deleteForever($email, $id);

    }

    /**
     * @method restore() restore note
     * @return void
     */
    public function restore()
    {
        /**
         * @var string $email
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->restore($email, $id);

    }

    /**
     * @method archive() archive note
     * @return void
     */
    public function archive()
    {
        /**
         * @var string $email
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->archive($email, $id);

    }

    /**
     * @method allarchivenotes() fetch all archive note
     * @return void
     */
    public function allArchiveNotes()
    {

        $email = $_POST['email'];
        $this->ref->allArchiveNotes($email);

    }

    /**
     * @method unarchive() unarchive note with perticular id
     * @return void
     */
    public function unarchive()
    {
        /**
         * @var string $email
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->unarchive($email, $id);

    }

    /**
     * @method addnotelabel() add label to perticular note
     * @return void
     */
    public function addNoteLabel()
    {
        /**
         * @var string $email,$label
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $label = $_POST['label'];
        $this->ref->addNoteLabel($email, $id, $label);

    }

    /**
     * @method deletenotelabel() delete label to perticular note
     * @return void
     */
    public function deleteNoteLabel()
    {
        /**
         * @var string $email,$label
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $label = $_POST['label'];
        $this->ref->deleteNoteLabel($email, $id, $label);

    }

    /**
     * @method addcollaborator() add collaborator
     * @return void
     */
    public function addCollaborator()
    {
        /**
         * @var string $email,$sharemail
         * @var integer $id
         */
        $flag = false;
        $email = $_POST['email'];
        $id = $_POST['id'];
        $sharemail = $_POST['sharemail'];
        $this->ref->addCollaborator($flag, $email, $id, $sharemail);

    }

    /**
     * @method getcollaborator()fetch all collaborator
     * @return void
     */
    public function getCollaborator()
    {
        /**
         * @var string $email
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->getCollaborator($email, $id);

    }

    /**
     * @method deletecollaborator()delete collaborator for note
     * @return void
     */
    public function deleteCollaborator()
    {
        /**
         * @var string $email,$sharemail
         * @var integer $noteid
         */
        $email = $_POST['email'];
        $noteid = $_POST['noteid'];
        $sharemail = $_POST['sharemail'];
        $this->ref->deleteCollaborator($email, $id, $sharemail);

    }

    /**
     * @method getcollaborator1()fetch collaboraror from collaborator table
     * @return void
     */
    public function getAllCollaborator()
    {
        /**
         * @var string $email,$sharemail
         * */
        $email = $_POST['email'];
        $this->ref->getAllCollaborator($email);

    }

    /**
     * @method addimage()add image to perticular note
     * @return void
     */
    public function addImage()
    {
            /**
             * @var string $email,$file,$name
             */
            $email = $_POST['email'];
            $id = $_POST['id'];
            $file = $_FILES['file'];
            $name = $_FILES['file']['name'];
            $fileTmpName = $_FILES['file']['tmp_name'];

            $this->ref->addImage($email,$id,$name,$fileTmpName);

    }

    public function DragAndDrop()
    {


        $email     = $_POST["email"];
        $id        = $_POST["id"];
        $loop      = $_POST["loop"];
        $direction = $_POST["direction"];

         $this->ref->DragAndDrop($email,$id,$loop,$direction);

      
    }

}
