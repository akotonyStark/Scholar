<?php 

    include 'db.php';

   if(isset($_POST)){
    $studId = $_POST['StudId'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $mname = $_POST['mname'];
    $gender = $_POST['gender'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $studClass = $_POST['studLevel'];
    $dob    = $_POST['dob'];
    $house    = $_POST['house'];
    $club    = $_POST['clubs'];
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

    if(!empty($studImg)){
       
        $imageurl = "profilepicture/".$studId."".$_FILES['file']['name'];
        move_uploaded_file($studImg,"../".$imageurl);

        $getimage = "SELECT * FROM `students` WHERE `regId`= '$studId'";
        $res = mysqli_query($db,$getimage);
        if($res){
            while($rows= mysqli_fetch_array($res)){
                $oldImage = $rows['Image'];

                unlink("../".$oldImage);

            }
        }

        $sql = "UPDATE `students` SET `First Name`='$fname',`Last Name`= '$lname',`mName`='$mname',`Name`='$fullname',`DoB`='$dob',`Gender`= '".$gender."',
        `Contact`='$contact',`Email`='$email',`Class`='$studClass',`House`='$house',`Club`='$club' ,`Image`='$imageurl' WHERE `regId`='$studId'";
        $result = mysqli_query($db,$sql);
        if($result){
            $promt="Done";
            $data[] = array(
            
                'fname' =>  $fname,
                'lname' =>  $lname,
                'mname' =>  $mname,
                'gender' => $gender,
                'studClass' =>$studClass,
                'contact' =>    $contact,
                'dob' =>    $dob,
                'email' =>  $email,
                'id' =>  $studId,
                'promt' =>  $promt,
                 'club' =>  $club,
                'imageurl' =>  $imageurl
            );
                
            $output = array('prompt' => $promt);
            echo json_encode($output);

        }

    }

    elseif(empty($studImg)){
      

        $getimage = "SELECT * FROM `students` WHERE `regId`= '$studId'";
        $res = mysqli_query($db,$getimage);
        if($res){
            while($rows= mysqli_fetch_array($res)){
                $oldImage = $rows['Image'];
            }
        }

    $sql = "UPDATE `students` SET `First Name`='$fname',`Last Name`= '$lname',`mName`='$mname',`Name`='$fullname',`DoB`='$dob',`Gender`= '$gender',
    `Contact`='$contact',`Email`='$email',`Class`='$studClass',`House`='$house',`Club`='$club' WHERE `regId`='$studId'";
    $result = mysqli_query($db,$sql);
    if($result){
        $promt="Done";
        $data[] = array(
        
            'fname' =>  $fname,
            'lname' =>  $lname,
            'mname' =>  $mname,
            'gender' => $gender,
            'studClass' =>$studClass,
            'contact' =>    $contact,
            'dob' =>    $dob,
            'email' =>  $email,
            'id' =>  $studId,
            'promt' =>  $promt,
            'club' =>  $club,
            'imageurl' =>  $oldImage
        );
              
        $output = array('prompt' => $promt);
        echo json_encode($output);

    }

    }
    
    

    
    


   }





?>
 