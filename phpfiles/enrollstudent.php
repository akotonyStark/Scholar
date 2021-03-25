<?php 

    include 'db.php';

   if(isset($_POST)){

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $mname = $_POST['mname'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $studClass = $_POST['studLevel'];
    $dob    = $_POST['dob'];
    $fullname = "";
    $defaultimage = "profilepicture/default.jpg";
    $studImg = $_FILES['file']['tmp_name'];

    
    $code = "1q2w3e4r5t6y7u8i9op1a2s3d4f5g6h7j8k9l1z2x3c4v5b6n7m";

    $autogenerate = str_shuffle($code);
    $studId = substr($autogenerate, 0,7);

    $code2 = "123456789";
    $code_suffle =  str_shuffle($code2);
    $id = substr($code_suffle, 0,3);
    $username =$fname."".$id;
    $password =  substr($autogenerate, 0,8);    

    $imageurl = "profilepicture/".$studId."".$_FILES['file']['name'];
    move_uploaded_file($studImg,"../".$imageurl);

    if(empty($mname)){
        $fullname = $fname." ".$lname;
    }
    else if(!empty($mname)){
        $fullname = $fname." ".$mname." ".$lname;
    }
    
    $data[] = array(
        
        'fname' =>  $fname,
        'lname' =>  $lname,
        'mname' =>  $mname,
        'gender' => $gender,
        'studClass' =>$studClass,
        'contact' =>    $contact,
        'dob' =>    $dob,
        'email' =>  $email,
        'imageurl' =>  $imageurl
    );

    if(empty($fname)){

        $promt = "Please enter first name";
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($lname)){

        $promt = "Please enter last name";
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($dob)){

        $promt = "Please enter student's date of birth.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($gender)){

        $promt = "Please select gender.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($contact)){

        $promt = "Please enter active parent contact.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($studClass)){

        $promt = "Please select student's class.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    
    else if(empty($studImg)){
        $sql = "INSERT INTO `students` (`regId`,
                                        `First Name`,
                                        `Last Name`,
                                        `mName`,
                                        `Name`,
                                        `DoB`,
                                        `Gender`,
                                        `Contact`,
                                        `Email`,
                                        `Class`)
                VALUE('$studId','$fname','$lname','$mname','$fullname',
                    '$dob','$gender','$contact','$email','$studClass')";
        $result = mysqli_query($db,$sql);
        if($result){

            $sql_user = "INSERT INTO `users`(`UserId`, `Username`, `Password`, `UserLevel`, `Image`) 
            VALUES ('$studId','$username','$password','2','$imageurl')";
            $res = mysqli_query($db,$sql_user);

            //check if parent account exit
            $check_accout = "SELECT `Username` FROM `users` WHERE `Username`='$email'";
            $check_res = mysqli_query($db,$check_accout);
            if(mysqli_num_rows( $check_res)<1){

                $sql_user2 = "INSERT INTO `users`(`UserId`, `Username`, `Password`, `UserLevel`, `Image`) 
                VALUES ('$contact','$email','$password','4','$defaultimage')";
                $res = mysqli_query($db,$sql_user2);

            }

          

            $promt = "Done."; 
            // $message = "";   
            $output = array('prompt' => $promt);
            echo json_encode($output);
        }
        // echo json_encode($data);
    }
    else if(!empty($studImg)){
        $sql = "INSERT INTO `students` (`regId`,
                                        `First Name`,
                                        `Last Name`,
                                        `mName`,
                                        `Name`,
                                        `DoB`,
                                        `Gender`,
                                        `Contact`,
                                        `Email`,
                                        `Class`,
                                        `Image`)
                VALUE('$studId','$fname','$lname','$mname','$fullname',
                    '$dob','$gender','$contact','$email','$studClass','$imageurl')";
        $result = mysqli_query($db,$sql);
        if($result){
            $sql_user = "INSERT INTO `users`(`UserId`, `Username`, `Password`, `UserLevel`, `Image`) 
            VALUES ('$studId','$username','$password','2','$imageurl')";
            $res = mysqli_query($db,$sql_user);

            //check if parent account exit
            $check_accout = "SELECT `Username` FROM `users` WHERE `Username`='$email'";
            $check_res = mysqli_query($db,$check_accout);
            if(mysqli_num_rows( $check_res)<1){

                $sql_user2 = "INSERT INTO `users`(`UserId`, `Username`, `Password`, `UserLevel`, `Image`) 
                VALUES ('$contact','$email','$password','4','$defaultimage')";
                $res = mysqli_query($db,$sql_user2);

            }
            $promt = "Done."; 
            // $message = "";   
            $output = array('prompt' => $promt);
            echo json_encode($output);
        }
        // echo json_encode($data);
    }

        // adding new student to assessment list
        // $sql = "SELECT * FROM `assessment` WHERE `Class`= '$studClass'  ORDER BY `assessment`.`id` DESC LIMIT 1";
        // $res = mysqli_query($db,$sql);
        // if(mysqli_num_rows($res)>0){
        //     foreach($res as $row)
        //     $getterm = $row['Term'];
        //     $getYear = $row['Year'];

        //     $inset = "INSERT INTO `assessment`( `StudentId`,`Class`, `Subject`, `TestA`, `TestB`, `Groupwork`, `Projectwork`,
        //                              `Class_score`, `Exams`, `Exams_score`, `Total`, `Term`, `Year`)
        //                               VALUES ('$studId','$studentClass','$subject','$test1'"
        // }

       
   }









?>