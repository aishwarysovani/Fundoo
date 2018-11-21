<?php
defined('BASEPATH') or exit('No direct script access allowed');
use PHPUnit\Framework\TestCase;
include '/var/www/html/codeigniter/application/vendor/autoload.php';
/**;
 * @var string $connect
 */
class Unittest extends \PHPUnit_Framework_TestCase
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library("unit test");
    } 

    public function add($a,$b)
    {
        return $a+$b;
    }

    public function test()
    {
        $test=$this->add(4,2);
        $expectedresult=6;
        $testname="Add test";
        echo $this->unit->run($test,$expectedresult,$testname);
    }

}
?>