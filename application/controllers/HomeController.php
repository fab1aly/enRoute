<?php

class HomeController extends Controller
{
	public function home(): void
	{
		session_start();

		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			// var_dump($_GET);
			// exit;
			$this->renderView('home.phtml', ['title' => 'enRoute']);
		}
	}

	public function homeProcess(): void
	{

		// var_dump($_POST);
		// exit;

		$listsManager = new ListsManager;
		$list_onload = $listsManager->getList($_POST['list_uniq_id']);

		// var_dump($list_onload);
		// exit;    		    
		$this->renderView('home-process.phtml', ['title' => 'enRoute', 'list_onload' => $list_onload]);
	}
}
