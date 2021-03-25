<?php 
    include 'db.php';
		
	if (isset($_POST)) {
            session_start();
            $date = date('d-m-Y H:i');
            // $data[] =  array('prompt' => $prompt, 'url' => '');
            $user = $_POST['user'];
            $userName = $_POST['userName'];
            $password = $_POST['password'];
            
            $userId ="";
            if($user ==""){
                $prompt = "Please select user.";

                $data[] =  array('prompt' => $prompt);

                echo json_encode($data);

            }

            else if(empty($userName)){
                $prompt = "Please user name is required";

                $data[] =  array('prompt' => $prompt);

                echo json_encode($data);

            }
            else if(empty($password)){
                $prompt = "Please password is required";
                $data[] =  array('prompt' => $prompt);

                echo json_encode($data);

            }

            elseif (!empty($password) && !empty($userName) && !empty($password) ) {

                $sql = "SELECT * FROM users WHERE Username='$userName' AND Password = '$password' AND UserLevel = '$user'";
                $results = mysqli_query($db, $sql);

                if (mysqli_num_rows($results) > 0) {
                    foreach($results as $row){
                    $userId = $row['UserId'];}

                    $sql2 = "UPDATE `users` SET `status`='1',`logindate`='$date' WHERE UserId = '".$userId."'";
                    $result = mysqli_query($db, $sql2);

                    if ($result) {

                        $prompt = "done";
                        $_SESSION['userId'] = $userId;

                        if ($user == '1') {
                            $data[] =  array('prompt' => $prompt,'url' =>'home.html');
                        }

                        if ($user == '2' || $user == '3' || $user=='4') {
                            $data[] =  array('prompt' => $prompt,'url' =>'home.html');
                        }
                    }

                    echo json_encode($data);
                }

                else if (mysqli_num_rows($results) < 1) {

                    $prompt = "Please your login credentials is incorrect.\nTry again!";
                    $data[] =  array('prompt' => $prompt,'url' =>'index.html');


                    echo json_encode($data);
                }

               
           
    }
}
 ?>