<?php 
	include 'db.php';
	session_start();
	$sql2 = "UPDATE `users` SET `status`='0',`logindate`='".date('d-m-Y H:i')."' 
    
    WHERE `UserId`= '".$_SESSION['userId']."'";
	$result = mysqli_query($db, $sql2);

	if ($result) {
		session_destroy();

		header('Location:../index.html');

	}

	




 ?>