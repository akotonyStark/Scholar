<?php

include 'db.php';

if(isset($_POST)){
    $action = $_POST['action'];

    switch ($action) {
     case 'studentData':
                        $defaultimage = "images/default.jpg";
                        $image="";
                         $sql= "SELECT * FROM `students` ORDER BY `Name`";
                         $res = mysqli_query($db,$sql);

                         if(mysqli_num_rows($res)<1){
                            $data[] = (object)[];
                            echo json_encode($data);
                         }
                         else{
                         foreach ($res as $row) {
                            $userimage = $row['Image'];

                            if(file_exists("../".$userimage)){
                                $image = $userimage;
                            }
                            else{
                                $image = $defaultimage;
                            }
                           
                            $name = $row['Name'];
                            $fname = $row['First Name'];
                            $lname = $row['Last Name'];
                            $mname = $row['mName'];
                            $dob = $row['DoB'];
                            $gender = $row['Gender'];
                            $contact = $row['Contact'];
                            $studId = $row['regId'];
                            $Class = $row['Class'];
                            $email = $row['Email'];
                            $house = $row['House'];
                            $club = $row['Club'];

                            $data[] = array('Image'=>$image,
                                            'StudId' =>$studId,
                                          'Name' =>$name,
                                          'fname' =>$fname,
                                          'lname' =>$lname,
                                          'mname' =>$mname,
                                          'DOB' =>$dob,
                                          'Gender'=>$gender,
                                          'Contact'=>$contact,
                                          'Classroom'=>$Class,
                                          'Email'=>$email,
                                          'House'=>$house,
                                          'Club'=>$club,
                                          'studId'=>$studId);

                            
                           
                         }
                          echo json_encode($data);
                        }
                        
            break;
case 'searchstudent':
                $find = $_POST['search'];
                $defaultimage = "images/default.jpg";
                $image="";
                 $sql= "SELECT * FROM `students` WHERE `Name` LIKE '%$find'";
                 $res = mysqli_query($db,$sql);

                 if(mysqli_num_rows($res)<1){
                    $data[] = (object)[];
                    echo json_encode($data);
                 }
                 else{
                 foreach ($res as $row) {
                    $userimage = $row['Image'];

                    if(file_exists("../".$userimage)){
                        $image = $userimage;
                    }
                    else{
                        $image = $defaultimage;
                    }
                   
                    $name = $row['Name'];
                    $fname = $row['First Name'];
                    $lname = $row['Last Name'];
                    $mname = $row['mName'];
                    $dob = $row['DoB'];
                    $gender = $row['Gender'];
                    $contact = $row['Contact'];
                    $studId = $row['regId'];
                    $Class = $row['Class'];
                    $email = $row['Email'];
                    $house = $row['House'];
                    $club = $row['Club'];

                    $data[] = array('Image'=>$image,
                                    'StudId' =>$studId,
                                  'Name' =>$name,
                                  'fname' =>$fname,
                                  'lname' =>$lname,
                                  'mname' =>$mname,
                                  'DOB' =>$dob,
                                  'Gender'=>$gender,
                                  'Contact'=>$contact,
                                  'Classroom'=>$Class,
                                  'Email'=>$email,
                                  'House'=>$house,
                                  'Club'=>$club,
                                  'studId'=>$studId);

                    
                   
                 }
                  echo json_encode($data);
                }
                
    break;

case 'staffData':
                $defaultimage = "images/default.jpg";
                        $image="";
                         $sql= "SELECT * FROM `staff` ORDER BY `Name`";
                         $res = mysqli_query($db,$sql);

                         if(mysqli_num_rows($res)<1){
                            $data[] = (object)[];
                            echo json_encode($data);
                         }
                         else{
                         foreach ($res as $row) {
                            $userimage = $row['Image'];

                            if(file_exists("../".$userimage)){
                                $image = $userimage;
                            }
                            else{
                                $image = $defaultimage;
                            }
                           
                            $staffId = $row['regId'];
                            $name = $row['Name'];
                            $fname = $row['First Name'];
                            $lname = $row['Last Name'];
                            $mname = $row['mName'];
                            $dob = $row['DoB'];
                            $gender = $row['Gender'];
                            $contact = $row['Contact'];
                            $email = $row['Email'];
                            $department = $row['Department'];
                            $duties = $row['Function'];
                           
                           
                           
                           

                            $data[] = array('Image'=>$image,
                                          'StaffId' =>$staffId,
                                          'Name' =>$name,
                                          'fname' =>$fname,
                                          'lname' =>$lname,
                                          'mname' =>$mname,
                                          'DOB' =>$dob,
                                          'Gender'=>$gender,
                                          'Contact'=>$contact,
                                          'Email'=>$email,
                                         
                                          'Duties'=>$duties,
                                          'Department'=>$department);

                            
                           
                         }
                          echo json_encode($data);
                        }
    break;

    case 'deleteStudent':

                        $studId = $_POST['StudId'];
                        $name = "";

                        $getinfo = "SELECT * FROM `students` WHERE `regId`= '$studId'";
                        $result = mysqli_query($db,$getinfo);
                        if($result){
                            while($rows= mysqli_fetch_array($result)){
                                $oldImage = $rows['Image'];
                                $name = $rows['Name'];

                                if($oldImage=="images/default.jpg"){

                                }
                                else{
                                    unlink("../".$oldImage);
                                }
                
                               
                
                            }
                        }

                        $sql = "DELETE FROM `students` WHERE `regId`= '$studId'";
                        $res = mysqli_query($db,$sql);
                        if($res){
                            echo  $name."\nRecords is Successfully Deleted";
                            
                        }
    break;

    case 'deleteStaff':

        $staffId = $_POST['StaffId'];
        $name = "";

        $getinfo = "SELECT * FROM `staff` WHERE `regId`= '$staffId'";
        $result = mysqli_query($db,$getinfo);
        if($result){
            while($rows= mysqli_fetch_array($result)){
                $oldImage = $rows['Image'];
                $name = $rows['Name'];

                if($oldImage=="images/default.jpg"){

                }
                else{
                    unlink("../".$oldImage);
                }

               

            }
        }

        $sql = "DELETE FROM `staff` WHERE `regId`= '$staffId'";
        $res = mysqli_query($db,$sql);
        if($res){
            echo  $name."\nRecords is Successfully Deleted";
            
        }
break;

case 'addClass': 
                $prompt = "";
               
                $className = $_POST['className'];
                $query2 = "SELECT `Class` FROM `class` WHERE Class ='".$className."'";
                $res2 = mysqli_query($db, $query2);
                $number2 = mysqli_num_rows($res2);
                if($number2 ==0){
                        $sql = "INSERT INTO class (Class) 
                        VALUES ('$className')";
                        $res = mysqli_query($db, $sql);
                        if($res){
                            echo $className." is added to class list.";
                           // $data[] = array('prompt'=> $prompt);
                           // echo json_encode($data);
                        }
                }
                else{
                   echo $className." is already added to class list.";
                    //$data[] = array('prompt'=> $prompt);
                    
                }
               
break;
case 'classList':
                    $sql = "SELECT * FROM `class` ORDER BY `Class`";
                    $res = mysqli_query($db,$sql);
                    foreach ($res as $ClassList) {
                        $classname = $ClassList['Class'];
                        $classes [] = array('ClassList' =>$classname);
                    }

                    echo json_encode($classes);

break;

case 'UpdateClass':

            $oldclassValue = $_POST['oldclassValue'];
            $getNewValue = $_POST['getNewValue'];
    
            $sql = "UPDATE `class` SET `Class`='$getNewValue' WHERE `Class`='$oldclassValue'";
            $res = mysqli_query($db, $sql);
            if($res){
                echo('Done');
            }

break;

case 'RemoveClass':

            $getValue = $_POST['getValue'];
                
            $sql="DELETE FROM `class` WHERE `Class`= '$getValue'";
            $res = mysqli_query($db,$sql);
            if($res){
                echo "Done";
            }

break;

case 'subjectList':
    $sql = "SELECT * FROM `subject` ORDER BY `Subject`";
    $res = mysqli_query($db,$sql);
    foreach ($res as $SubjectList) {
        $subjectname = $SubjectList['Subject'];
        $subjects [] = array('SubjectList' =>$subjectname);
    }

    echo json_encode($subjects);

break;
case 'getsubjectList':
     

   // echo'';
   
    $sql = "SELECT * FROM `subject` ORDER BY `Subject`";
    $res = mysqli_query($db,$sql);
   
    foreach ($res as $SubjectList) {
        
        echo '<option value="">'.$SubjectList['Subject'].'</option>';
                                            
                                        
    }
  
   // echo '</select>';

    // echo'<script>
    //         jQuery(document).ready(function() {
    //             jQuery(".standardSelect").chosen({
    //                 disable_search_threshold: 10,
    //                 no_results_text: "Oops, nothing found!",
    //                 width: "100%"
    //             }).change(function(event){
                            
    //                 if(event.target == this){
                  

    //                     var myValue = $(this).val();
    //                    console.log(myValue)
    //                 }
            
    //         });
    //         });
    //     </script>';

   

break;
case 'addSubject': 
    $prompt = "";
   
    $subjectName = $_POST['subjectName'];
    $query2 = "SELECT `Subject` FROM `subject` WHERE `Subject` ='".$subjectName."'";
    $res2 = mysqli_query($db, $query2);
    $number2 = mysqli_num_rows($res2);
    if($number2 ==0){
            $sql = "INSERT INTO `subject` (`Subject`) 
            VALUES ('$subjectName')";
            $res = mysqli_query($db, $sql);
            if($res){
                echo $subjectName." is added to subject list.";
               // $data[] = array('prompt'=> $prompt);
               // echo json_encode($data);
            }
    }
    else{
       echo $subjectName." is already added to subject list.";
        //$data[] = array('prompt'=> $prompt);
        
    }
   
break;

case 'UpdateSubject':

    $oldclassValue = $_POST['oldclassValue'];
    $getNewValue = $_POST['getNewValue'];

    $sql = "UPDATE `subject` SET `Subject`='$getNewValue' WHERE `Subject`='$oldclassValue'";
    $res = mysqli_query($db, $sql);
    if($res){
        echo('Done');
    }

break;

case 'RemoveSubject':

    $getValue = $_POST['getValue'];
        
    $sql="DELETE FROM `subject` WHERE `Subject`= '$getValue'";
    $res = mysqli_query($db,$sql);
    if($res){
        echo "Done";
    }

break;
// club
case 'clubList':
    $sql = "SELECT * FROM `club` ORDER BY `Club`";
    $res = mysqli_query($db,$sql);
    foreach ($res as $ClubList) {
        $clubname = $ClubList['Club'];
        $clubs [] = array('ClubList' =>$clubname);
    }

    echo json_encode($clubs);

break;

case 'addClub': 
    $prompt = "";
   
    $clubName = $_POST['clubName'];
    $query2 = "SELECT `Club` FROM `club` WHERE `Club` ='".$clubName."'";
    $res2 = mysqli_query($db, $query2);
    $number2 = mysqli_num_rows($res2);
    if($number2 ==0){
            $sql = "INSERT INTO `club` (`Club`) 
            VALUES ('$clubName')";
            $res = mysqli_query($db, $sql);
            if($res){
                echo $clubName." is added to club list.";
               // $data[] = array('prompt'=> $prompt);
               // echo json_encode($data);
            }
    }
    else{
       echo $clubName." is already added to club list.";
        //$data[] = array('prompt'=> $prompt);
        
    }
   
break;

case 'RemoveClub':

    $getValue = $_POST['getValue'];
        
    $sql="DELETE FROM `club` WHERE `Club`= '$getValue'";
    $res = mysqli_query($db,$sql);
    if($res){
        echo "Done";
    }

break;

case 'UpdateClub':

    $oldclassValue = $_POST['oldclassValue'];
    $getNewValue = $_POST['getNewValue'];

    $sql = "UPDATE `club` SET `Club`='$getNewValue' WHERE `Club`='$oldclassValue'";
    $res = mysqli_query($db, $sql);
    if($res){
        echo('Done');
    }

break;

// house
case 'houseList':
                $sql = "SELECT * FROM `house`";
                $res = mysqli_query($db,$sql);
                foreach ($res as $HouseList) {
                    $housename = $HouseList['House'];
                    $houses[] = array('HouseList' =>$housename);
                }

                echo json_encode($houses);

break;

case 'addHouse': 
    $prompt = "";
   
    $houseName = $_POST['houseName'];
    $query2 = "SELECT `House` FROM `house` WHERE `House` ='".$houseName."'";
    $res2 = mysqli_query($db, $query2);
    $number2 = mysqli_num_rows($res2);
    if($number2 ==0){
            $sql = "INSERT INTO `house` (`House`) 
            VALUES ('$houseName')";
            $res = mysqli_query($db, $sql);
            if($res){
                echo $houseName." is added to house list.";
               // $data[] = array('prompt'=> $prompt);
               // echo json_encode($data);
            }
    }
    else{
       echo $houseName." is already added to house list.";
        //$data[] = array('prompt'=> $prompt);
        
    }
   
break;

case 'RemoveHouse':

    $getValue = $_POST['getValue'];
        
    $sql="DELETE FROM `house` WHERE `House`= '$getValue'";
    $res = mysqli_query($db,$sql);
    if($res){
        echo "Done";
    }

break;

case 'UpdateHouse':

    $oldclassValue = $_POST['oldhouseValue'];
    $getNewValue = $_POST['getNewValue'];

    $sql = "UPDATE `house` SET `House`='$getNewValue' WHERE `House`='$oldclassValue'";
    $res = mysqli_query($db, $sql);
    if($res){
        echo('Done');
    }

break;

case 'addPaymentType':

   
    $feeName = $_POST['feeName'];
    $setClass = $_POST['setClass'];
    $amount = $_POST['amount'];
    

    if($feeName ==""){
        $prompt = "Please enter fee name.";

        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }

    else if(empty($setClass)){
        $prompt = "Please select class.";

        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }
    else if(empty($amount)){
        $prompt = "Please enter amount";
        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }

    elseif (!empty($feeName) && !empty($setClass) && !empty($amount) ) {

        $check = "SELECT * FROM `payment_category`  WHERE `Category` ='$feeName' AND `Department`= '$setClass'";
        $res = mysqli_query($db,$check);
        if(mysqli_num_rows($res)<1){

            $sql = "INSERT INTO `payment_category` (`Category`,`Amount`,`Department`) VALUES ('$feeName','$amount','$setClass')";
            $results = mysqli_query($db, $sql);
    
            if ($results) {
    
                $prompt = $feeName. " for ".$setClass." is added to fees setup.";
                $data[] =  array('prompt' => $prompt,'url' =>'addfees.html');
    
    
                echo json_encode($data);
            }

        }
        if(mysqli_num_rows($res)>0){
            $prompt = $feeName. " is already added to fees setup.";
            $data[] =  array('prompt' => $prompt);
            echo json_encode($data);

        }

       
    
    }

break;





case 'FeesData':

     $sql= "SELECT * FROM `payment_category` ORDER BY `Department`";
     $res = mysqli_query($db,$sql);
     foreach ($res as $row) {
     
        $feeName = $row['Category'];
        $amount = $row['Amount'];
        $setClass = $row['Department'];
        $id = $row['id'];

        $data[] = array(
            'PaymentType'=>$feeName,
            'Class'=>$setClass,
            'Amount'=>$amount,
            'id'=>$id
           );
    }
      echo json_encode($data);
    
break;

case 'delete_feeSetup':
                $id = $_POST['id'];
            $sql = "DELETE FROM `payment_category` WHERE `id` = $id";
            $result = mysqli_query($db,$sql);
            if($result){
                echo "Successful";
            }

break;

case 'updatePaymentType':

   
    $feeName = $_POST['feeName'];
    $setClass = $_POST['setClass'];
    $amount = $_POST['amount'];
    $id    = $_POST['id'];

    $feeName_old = "";
    $amount_old = "";
    $setClass_old = "";

    // $query = "SELECT * FROM `payment_category` WHERE `id` = '$id'";
    // $res = mysqli_query($db,$sql);

    // foreach($res as $rowData){
    //     $feeName_old = $rowData['Category'];
    //     $amount_old = $rowData['Amount'];
    //     $setClass_old = $rowData['Department'];
    // }
    

    if($feeName ==""){
        $prompt = "Please enter fee name.";

        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }

    else if(empty($setClass)){
        $prompt = "Please select class.";

        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }
    else if(empty($amount)){
        $prompt = "Please enter amount";
        $data[] =  array('prompt' => $prompt);

        echo json_encode($data);

    }

    elseif (!empty($feeName) && !empty($setClass) && !empty($amount) ) {

        $check = "SELECT * FROM `payment_category`  WHERE `Category` ='$feeName' AND `Department`= '$setClass' AND `Amount`= '$amount'";
        $res = mysqli_query($db,$check);
        if(mysqli_num_rows($res)<1){

            $sql = "UPDATE `payment_category` SET `Category` ='$feeName',`Amount`='$amount',`Department` = '$setClass'
             WHERE id = $id";
            $results = mysqli_query($db, $sql);
    
            if ($results) {
    
                $prompt = "Update Successful";
                $data[] =  array('prompt' => $prompt,'url' =>'addfees.html');
    
    
                echo json_encode($data);
            }

        }
        if(mysqli_num_rows($res)>0){
            $prompt = $feeName. " is already added to fees setup or No change was made.";
            $data[] =  array('prompt' => $prompt);
            echo json_encode($data);

        }

       
    
    }

break;

case 'getClassList':
                    $classLevel = $_POST['classLevel'];
                   echo '<label for="selectClass" class="control-label mb-1">Select Student </label>';

                    echo '<select data-placeholder="Choose a Student..." class="standardSelect" id="ClassList">
                    <option   value="">Choose a Student...</option>';
                   
                        $sql = "SELECT * FROM `students` WHERE `Class`= '$classLevel'";
                        $result = mysqli_query($db,$sql);
                        foreach($result as $rows){
                            echo '<option  id="classList" value="'. $rows['Name'].'">'. $rows['Name'].'</option>';
                        }
                  
                    echo '</select>';
                    echo '<script> jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
                        {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
                        }).change(function(event){
                            
                            if(event.target == this){
                          

                                var studentName= $(this).val();
                                $(".setStudentName").val(studentName);
                                getPaymentType();
                            }
                    
                    });
                     });
                       
                       
                    </script>';
