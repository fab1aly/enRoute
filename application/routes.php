<?php

	return
	[
		'/' => 'DefaultController::default',
        '/my-routes' => 'DefaultController::myRoutes',
        
        '/sign-up' => 'UserController::signUp',
        '/sign-in' => 'UserController::signIn',
        '/sign-out' => 'UserController::signOut',
        
        '/profil'=> 'UserController::profil',
        
        '/profil-delete'=> 'UserController::profilDelete', //page de confirm
        '/user-delete'=> 'UserController::userDelete', //action delete user
        
        '/save-in-db'=> 'ListController::saveListInDB',
	];
	