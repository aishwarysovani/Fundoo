<?php
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/FundooLabelService.php";

class FundooLabelController
{
    public $ref;

    public function __construct()
    {

        $this->ref = new FundooLabelService();

    }

    /**
     * @method createlabel() function to add new entry to label table
     * @return void
     */
    public function createLabel()
    {
        /**
         * @var string $email,$label
         */
        $email = $_POST['email'];
        $label = $_POST['label'];
        $this->ref->createLabel($email, $label);

    }

    /**
     * @method showlabel() function to fetch all labels from table
     * @return void
     */
    public function showLabel()
    {
        /**
         * @var string $email
         */
        $email = $_POST['email'];
        $this->ref->showLabel($email);

    }

    /**
     * @method deletelabel() delete label from table
     * @return void
     */
    public function deleteLabel()
    {
        /**
         * @var string $email
         * @var int $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $this->ref->deleteLabel($email, $id);

    }

    /**
     * @method editlabel() edit label from table
     * @return void
     */
    public function editLabel()
    {
        /**
         * @var string $email,$label
         * @var integer $id
         */
        $email = $_POST['email'];
        $id = $_POST['id'];
        $label = $_POST['label'];
        $this->ref->editLabel($email, $id, $label);

    }

}
