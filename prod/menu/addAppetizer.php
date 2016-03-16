<?php 

	$servername = "localhost";
	$username = "kwhite";
	$password = "kw9152";

	mysql_connect($servername, $username, $password) or die("<p>Error connecting to MySQL: " . mysql_error() . "</p>");

	#echo "<p>Connected to MySQL!</p>";

	$db = "kwhite";

	mysql_select_db( $db )
	  or die("<p>Error selecting the databse kwhite: " . mysql_error() . "</p>");

	parse_str(file_get_contents("php://input"),$post_vars);
	#echo $post_vars['name'];
	$name = $post_vars['name'];
	#echo $post_vars['description'];
	$description = $post_vars['description'];
	#echo $post_vars['price'];
	$price = $post_vars['price'];
	#$endTime = $post_vars['endTime'];

	$sql = "INSERT INTO appetizers(name, description, price) VALUES ('$name', '$description', '$price')";

	$result=mysql_query($sql);
	if( ! $result ){
		die( 'Error loading data from hours' );
	};

	#echo json_encode($_POST['data']);

?>