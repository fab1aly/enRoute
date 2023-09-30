<?php

	return
	[
		'database' =>
		[
			'dsn' => 'mysql:dbname=fabienaly_enRoute;host=db.3wa.io;charset=utf8',
			'username' => 'fabienaly',
			'password' => '34552673ed834bd59ec25da0ccb5025c',
			'options' =>
			[
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
			]
		]
	];