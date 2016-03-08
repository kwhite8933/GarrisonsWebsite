<?php 

	$servername = "localhost";
	$username = "kwhite";
	$password = "kw9152";

	mysql_connect($servername, $username, $password) or die("<p>Error connecting to MySQL: " . mysql_error() . "</p>");

	echo "<p>Connected to MySQL!</p>";

	$db = "kwhite";

	mysql_select_db( $db )
	  or die("<p>Error selecting the databse kwhite: " . mysql_error() . "</p>");

	echo "<p>Connected to MySQL, using databse <b>$db</b>.</p>";

	$result = mysql_query("SHOW TABLES;");

	if(!$result){
		die("<p>Error inlisting tables: " . mysql_error() . "</p");
	}

	echo "<p>Tables in databse:</p>";
	echo "<ul>";
	while( $row=mysql_fetch_row($result) ){
		echo "<li>Table: {$row[0]}</li>";
	}
	echo "</ul>";

 ?>