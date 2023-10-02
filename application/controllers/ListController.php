<?php


    // namespace Application/Controller;
    
    class ListController extends Controller
    {
        // //pour avoir la session pour chaque controleur ! 
        // public function __construct()
        // {
        //     session_start();
        // }
        
        
        public function saveListInDB ()
		{
session_start();
$this->renderView('test.phtml',['title' => 'test']);
var_dump($_POST);
exit;
		    $listsManager = new ListsManager;
// 			$listManager->saveList($_SESSION['user']->getId(), $_POST[]$name, $_POST[]$listpoint);
		}
    }