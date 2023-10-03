<?php


    // namespace Application/Controller;
    
    class ListController extends Controller
    {
        // //pour avoir la session pour chaque controleur ! 
        // public function __construct()
        // {
        //     session_start();
        // }
        
        
        public function myRoutes ()
		{
session_start();

// var_dump($_POST);
// exit;
		    //	 (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				if (array_key_exists('user', $_SESSION))
                {
                    $this->renderView('my-routes.phtml',['title' => 'Mes routes']);
                }
                else
                {
                    header('Location: ./sign-in'); //redirction vers sign-in
                    exit; 
                }
			}
			
			// (POST) 
			else
			{
// var_dump($_SESSION);
                if (array_key_exists('user', $_SESSION))
                {
                    $listsManager = new ListsManager;
// 			        $listManager->saveList($_SESSION['user']->getId(), $_POST[]$name, $_POST[]$listpoint);
                    
                    
                    
                    $this->renderView('my-routes.phtml',['title' => 'Mes routes']);
                }
                else
                {
                    header('Location: ./sign-in'); //redirction vers sign-in
                    exit; 
                }
            }
			
			
			
		}
    }