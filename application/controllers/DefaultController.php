<?php

	class DefaultController extends Controller
	{
		public function default(): void
		{
			session_start();
			$this->renderView('home.phtml',['title' => 'Accueil']);
		}
		
		public function myRoutes(): void
		{
			session_start();
			$this->renderView('my-routes.phtml',['title' => 'Mes Routes']);
		}
	}