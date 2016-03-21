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

	#updates the name of the appetizer
	if($post_vars['field'] == "name"){
	
		$id = $post_vars['id'];
		$name = $post_vars['name'];
		$list = $post_vars['list'];

		$sql = "UPDATE " . $list . " SET name='$name' WHERE id='$id'";
			
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};
	}
	#updates the description of the appetizer
	elseif ($post_vars['field'] == "description")
	{

		$id = $post_vars['id'];
		$description = $post_vars['description'];
		$list = $post_vars['list'];

		$sql = "UPDATE " . $list . " SET description='$description' WHERE id='$id'";
	
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};

	}
	#updates the price of a half tray appetizer 
	elseif ($post_vars['field'] == "half_tray")
	{

		$id = $post_vars['id'];
		$half_tray = $post_vars['half_tray'];
		$list = $post_vars['list'];

		$sql = "UPDATE " . $list . " SET half_tray='$half_tray' WHERE id='$id'";
	
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};

	}
	#updates the price of a full tray platter 
	elseif ($post_vars['field'] == "full_tray")
	{

		$id = $post_vars['id'];
		$full_tray = $post_vars['full_tray'];
		$list = $post_vars['list'];

		$sql = "UPDATE " . $list . " SET full_tray='$full_tray' WHERE id='$id'";
	
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};

	}
	#adds the platter to the database 
	elseif ($post_vars['field'] == "add")
	{

		$name = $post_vars['name'];
		$description = $post_vars['description'];
		$half_tray = $post_vars['half_tray'];
		$full_tray = $post_vars['full_tray'];
		$list = $post_vars['list'];

		# gets every appetizer from the database and orders them in descending order by name
		$sql = "INSERT INTO " . $list . "(name, description, half_tray, full_tray) VALUES ('$name', '$description', '$half_tray', '$full_tray')";

		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};

		# gets the last inserted element in the database
		$sqlLastInserted = "SELECT * FROM " . $list . " ORDER BY id DESC LIMIT 1";

		#checks that the query is valid
		$res=mysql_query($sqlLastInserted);
		if( ! $res ){
			die( 'Error loading last iserted element from ' . $list );
		};

		# creates an associative array of the last row that was inserted into the database
		$appData = array();
		while( $row=mysql_fetch_row($res) ){
			$appData['data']['id'] = $row[0];
			$appData['data']['name'] = $row[1];
			$appData['data']['description'] = $row[2];
			$appData['data']['half_tray'] = $row[3];
			$appData['data']['full_tray'] = $row[4];
		}

		# send back json encoded data to javascript for manipulation there
		echo json_encode($appData);

	}
	#deletes the appetizer with the id of the appetizer at the index selected 
	elseif ($post_vars['field'] == "delete")
	{
		
		$id = $post_vars['id'];
		$list = $post_vars['list'];

		$sql = "DELETE FROM " . $list . " WHERE id='$id'";
		$result=mysql_query($sql);
		if( ! $result ){
			die( 'Error loading data from ' . $list );
		};

	} #end if statement

 ?>