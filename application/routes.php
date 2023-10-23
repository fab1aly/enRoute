<?php

	return
	[

		'/' => 'HomeController::home',
		'/home-process' => 'HomeController::homeProcess',

		'/routes' => 'RouteController::routes',
		'/routes-process' => 'RouteController::routesProcess',

        '/sign-up' => 'UserController::signUp',
        '/sign-in' => 'UserController::signIn',
        '/sign-out' => 'UserController::signOut',
        '/sign-forget' => 'UserController::signForget',

        '/profil'=> 'UserController::profil',
        '/profil-process'=> 'UserController::profilProcess',
        '/profil-delete'=> 'UserController::profilDelete', 

	];
