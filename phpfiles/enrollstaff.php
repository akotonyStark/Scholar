<?php 

    include 'db.php';

   if(isset($_POST)){

    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $mname = $_POST['mname'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $department = $_POST['department'];
    $dob    = $_POST['dob'];
    $fullname = "";
   
    
    $code = "staff1q2w3e4r5t6y7u8i9op1a2s3d4f5g6h7j8k9l1z2x3c4v5b6n7m";

    $autogenerate = str_shuffle($code);
    $getcode = substr($autogenerate, 0,7);
    $staffId = "Staff/".$getcode;

    $code2 = "123456789";
    $code_suffle =  str_shuffle($code2);
    $id = substr($code_suffle, 0,3);
    $username =$fname."".$id;
    $password =  substr($autogenerate, 0,8); 

    $staffImg = $_FILES['file']['tmp_name'];
    $imageurl = "profilepicture/".$getcode."".$_FILES['file']['name'];
    move_uploaded_file($staffImg,"../".$imageurl);

    if(empty($mname)){
        $fullname = $fname." ".$lname;
    }
    else if(!empty($mname)){
        $fullname = $fname." ".$mname." ".$lname;
    }
    
    $data[] = array(
        'staffId' =>  $staffId,
        'fname' =>  $fname,
        'lname' =>  $lname,
        'mname' =>  $mname,
        'gender' => $gender,
        'Department' =>$department,
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

        $promt = "Please enter staff's date of birth.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($gender)){

        $promt = "Please select gender.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($contact)){

        $promt = "Please enter active staff contact.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    elseif(empty($department)){

        $promt = "Please select staff's department.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }
    
    else{

        $sql = "INSERT INTO `staff` (`regId`,
                                        `First Name`,
                                        `Last Name`,
                                        `mName`,
                                        `Name`,
                                        `DoB`,
                                        `Gender`,
                                        `Contact`,
                                        `Email`,
                                        `Department`,
                                        `Image`)
                VALUE('$staffId','$fname','$lname','$mname','$fullname',
                    '$dob','$gender','$contact','$email','$department','$imageurl')";
        $result = mysqli_query($db,$sql);
        if($result){

            $sql_user = "INSERT INTO `users`(`UserId`, `Username`, `Password`, `UserLevel`, `Image`) 
            VALUES ('$staffId','$username','$password','2','$imageurl')";
            $res = mysqli_query($db,$sql_user);
            $promt = "Done."; 
            // $message = "";   
            $output = array('prompt' => $promt);
            echo json_encode($output);
        }
        // echo json_encode($data);
    }


       
   }









?>