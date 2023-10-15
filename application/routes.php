<?php

	return
	[
// 		'/' => 'DefaultController::default',
		
		'/' => 'ListController::home',
		'/my-routes' => 'ListController::myRoutes',
        
        '/sign-up' => 'UserController::signUp',
        '/sign-in' => 'UserController::signIn',
        '/sign-out' => 'UserController::signOut',
        '/sign-forget' => 'UserController::signForget',
        
        '/profil'=> 'UserController::profil',
        
        '/profil-delete'=> 'UserController::profilDelete', //confirm page 
        '/user-delete'=> 'UserController::userDelete', //action page for delete user
        
        
        
	];
	