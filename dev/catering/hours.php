<?php 

	$servername = "localhost";
	$username = "kwhite";
	$password = "kw9152";

	# database connection
	mysql_connect($servername, $username, $password) or die("<p>Error connecting to MySQL: " . mysql_error() . "</p>");

	#echo "<p>Connected to MySQL!</p>";

	$db = "kwhite";

	# select which database to use
	mysql_select_db( $db )
	  or die("<p>Error selecting the databse kwhite: " . mysql_error() . "</p>");

	#echo "<p>Conneted to database: " . $db . "</p>";

	#sql to select all rows in database
	$qSelectAll = 'SELECT * FROM hours';

	#query the database using the sql string
	$result=mysql_query($qSelectAll);
	if( ! $result ){
		die( 'Error loading data from hours' );
	}

	# get all data into an array for 
	$hours = array();
	while( $row=mysql_fetch_row($result) ){
		$hoursData[] = $row;
	}

	$arr = array();
	$arr = $hoursData;

	#encode the array into json data for easy manipulation with javascript
	echo json_encode($arr);

 ?>