<?php
defined('BASEPATH') or exit('No direct script access allowed');
class Constant
{
   public $connect;

    function __construct()
    {
        /**
             * Database conncetion using PDO
             */
            $this->connect = new PDO("mysql:host=localhost;dbname=php", "root", "bridgeit");
            $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->connect;
    }
    
}


?>