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
$route['Register']='/FundooAccount/getRegisterValue';
$route['Login']='/FundooAccount/getLoginValue';
$route['Forgotpass']='/FundooAccount/getForgotValue';
$route['resetpass']='/FundooAccount/getResetValue';
$route['conformregi']='/FundooAccount/getConformValue';
$route['CreateNote']='/FundooNote/getNoteValue';
$route['Fetchnotes'] ='/FundooNote/allNotes';
$route['Updatenotes'] ='/FundooNote/updateNotes';
$route['Changecolor'] ='/FundooNote/changeColor';
$route['Deletenote'] ='/FundooNote/deleteNote';
$route['Changereminder'] ='/FundooNote/changeReminder';
$route['Deletereminder'] ='/FundooNote/deleteReminder';
$route['Fetchreminder'] ='/FundooNote/allReminder';
$route['Fetchdeletednotes'] ='/FundooNote/allDeletedNotes';
$route['Deleteforever'] ='/FundooNote/deleteForever';
$route['Restore'] ='/FundooNote/restore';
$route['Archive'] ='/FundooNote/archive';
$route['Fetcharchivenote'] ='/FundooNote/allArchiveNotes';
$route['Unarchive'] ='/FundooNote/unarchive';
$route['Createlabel']='/FundooLabel/createLabel';
$route['Showlabel']='/FundooLabel/showLabel';
$route['Deletelabel']='/FundooLabel/deleteLabel';
$route['Editlabel']='/FundooLabel/editLabel';
$route['Addnotelabel']='/FundooNote/addNoteLabel';
$route['Deletenotelabel']='/FundooNote/deleteNoteLabel';
$route['Addcollaborator']='/FundooNote/addCollaborator';
$route['Getcollaborator']='/FundooNote/getCollaborator';
$route['Deletecollaborator']='/FundooNote/deleteCollaborator';
$route['Addprofile']='/FundooAccount/addProfile';
$route['Showprofile']='/FundooAccount/showProfile';
$route['Getcollaborator1']='/FundooNote/getAllCollaborator';
$route['Addimage']='/FundooNote/addImage';
$route['Testredis']='/Testredis1/testredis';

//$route['Form']='/Welcome/forgot_pass';
// $route['Get'] = '/Login/get';
// $route['Post'] = '/Login/post'; 
// $route['Put'] = '/Login/put'; 
// $route['Delete'] = '/Login/delete'; 
//$route['Register'] = '/Register/index';
//$route['Register1'] = '/Register/user_index';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