break;

case 'getPaymentType':
    $classLevel = $_POST['classLevel'];
   echo '<label for="feeName" class="control-label mb-1">Fee Type </label>';

    echo '<select data-placeholder="Choose Payment Type..." class="standardSelect" id="getPaymentType">
    <option  id="classList" value="">Choose Payment Type...</option>';
    
   
        $sql = "SELECT * FROM `payment_category` WHERE `Department`= '$classLevel'";
        $result = mysqli_query($db,$sql);
        foreach($result as $rows){
            $Category = $rows['Category'];

            $amount = $rows['Amount'];

            $payment_Category = $Category." / GHS".$amount;

            echo ' <option value="'.$Category.'">'.$payment_Category.'</option>';
        }
  
    echo '</select>';
    echo '<script> jQuery(document).ready(function() {
        
            jQuery(".standardSelect").chosen(
            {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" }).change(function(event){
                                
                if(event.target == this){
            

                    var setPaymentType= $(this).val();
                    $(".setPaymentType").val(setPaymentType);
                    makeEntry();
                }
        
        });
    
    
    
    
    
        });
    </script>';
break;

case 'getPaymentClass':
             $rowId = $_POST['rowId'];
             $classLevel="";

             $sql_class = "SELECT * FROM `student_payment` WHERE `id`= '$rowId'";
            $result_class = mysqli_query($db,$sql_class);
            foreach($result_class as $row){
                $classLevel = $row['Class'];
            }
            
  
            $sql = "SELECT * FROM `payment_category` WHERE `Department`= '$classLevel'";
            $result = mysqli_query($db,$sql);
            foreach($result as $rows){
                $Category = $rows['Category'];

            $amount = $rows['Amount'];

            $payment_Category = $Category." / GHS".$amount;

            $data[] = array(
                'PaymentType'=>$Category,
                'Amount'=>$amount
               
               );
        }
          echo json_encode($data);
   
