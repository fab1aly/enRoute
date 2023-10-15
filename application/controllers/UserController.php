<?php
    
    class UserController extends Controller
    {
        // //pour avoir la session pour chaque controleur ! 
        // public function __construct()
        // {
        //     session_start();
        // }
        
        
        public function signUp() : void // inscription
        {
session_start();

            // display form (GET)
            if ($_SERVER['REQUEST_METHOD'] == 'GET') // empty($_GET)
            {
                $this->renderView('sign-up.phtml',['title' => 'Inscription']);
            }
            // processing form (POST)
            else
            {
                // save form data
                $_SESSION['formSignData'] = $_POST;
                
                
                // verif if all data form is present
                if(array_key_exists('username', $_POST) 
                    &&array_key_exists('email', $_POST) 
                    && array_key_exists('password', $_POST)
                    && array_key_exists('password_confirm', $_POST)
                    && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
                    )
                {
                    // verif if email is used
                    $usersManager = new UsersManager; // recup de la fonction
                    $emailIsKnown = $usersManager->getEmailIsKnown ($_POST['email']);
                    
                    if($emailIsKnown)
                	{
                		$_SESSION['error'] = 'Cette email est déjà utilisé.';
                
                		header('Location: ./sign-up');
                		exit;
                	}
                    
                    // verif if same password
                    if($_POST['password'] !== $_POST['password_confirm'])
                	{
                		$_SESSION['error'] = 'Les deux mots de passe doivent être identiques.';
                
                		header('Location: ./sign-up');
                		exit;
                	}
                	
                    
                     // data processing
                    $user = new User(trim($_POST['username']), trim($_POST['email']),
                                    trim($_POST['password']));
                    $user->persist();
                    
// unset($_SESSION['user']);
                    
                    header('Location: ./sign-in'); //redirction sign-in if valid
                    exit;
                    
                }

                header('Location: ./sign-up'); //redirction sign-up if error
                exit; 
                
            }
        }
        
        public function signIn() : void // connexion
		{
session_start();
			//	display form (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				$this->renderView('sign-in.phtml',['title' => 'Connexion']);
			}
			//	processing form (POST)
			else
			{
				// save form data
                $_SESSION['formSignData'] = $_POST;
                
                //  Si les différents champs ont été correctement remplis… 
				if(array_key_exists('email', $_POST) 
				    && array_key_exists('password', $_POST) 
				    && filter_var($_POST['email'], 
				    FILTER_VALIDATE_EMAIL))
				{
					//	Récupération de l'utilisateur.
					$usersManager = new UsersManager;
					$user = $usersManager->connectUser(trim($_POST['email']), trim($_POST['password']));
					//  Si un utilisateur a été trouvé et que le mot de passe est correct…
				// 	if($user instanceof User)
					if($user !== null)
					{
						//  Persist user in session.
						$user->logInSession();
						
						// cancel data form in session
						unset($_SESSION['formSignData']);
						
						//  Redirection to home
						header('Location: ./');
						exit;
					}
					
                    else
                	{
                		$_SESSION['error'] = 'Adresse email ou mot de passe inconnu.';
                
                		header('Location: ./sign-in');
                		exit;
                	}
				//  Redirection vers la page de connexion.
				}
				
				header('Location: ./sign-in');
				exit;
			}
		}
        
        public function signOut() : void // deconnexion
		{
session_start();
			
			unset($_SESSION['user']);

			header('Location: ./sign-in');
			exit;
		}
		
		public function profil() : void
        {
session_start();
            //	Affichage du formulaire (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				if (array_key_exists('user', $_SESSION))
                {
                    $this->renderView('profil.phtml',['title' => 'Profil']);
                }
                else
                {
                    header('Location: ./sign-in'); //redirction vers sign-in
                    exit; 
                }
			}
			//	Traitement du formulaire (POST)
			else
			{
// var_dump($_SESSION);
                if ($_POST['new_username'] !== '')
                {
                    $_SESSION['user']->setUsername($_SESSION['user']->getId(), trim($_POST['new_username']));
                }
                elseif ($_POST['new_email'] !== '')
                {
                    if (filter_var($_POST['new_email'], FILTER_VALIDATE_EMAIL))
                    {
                        // verif if email is used
                        $usersManager = new UsersManager; // recup de la fonction
                        $emailIsKnown = $usersManager->getEmailIsKnown ($_POST['new_email']);
                        
                        if($emailIsKnown)
                    	{
                    		$_SESSION['error'] = 'Cette email est déjà utilisé.';
                    
                    		header('Location: ./profil');
                    		exit;
                    	}
                        
                        $_SESSION['user']->setEmail($_SESSION['user']->getId(), trim($_POST['new_email']));
                    }
                }
                elseif ($_POST['new_password'] !== '')
                {
                    
                    if($_POST['new_password'] !== $_POST['new_password_confirm'])
                	{
                		$_SESSION['error'] = 'Les deux mots de passe doivent être identiques.';
                
                		header('Location: ./profil');
                		exit;
                	}
                    
                    $_SESSION['user']->setPassword($_SESSION['user']->getId(), $_POST['new_password']);
                }
    
    			header('Location: ./profil');
    			exit;
            }
        }
        
        public function profilDelete() : void
		{
session_start();

            //	display form (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
					$this->renderView('profil-delete.phtml',['title' => 'Suppression']);
			}
			//	processing form (POST)
			else
			{
			    if(array_key_exists('password', $_POST))
				{
				    $usersManager = new UsersManager;
            		$userPassword = $usersManager->getUserPassword($_SESSION['user']->getId());
				    
				    if(password_verify($_POST['password'], $userPassword['password']))
        			{
        				$usersManager = new UsersManager;
            			$usersManager->deleteUser($_SESSION['user']->getId());
            			
            			unset($_SESSION['user']);
            
            			header('Location: ./');
            			exit;
        			}
        			else
        			{
        				$_SESSION['error'] = 'Mauvais mot de passe.';
        				
        				header('Location: ./profil-delete');
            			exit;
        			}
				}
				
			}
		
		}
		
		public function signForget() : void
		{
session_start();
// var_dump($_SESSION['user']->getId());
            
            //	display form (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				$this->renderView('sign-forget.phtml',['title' => 'Mot de passe oublié']);
			}
			
			
		}

// 		public function userDelete() : void
// 		{
// session_start();
// // var_dump($_SESSION['user']->getId());
			
// 			$usersManager = new UsersManager;
// 			$usersManager->deleteUser($_SESSION['user']->getId());
// 			$_SESSION['user']->logout();

// 			header('Location: ./');
// 			exit;
// 		}
		
    }