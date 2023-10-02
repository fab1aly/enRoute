<?php


    // namespace Application/Controller;
    
    class UserController extends Controller
    {
        // //pour avoir la session pour chaque controleur ! 
        // public function __construct()
        // {
        //     session_start();
        // }
        
        
        public function signUp() : void
        {
            // affichage du form (GET)
            if ($_SERVER['REQUEST_METHOD'] == 'GET') // empty($_GET)
            {
                $this->renderView('sign-up.phtml',['title' => 'Inscription']);
            }
            // traitement du form (POST)
            else
            {
                // verif si meme password
                if ($_POST['password'] === $_POST['password_confirm'])
                {
                    if(array_key_exists('username', $_POST) 
                        &&array_key_exists('email', $_POST) 
                        && array_key_exists('password', $_POST)
                        && array_key_exists('password_confirm', $_POST)
                        && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
                        )
                    {
                        $user = new User(trim($_POST['username']), trim($_POST['email']),
                                            trim($_POST['password']));
                        $user->persist();
                    }
                    
                    header('Location: ./sign-in'); //redirction vers sign-in si ok
                    exit; 
                }
                header('Location: ./sign-up'); //redirction vers sign-up si echec
                exit; 
                
            }
        }
        
        public function signIn() : void
		{
			//	Affichage du formulaire (GET)
			if($_SERVER['REQUEST_METHOD'] == 'GET')
			{
				$this->renderView('sign-in.phtml',['title' => 'Connexion']);
			}
			//	Traitement du formulaire (POST)
			else
			{
				//  Si les différents champs ont été correctement remplis… (Il faudrait afficher un message d'erreur dans le cas contraire.)
				if(array_key_exists('email', $_POST) 
				    && array_key_exists('password', $_POST) 
				    && filter_var($_POST['email'], 
				    FILTER_VALIDATE_EMAIL))
				{
					//	Récupération de l'utilisateur.
					$usersManager = new UsersManager;
					$user = $usersManager->connectUser(trim($_POST['email']), trim($_POST['password']));
					//  Si un utilisateur a été trouvé et que le mot de passe est correct…
					if($user instanceof User)
					{
						//  Persistance de l'utilisateur dans la session.
						$user->logInSession();
						//  Redirection vers l' acceuil.
						header('Location: ./');
						exit;
					}
				}
				//  Redirection vers la page de connexion.
				header('Location: ./sign-in');
				exit;
			}
		}
        
        public function signOut() : void
		{
session_start();
			
			$_SESSION['user']->logOut();

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
                if (array_key_exists('new_username', $_POST))
                {
                    $_SESSION['user']->setUsername($_SESSION['user']->getId(), $_POST['new_username']);
                }
                elseif (array_key_exists('new_email', $_POST))
                {
                    $_SESSION['user']->setEmail($_SESSION['user']->getId(), $_POST['new_email']);
                }
                elseif (array_key_exists('new_password', $_POST))
                {
                    $_SESSION['user']->setPassword($_SESSION['user']->getId(), $_POST['new_password']);
                }
    
    			header('Location: ./profil');
    			exit;
            }
        }
        
        public function profilDelete() : void
		{
session_start();
			$this->renderView('profil-delete.phtml',['title' => 'Suppression']);
		}
		
		public function userDelete() : void
		{
session_start();
// var_dump($_SESSION['user']->getId());
			
			$usersManager = new UsersManager;
			$usersManager->deleteUser($_SESSION['user']->getId());
			$_SESSION['user']->logout();

			header('Location: ./');
			exit;
		}
		
    }