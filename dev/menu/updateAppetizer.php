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

	#get data passed in from the POST method in app.js
	parse_str(file_get_contents("php://input"),$post_vars);

	#giant if statement that determines what sql statement to execute based on what function is called in the javascript
	#if statement is controlled by the 'field' element passed in to post_vars

	#runs if updateAppetizerName() is called
	#updates the name of the appetizer
	if($post_vars['field'] == "name"){
	
		$id = $post_vars['id'];
		$name = $post_vars['name'];

		$sql = "UPDATE appetizers SET name='$name' WHERE id='$id'";
			
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from appetizers' );
		};
	
	}
	#runs if updateAppetizerDesc() is called
	#updates the description of the appetizer 
	elseif ($post_vars['field'] == "description")
	{

		$id = $post_vars['id'];
		$description = $post_vars['description'];

		$sql = "UPDATE appetizers SET description='$description' WHERE id='$id'";
	
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from appetizers' );
		};

	}
	#runs if updateAppetizerPrice() is called
	#updates the description of the appetizer 
	elseif ($post_vars['field'] == "price")
	{

		$id = $post_vars['id'];
		$price = $post_vars['price'];

		$sql = "UPDATE appetizers SET price='$price' WHERE id='$id'";

		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from appetizers' );
		};

	}
	#runs if deleteAppetizer() is called
	#deletes the appetizer with the id of the appetizer at the index selected 
	elseif ($post_vars['field'] == "delete")
	{
		
		$id = $post_vars['id'];

		$sql = "DELETE FROM appetizers WHERE id='$id'";
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from appetizers' );
		};
	}
	#runs if addAppetizer() is called
	#adds the appetizer to the database 
	elseif ($post_vars['field'] == "add")
	{

		$name = $post_vars['name'];
		$description = $post_vars['description'];
		$price = $post_vars['price'];

		# gets every appetizer from the database and orders them in descending order by name
		$sql = "INSERT INTO appetizers(name, description, price) VALUES ('$name', '$description', '$price')";

		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from appetizers' );
		};

		# gets the last inserted element in the database
		$sqlLastInserted = "SELECT * FROM appetizers ORDER BY id DESC LIMIT 1";

		#checks that the query is valid
		$res=mysql_query($sqlLastInserted);
		if( ! $res ){
			die( 'Error loading last iserted element from appetizers' );
		};

		# creates an associative array of the last row that was inserted into the database
		$appData = array();
		while( $row=mysql_fetch_row($res) ){
			$appData['data']['id'] = $row[0];
			$appData['data']['name'] = $row[1];
			$appData['data']['description'] = $row[2];
			$appData['data']['price'] = $row[3];
		}

		# send back json encoded data to javascript for manipulation there
		echo json_encode($appData);

	} #end if statement

?>