break;


// fees payment

case 'feePayment':

                $studentName = $_POST['studentName'];
                $Category = $_POST['Category'];
                $amount = $_POST['amount'];
                $studentClass = $_POST['studentClass'];
                $term = $_POST['term'];
                $year = $_POST['year'];
                $balance = "";
                $Fixedamount="";
                $student="";
                $balanceBefore = null;
                $paidAmount = null;
                // get payment type amount
                $sql_category="SELECT Amount FROM `payment_category` WHERE Category = '$Category' AND Department = '$studentClass'";
         		 $results2 = mysqli_query($db,$sql_category);
          		while($rows2=mysqli_fetch_array($results2,MYSQLI_ASSOC)){ 
          			
          			$Fixedamount = $rows2['Amount'];
                  }
                  //get student payment record
                  $stud_payrecord="SELECT * FROM student_payment WHERE `Student Name` = '$studentName' AND Category = '$Category' AND `Class`='$studentClass'  
                  AND Term = '$term' AND `Year` = '$year' Limit 1";
                  $result = mysqli_query($db,$stud_payrecord);
                  if(mysqli_num_rows($result)>0){
                  while($rows=mysqli_fetch_array($result,MYSQLI_ASSOC)){
                    $student = $rows['Student Name'];
                    $paidAmount = $rows['Amount'];
                    $balanceBefore = $rows['Balance'];
                    }

                        if($balanceBefore==0){
                            echo $student." has paid ".$Category." in full.";
                        }

                        else if($amount>$balanceBefore){
                            echo "The amount entered is more then the required balance  (GHS".$balanceBefore.")";
                        }
                        else{
                            $sum = $amount+$paidAmount;
                            $balance = ($Fixedamount - $sum);
                            $bal = "UPDATE `student_payment` SET Amount = '$sum', `Balance`='$balance' WHERE `Student Name` = '$studentName' AND Category = '$Category' AND `Class`='$studentClass' AND Term = '$term' AND `Year` = '$year'";
                            $res = mysqli_query($db, $bal);

                            if($res){
                                echo "
                                <div class='cardwrap' id='div1'>
                           
                                <img class='crest' src='images/favicon.png' alt='crest' />
                                <div class='container'>
                                <h1>Scholar</h1>
                              <h4>Payment Reciept</h4>
                              <h4>".$Category." </h4>
                              <h5>".$term." (".$year.") </h5>
                              <div class='wrap'>
                              <p class='lable' >Name:</p>
                              <p class='dotted'>".$studentName." </p></div>
                              <div class='wrap'>
                              <p class='lable'>Amount: </p>
                              <p class='dotted'>GHS".$amount." </p></div>
                              <div class='wrap'>
                              <p class='lable'>Balance:</p>
                              <p class='dotted'>GHS".$balance." </p></div>
                              <div class='wrap'>
                              <p class='lable'>Date: </p>
                              <p class='dotted'>" .date('d/M/Y')." </p></div>

                              <div class='wrap' style='margin-left:190px' >
                              <p class='lable' style='width:95px' >Stamp/Sign: </p>
                              <p class='dotted' style='padding-top:20px; width:50%'  > </p>
                              </div>
                              <div class='container'>
                             
                          </div>


				          			";
                            }
                        }
                
                }
                else if(mysqli_num_rows($result)==0){

                    if($amount>$Fixedamount){
                        echo "The amount entered is more than the required amount (GHS".$Fixedamount.")";
                     }
                     else{

                        $balance_amount = $Fixedamount-$amount;
                        $sql = "INSERT INTO `student_payment`(`Student Name`,`Class`, `Category`, `Amount`, `Balance`, `Term`, `Year`) 
                        VALUES ('$studentName','$studentClass','$Category','$amount','$balance_amount','$term','$year')";
                        $results = mysqli_query($db, $sql);
                        if($results){
                            echo "
					          					 
                            <div class='cardwrap' id='div1'>
                           
                            <img class='crest' src='images/favicon.png' alt='crest' />
                            <div class='container'>
                            <h1>Scholar</h1>
                          <h4>Payment Reciept</h4>
                          <h4>".$Category." </h4>
                          <h5>".$term." (".$year.") </h5>
                          <div class='wrap'>
                          <p class='lable' >Name:</p>
                          <p class='dotted'>".$studentName." </p></div>
                          <div class='wrap'>
                          <p class='lable'>Amount: </p>
                          <p class='dotted'>GHS".$amount." </p></div>
                          <div class='wrap'>
                          <p class='lable'>Balance:</p>
                          <p class='dotted'>GHS".$balance_amount." </p></div>
                          <div class='wrap'>
                          <p class='lable'>Date: </p>
                          <p class='dotted'>" .date('d/M/Y')." </p></div>
                          <div class='wrap' style='margin-left:190px' >
                          <p class='lable' style='width:95px' >Stamp/Sign: </p>
                          <p class='dotted' style='padding-top:20px; width:50%'  > </p>
                          </div>
                          <div class='container'>
                      </div>
												

					          			";
                        }
                     }

                    
                }

                    

