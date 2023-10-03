<?php

	class DefaultController extends Controller
	{
		public function default(): void
		{
session_start();
			$this->renderView('home.phtml',['title' => 'Accueil']);
		}
	}