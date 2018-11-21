<?php
function sum($a,$b){
    return $a+$b;
}
function multiply($a,$b){
    return $a+$b;
}
use PHPUnit\Framework\TestCase;
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class testingcontroller extends \PHPUnit_Framework_TestCase
{
    // public function __construct()
    // {
    //     parent::__construct();
    //     $this->load->library('unit_test');
    // }
    public function test()
    {
        $this->unit->run(sum(4,3),7,"testing sum function");
        $this->unit->run(multiply(4,5),20,"testing multiply function");

        $this->load->view('tests');
    }
}
?>