break;

case 'FeesPayment':

                    $sql= "SELECT * FROM `student_payment` ORDER BY `Year`";
                    $res = mysqli_query($db,$sql);
                    foreach ($res as $row) {
                    
                    $studentName = $row['Student Name'];
                    $amount = $row['Amount'];
                    $Balance = $row['Balance'];
                    $studentClass = $row['Class'];
                    $paymentType = $row['Category'];
                    $term = $row['Term'];
                    $year = $row['Year'];
                   
                    $id = $row['Id'];

                    $data[] = array(
                        'studentName'=>$studentName,
                        'Balance'=>$Balance,
                        'Amount'=>$amount,
                        'paymentType'=>$paymentType,
                        'studentClass'=>$studentClass,
                        'Term'=>$term,
                        'Year'=>$year,
                        
                        'id'=>$id
                        );
                }
                    echo json_encode($data);

break;

    case 'delete_feePayment':
                        $id = $_POST['id'];
                        $sql = "DELETE FROM `student_payment` WHERE `Id` = $id";
                        $result = mysqli_query($db,$sql);
                        if($result){
                            echo "Successful";
                        }


break;


case 'updatePayment':
    $rowId = $_POST['rowId'];
    $paymenttype = $_POST['paymenttype'];
    $getterm = $_POST['getterm'];
    $paidAmount = $_POST['getamountpaid'];
    $studentName="";
    $amount_old = "";
    $Balance_old ="";
    $studentClass_old = "";
    $paymentType_old = "";
    $term_old ="";
    $Fixedamount ="";
    $balanceBefore="";
    
  
    $sql= "SELECT * FROM `student_payment` WHERE Id='$rowId'";
    $res = mysqli_query($db,$sql);
    foreach ($res as $row) {
    
    $studentName = $row['Student Name'];
    $amount_old = $row['Amount'];
    $Balance_old = $row['Balance'];
    $studentClass_old = $row['Class'];
    $paymentType_old = $row['Category'];
    $term_old = $row['Term'];
    $id = $row['Id'];
   }
    // get payment type amount
     $sql_category="SELECT Amount FROM `payment_category` WHERE Category = '$paymenttype' AND Department = '$studentClass_old'";
     $results = mysqli_query($db,$sql_category);
        foreach($results as $rows){
         
         $Fixedamount = $rows['Amount'];
     }

     if($paidAmount<=$Fixedamount){
        $balance = $Fixedamount - $paidAmount;
        $sql = "UPDATE  `student_payment` 
        SET  `Category` = '$paymenttype', `Amount` = '$paidAmount', `Balance` = '$balance',  `Term` = '$getterm' WHERE Id = '$rowId'";
        $res = mysqli_query($db,$sql);
        if($res){
            echo "Update successful";
        }
        exit();
     }
    //  else if($paidAmount>$Balance_old){
    //  echo "You have entered more than the required balance (GHS".$Balance_old.")";
    //  exit();
    // }

 else if($paidAmount>$Fixedamount){
    echo "You have entered more than the required amount (GHS".$Fixedamount.")";
    exit();
 }
