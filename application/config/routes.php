<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
//$route['default_controller'] = 'Fundooacc';
$route['Register']='/FundooAccountController/getRegisterValue';
$route['Login']='/FundooAccountController/getLoginValue';
$route['Forgotpass']='/FundooAccountController/getForgotValue';
$route['resetpass']='/FundooAccountController/getResetValue';
$route['conformregi']='/FundooAccountController/getConformValue';
$route['CreateNote']='/FundooNoteController/getNoteValue';
$route['Fetchnotes'] ='/FundooNoteController/allNotes';
$route['Updatenotes'] ='/FundooNoteController/updateNotes';
$route['Changecolor'] ='/FundooNoteController/changeColor';
$route['Deletenote'] ='/FundooNoteController/deleteNote';
$route['Changereminder'] ='/FundooNoteController/changeReminder';
$route['Deletereminder'] ='/FundooNoteController/deleteReminder';
$route['Fetchreminder'] ='/FundooNoteController/allReminder';
$route['Fetchdeletednotes'] ='/FundooNoteController/allDeletedNotes';
$route['Deleteforever'] ='/FundooNoteController/deleteForever';
$route['Restore'] ='/FundooNoteController/restore';
$route['Archive'] ='/FundooNoteController/archive';
$route['Fetcharchivenote'] ='/FundooNoteController/allArchiveNotes';
$route['Unarchive'] ='/FundooNoteController/unarchive';
$route['Createlabel']='/FundooLabelController/createLabel';
$route['Showlabel']='/FundooLabelController/showLabel';
$route['Deletelabel']='/FundooLabelController/deleteLabel';
$route['Editlabel']='/FundooLabelController/editLabel';
$route['Addnotelabel']='/FundooNoteController/addNoteLabel';
$route['Deletenotelabel']='/FundooNoteController/deleteNoteLabel';
$route['Addcollaborator']='/FundooNoteController/addCollaborator';
$route['Getcollaborator']='/FundooNoteController/getCollaborator';
$route['Deletecollaborator']='/FundooNoteController/deleteCollaborator';
$route['Addprofile']='/FundooAccountController/addProfile';
$route['Showprofile']='/FundooAccountController/showProfile';
$route['getAllCollaborator']='/FundooNoteController/getAllCollaborator';
$route['Addimage']='/FundooNoteController/addImage';
$route['DragAndDrop']='/FundooNoteController/DragAndDrop';

$route['Testredis']='/Testredis1/testRedis';

//$route['Form']='/Welcome/forgot_pass';
// $route['Get'] = '/Login/get';
// $route['Post'] = '/Login/post'; 
// $route['Put'] = '/Login/put'; 
// $route['Delete'] = '/Login/delete'; 
//$route['Register'] = '/Register/index';
//$route['Register1'] = '/Register/user_index';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
