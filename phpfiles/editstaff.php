<?php 

    include 'db.php';

   if(isset($_POST)){
    $staffId = $_POST['StaffId'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $mname = $_POST['mname'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $department = $_POST['department'];
    $dob    = $_POST['dob'];
   // $duties    = $_POST['duties'];
    $subjectList    = $_POST['subjects'];
    $studImg = $_FILES['file']['tmp_name'];
    $fullname = "";
    $oldImage="";

    if(empty($mname)){
        $fullname = $fname." ".$lname;
    }
    else if(!empty($mname)){
        $fullname = $fname." ".$mname." ".$lname;
    }

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

        $promt = "Please select student's department.";   
        $arrayName = array('prompt' => $promt);
 
        echo json_encode($arrayName);
        
    }

    if(!empty($studImg)){
       
        $imageurl = "profilepicture/".$_FILES['file']['name'];
        move_uploaded_file($studImg,"../".$imageurl);

        $getimage = "SELECT * FROM `staff` WHERE `regId`= '$staffId'";
        $res = mysqli_query($db,$getimage);
        if($res){
            while($rows= mysqli_fetch_array($res)){
                $oldImage = $rows['Image'];

                unlink("../".$oldImage);

            }
        }

        $sql = "UPDATE `staff` SET `First Name`='$fname',`Last Name`= '$lname',`mName`='$mname',`Name`='$fullname',`DoB`='$dob',`Gender`= '$gender',
        `Contact`='$contact',`Email`='$email',`Department`='$department',`Function`='$subjectList' ,`Image`='$imageurl' WHERE `regId`='$staffId'";
        $result = mysqli_query($db,$sql);
        if($result){
            $promt="Done";
            // $data[] = array(
            
            //     'fname' =>  $fname,
            //     'lname' =>  $lname,
            //     'mname' =>  $mname,
            //     'gender' => $gender,
            //     'studClass' =>$studClass,
            //     'contact' =>    $contact,
            //     'dob' =>    $dob,
            //     'email' =>  $email,
            //     'id' =>  $studId,
            //     'promt' =>  $promt,
            //     'imageurl' =>  $imageurl
            // );
                
            $output = array('prompt' => $promt);
            echo json_encode($output);

        }

    }

    elseif(empty($studImg)){
      

        $getimage = "SELECT * FROM `students` WHERE `regId`= '$staffId'";
        $res = mysqli_query($db,$getimage);
        if($res){
            while($rows= mysqli_fetch_array($res)){
                $oldImage = $rows['Image'];
            }
        }

        $sql = "UPDATE `staff` SET `First Name`='$fname',`Last Name`= '$lname',`mName`='$mname',`Name`='$fullname',`DoB`='$dob',`Gender`= '$gender',
        `Contact`='$contact',`Email`='$email',`Department`='$department',`Function`='$subjectList' WHERE `regId`='$staffId'";
    $result = mysqli_query($db,$sql);
    if($result){
        $promt="Done";
        // $data[] = array(
        
        //     'fname' =>  $fname,
        //     'lname' =>  $lname,
        //     'mname' =>  $mname,
        //     'gender' => $gender,
        //     'studClass' =>$studClass,
        //     'contact' =>    $contact,
        //     'dob' =>    $dob,
        //     'email' =>  $email,
        //     'id' =>  $studId,
        //     'promt' =>  $promt,
        //     'imageurl' =>  $oldImage
        // );
              
        $output = array('prompt' => $promt);
        echo json_encode($output);

    }

    }
    
    

    
    


   }





?>
 