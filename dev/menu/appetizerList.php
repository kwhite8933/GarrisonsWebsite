<?php 
	
	#data to log into database
	$servername = "localhost";
	$username = "kwhite";
	$password = "kw9152";

	#connect to database using stored information
	mysql_connect($servername, $username, $password) or die("<p>Error connecting to MySQL: " . mysql_error() . "</p>");

	#echo "<p>Connected to MySQL!</p>";

	#name of database to use
	$db = "kwhite";
	mysql_select_db( $db )
	  or die("<p>Error selecting the databse kwhite: " . mysql_error() . "</p>");

	#echo "<p>Conneted to database: " . $db . "</p>";

	#get all appetizers from the appetizers table.  If unsuccessful, terminate the script
	$qSelectAll = 'SELECT * FROM appetizers ORDER BY name ASC';
	$result=mysql_query($qSelectAll);
	if( ! $result ){
		die( 'Error loading data from appetizers' );
	}

	#populate an array with appetizer data -> to be json encoded later
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

	#encode the php associative array to json for easier javascript manipulation
	echo json_encode($appetizers);

 ?>