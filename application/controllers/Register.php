<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') OR exit('No direct script access allowed');
/* This can be removed if you use __autoload() in config.php OR use Modular Extensions
** @noinspection PhpIncludeInspection 
*To Solve File REST_Controller not found
*/
require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Register extends REST_Controller {
	function __construct($config = 'rest') {
		parent::__construct($config);
	}
	function index_get() {
		$fname = $this->get('fname');
		if ($fname == '') {
			$product = $this->db->get('emp')->result();
		} else {
			$this->db->where('fname', $fname);
			$product = $this->db->get('emp')->result();
		}
		$this->response($product, 200);
	}
	function index_post() {
		$data = array(
			'fname' => $this->input->post('fname'),
			'lname' => $this->input->post('lname'),
			'age' => $this->input->post('age'),
			'mobno' => $this->input->post('mobno')
			);
		$insert = $this->db->insert('emp', $data);
		if ($insert) {
			$this->response($data, 200);
		} else {
			$this->response(array('status' => 'fail', 502));
		}
	}
	function index_put() {
		$fname= $this->put('fname');
		$data = array(
			'lname' => $this->put('lname'),
			'age' => $this->put('age'),
			'mobno' => $this->put('mobno')
			);
		$this->db->where('fname', $fname);
		$update = $this->db->update('emp', $data);
		if ($update) {
			$this->response($data, 200);
		} else {
			$this->response(array('status' => 'fail', 502));
		}
	}
	function index_delete() {
		$fname = $this->delete('fname');
		$this->db->where('fname', $fname);
		$delete = $this->db->delete('emp');
		if ($delete) {
			$this->response(array('status' => 'success'), 201);
		} else {
			$this->response(array('status' => 'fail', 502));
		}
    }
}