break;
//AddAnnouncement
case 'AddAnnouncement':
                        $announcement = $_POST['getValue'];
                        $sql = "INSERT INTO `announcement` (`Announcement`) VALUES('$announcement')";
                        $res = mysqli_query($db,$sql);
                        if($res){
                            $id = mysqli_insert_id($db);
                            $prompt = "Done.";
                            $data[]=array('Announcement'=>$announcement,'prompt'=>$prompt,'id'=>$id);

                            echo json_encode($data);
                        }
                    

break;

case 'removeAnnouncement':
                            $id =$_POST['id'];
                            $sql = "DELETE FROM `announcement` WHERE `id`= '$id'";
                            $res=mysqli_query($db,$sql);
                            if($res){
                                echo "Done.";
                            }
break;

case 'makeVisible':
                    $id =$_POST['id'];
                    $sql = "SELECT * FROM `announcement` WHERE `id` = '$id'";
                    $res = mysqli_query($db,$sql);
                    foreach($res as $row){
                        $status = $row['Status'];

                        if($status == 0){
                            $sql1 = "UPDATE `announcement` SET `Status`='1' WHERE `id` = '$id'";
                            $result = mysqli_query($db,$sql1);
                            if($result){
                                echo "Announcement set to not visible";
                            }
                        }
                        else if($status == 1){
                            $sql1 = "UPDATE `announcement` SET `Status`='0' WHERE `id` = '$id'";
                            $result = mysqli_query($db,$sql1);
                            if($result){
                                echo "Announcement set to visible";
                            }
                        }
                    }


