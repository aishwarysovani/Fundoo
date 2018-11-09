<?php
defined('BASEPATH') or exit('No direct script access allowed');
/**
 * @var string $servername,$username,$password,$dbname
 */
class Login extends CI_Controller
{

    private $servername = "localhost";
    private $username = "root";
    private $password = "bridgeit";
    private $dbname = "php";
    
    /**
     * @obj $conn establish connection between php and mysql
     * @array $id,$fname,$lname,$age,$mobno
     * @var string $query 
     * json used to encode data from database table
     */
    public function get()
    {
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $query = "SELECT * FROM emp";
        $result = mysqli_query($conn, $query);
        $json_response = array();
        while ($row = mysqli_fetch_array($result)) {
            $row_array['id'] = $row['id'];
            $row_array['fname'] = $row['fname'];
            $row_array['lname'] = $row['lname'];
            $row_array['age'] = $row['age'];
            $row_array['mobno'] = $row['mobno'];
            array_push($json_response, $row_array);
        }

        $conn->close();
        echo json_encode($json_response);
    }

    /**
     * @var string $fname,$lname
     * @var integer $age,$mobno
     * @var string $sql
     * which shows query to insert values in database
     */
    public function post()
    {
        $fname = $_POST['fname'];
		$lname = $_POST['lname'];
		$age = $_POST['age'];
        $mobno = $_POST['mobno'];
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "INSERT INTO emp (fname,lname,age,mobno) VALUES('$fname','$lname','$age','$mobno')";
        echo $sql;
			
        if ($conn->query($sql) === true) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

    /**
     * @var string $fname,$lname
     * @var integer $id,$age,$mobno
     * @var string $sql
     * which shows query to update values in database
     */
    function put()
    {
        $id=$_POST['id'];
        $fname = $_POST['fname'];
		$lname = $_POST['lname'];
		$age = $_POST['age'];
        $mobno = $_POST['mobno'];
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "UPDATE emp SET fname='$fname',lname='$lname',age='$age',mobno='$mobno' WHERE id='$id'";

        if ($conn->query($sql) === true) {
            echo "record updated successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

    /**
     * @var integer $id
     * @var string $sql
     * implement query for delete field from database
     * to delete take id of field
     */
    function delete()
    {
        $id = $_POST['id'];
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = "DELETE FROM emp WHERE id='$id'";
        if ($conn->query($sql) === true) {
            echo "record deleted successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

}
