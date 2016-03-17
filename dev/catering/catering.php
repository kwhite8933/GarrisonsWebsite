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

	#get all party platters from the catering_party_platters table.  If unsuccessful, terminate the script
	$qSelectAll = 'SELECT * FROM catering_party_platters';
	$result=mysql_query($qSelectAll);
	if( ! $result ){
		die( 'Error loading data from catering_party_platters' );
	}

	#populate an array with party platter data -> to be json encoded later
	$index = 0;
	$partyPlatters = array();
	while( $row=mysql_fetch_row($result) ){
		$partyPlatters[$index] = array();
		$partyPlatters[$index]["id"] = $row[0];
		$partyPlatters[$index]["name"] = $row[1];
		$partyPlatters[$index]["description"] = $row[2];
		$partyPlatters[$index]["half_tray"] = $row[3];
		$partyPlatters[$index]["full_tray"] = $row[4];
		$index += 1;
	}

	#encode the php associative array to json for easier javascript manipulation
	echo json_encode($partyPlatters);

 ?>