break;

case 'currentAnnouncement':
                            $sql = "SELECT * FROM `announcement` WHERE `Status`= '0' ORDER BY RAND() LIMIT 1";
                            $res = mysqli_query($db,$sql);
                            if($res){
                                foreach($res as $row){
                                    $announcement = $row['Announcement'];

                                    echo $announcement;


                                }
                            }

break;

case 'getParentContact':
     $id="";
     $studentName= "";
     $parentEmail="";
     $parent = (array) null;
    $getClass = $_POST['getClass'];
     //echo'<select data-placeholder="Send message to..." id="parentContacts" style="margin:10px 0" multiple class="standardSelect">';
    
     $sql = "SELECT * FROM `students` Where `Class` = '$getClass'";
     $res = mysqli_query($db,$sql);
   if( mysqli_num_rows($res)>0){

    foreach ($res as $info) {
        $studentName = $info['Name'];
        $parentEmail = $info['Email'];

      $sql1 = "SELECT * FROM `users` WHERE `Username` = '$parentEmail'";
      $result = mysqli_query($db,$sql1);
    
            foreach ($result as $row) {
            $id = $row['UserId'];
        
      }
         $parent []= array ("name"=> $studentName,"parentEmail"=> $parentEmail,"id" =>$id);
         

     }
     
   }
     
   echo json_encode($parent);
    
 
 break;
 
    default:
            # code...
            break;
    }

}

