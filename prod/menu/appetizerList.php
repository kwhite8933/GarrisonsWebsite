<?php 

	$servername = "localhost";
	$username = "kwhite";
	$password = "kw9152";

	mysql_connect($servername, $username, $password) or die("<p>Error connecting to MySQL: " . mysql_error() . "</p>");

	#echo "<p>Connected to MySQL!</p>";

	$db = "kwhite";

	mysql_select_db( $db )
	  or die("<p>Error selecting the databse kwhite: " . mysql_error() . "</p>");

	#echo "<p>Conneted to database: " . $db . "</p>";

	$qSelectAll = 'SELECT * FROM appetizers';

	$result=mysql_query($qSelectAll);
	if( ! $result ){
		die( 'Error loading data from appetizers' );
	}

	$index = 0;
	$appetizers = array();
	while( $row=mysql_fetch_row($result) ){
		$appetizers[$index] = array();
		$appetizers[$index]["id"] = $row[0];
		$appetizers[$index]["name"] = $row[1];
		$appetizers[$index]["description"] = $row[2];
		$appetizers[$index]["price"] = $row[3];
		$index += 1;
	}

	echo json_encode($appetizers);

 ?>