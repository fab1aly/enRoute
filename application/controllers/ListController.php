<?php


    // namespace Application/Controller;
    
    class ListController extends Controller
    {
        // //pour avoir la session pour chaque controleur ! 
        // public function __construct()
        // {
        //     session_start();
        // }
        
        public function home (): void
		{
session_start();

            if($_SERVER['REQUEST_METHOD'] == 'GET')
    		{
    		    $this->renderView('home.phtml',['title' => 'enRoute']);
    		}
    		
    
    		else // (POST) 
    		{
// var_dump($_POST);
// exit;
    		    $this->renderView('home.phtml',['title' => 'enRoute']);
    		}
    	}

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
                    $listsManager = new ListsManager;
                    $routes = $listsManager->getRoutes($_SESSION['user']->getId());
                    
                    $this->renderView('my-routes.phtml',['title' => 'Mes routes', 'routes' => $routes]);
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
                if (array_key_exists('user', $_SESSION))
                {
// var_dump($_POST);
// var_dump($_SESSION['user']->getId());
// exit;
                    $listsManager = new ListsManager;
			        $listsManager->saveList($_SESSION['user']->getId(), $_POST['name'], $_POST['listpoint']);
                    
                    $routes = $listsManager->getRoutes($_SESSION['user']->getId());
                    $this->renderView('my-routes.phtml',['title' => 'Mes routes', 'routes' => $routes]);
                }
                else
                {
                    header('Location: ./sign-in'); //redirction vers sign-in
                    exit; 
                }
            }
		}
    }