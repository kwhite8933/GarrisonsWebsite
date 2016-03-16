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

	$qSelectAll = 'SELECT * FROM hours';

	$result=mysql_query($qSelectAll);

	if( ! $result ){
		die( 'Error loading data from hours' );
	}

	$hours = array();
	while( $row=mysql_fetch_row($result) ){
		$hoursData[] = $row;
	}

	$arr = array();
	$arr = $hoursData;

	echo json_encode($arr);

 ?>