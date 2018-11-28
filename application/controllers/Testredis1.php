<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Testredis1 extends CI_Controller
{
function testredis()
    {
        $this->load->library('redis');
        $redis=$this->redis->config();
        $set=$redis->set('Data1','Fundoo note');
        $get=$redis->get('Data1');
        echo $get;
    }
}

?>