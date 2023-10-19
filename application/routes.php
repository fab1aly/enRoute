<?php

	return
	[
// 		'/' => 'DefaultController::default',
		
		'/' => 'ListController::home',
		'/home-process' => 'ListController::homeProcess',
		'/routes' => 'ListController::routes',
		'/routes-process' => 'ListController::routesProcess',
        
        '/sign-up' => 'UserController::signUp',
        '/sign-in' => 'UserController::signIn',
        '/sign-out' => 'UserController::signOut',
        '/sign-forget' => 'UserController::signForget',
        
        '/profil'=> 'UserController::profil',
        '/profil-process'=> 'UserController::profilProcess',
        
        '/profil-delete'=> 'UserController::profilDelete', //confirm page 
        '/user-delete'=> 'UserController::userDelete', //action page for delete user
        
        
        
	];
	