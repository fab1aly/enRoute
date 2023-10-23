<?php

	class HomeController extends Controller
	{
        public function home (): void
		{
session_start();

            if($_SERVER['REQUEST_METHOD'] == 'GET')
    		{
    		    $this->renderView('home.phtml',['title' => 'enRoute']);
    		}
    		
    	}
    	
    	public function homeProcess () : void
    	{
session_start();
// var_dump($_POST);
// exit;

		    if (array_key_exists('user', $_SESSION))
            {
// var_dump($_POST);
// var_dump($_SESSION['user']->getId());
// exit;
            
    		    $listsManager = new ListsManager;
                $list_onload = $listsManager->getList($_POST['list_uniq_id']);
                    
// var_dump($list_onload);
// exit;    		    
    		    $this->renderView('home-process.phtml',['title' => 'enRoute', 'list_onload' => $list_onload]);
            
            }
            else
            {
                header('Location: ./sign-in'); //redirction vers sign-in
                exit; 
            }
    	}

	}