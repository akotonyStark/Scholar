<?php

session_start();
$userId = $_SESSION['userId'];

include 'db.php';

if(isset($_POST)){
    $action = $_POST['action'];

    switch ($action) {

        case 'getUserlevel':

            $userlevel = $_POST['userlevel'];
            $sql = "";
            if($userlevel == '2'){

              

            //  echo '<select data-placeholder="Choose a Student..." class="standardSelect" id="ClassList">
            //  <option   value="">Choose a Student...</option>';
            
                 $sql = "SELECT * FROM `students`";
                 $result = mysqli_query($db,$sql);

                  
                 
                 foreach($result as $rows){
                    $studentName =  $rows['Name'];
                    $studentId=  $rows['regId'];
                    $studentClass=  $rows['Class'];

                     $students[] = array
                                                    ("name"=> $studentName, 
                                                    "studentId"=> $studentId, 
                                                    "studentClass"=> $studentClass
                                                    );
                    //  echo '<option  id="classList" value="'.$studentId.'">'. $studentName.' ('.$studentClass.')</option>';
                 }
                 echo json_encode($students);
           
            //  echo '</select>';
            //  echo '<script> jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
            //      {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
            //      }).change(function(event){
                     
            //          if(event.target == this){
                   

            //              var getId= $(this).val();
                        
                            
            //                  $(".setSendTo").val(getId);
                        
                         
            //          }
             
            //  });
            //   });
                
                
            //  </script>';

            }

            else if($userlevel == '3'){

               

            //  echo '<select data-placeholder="Choose a Student..." class="standardSelect" >
            //  <option   value="">Choose a Staff...</option>';
            
                 $sql = "SELECT * FROM `staff`";
                 $result = mysqli_query($db,$sql);

                    
                 
                 foreach($result as $rows){
                    $staffName =  $rows['Name'];
                    $staffId=  $rows['regId'];
                    $Department=  $rows['Department'];

                      $staff[] = array
                                                    ("name"=> $staffName, 
                                                    "id"=> $staffId, 
                                                    "department"=> $Department
                                                    );

                     
                 }
            echo json_encode($staff);
            //  echo '</select>';
            //  echo '<script> jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
            //      {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
            //      }).change(function(event){
                     
            //          if(event.target == this){
                   

            //              var getId= $(this).val();
            //              $(".setSendTo").val(getId);
                         
            //          }
             
            //  });
            //   });
                
                
            //  </script>';

            }
            else if($userlevel == '1'){

             

           
             echo '<select data-placeholder="Choose a Student..." class="standardSelect" >';
             echo'<option   value="">Choose a Admin...</option>';
            
            
                 $sql = "SELECT * FROM `users` WHERE `UserLevel` = '1'";
                 $result = mysqli_query($db,$sql);

                    
                    
                 
                 foreach($result as $rows){
                    $Name =  $rows['Username'];
                    $Id=  $rows['UserId'];
                     echo '<option  value="'.$Id.'">'. $Name.' (Administration)</option>';
                 }
           
             echo '</select>';
             echo '<script> jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
                 {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
                 }).change(function(event){
                     
                     if(event.target == this){
                   

                         var getId= $(this).val();
                         $(".setSendTo").val(getId);
                         
                     }
             
             });
              });
                
                
             </script>';

            }

            else if($userlevel == '4'){

             

           
                // echo '<select data-placeholder="Choose a Student..." class="standardSelect" >';
                // echo'<option   value="">Choose Parent email...</option>';
               
               
                    $sql = "SELECT * FROM `users` WHERE `UserLevel` = '4'";
                    $result = mysqli_query($db,$sql);
   
                       
                       
                    
                    foreach($result as $rows){
                       $email =  $rows['Username'];
                       $Id=  $rows['UserId'];
                        //echo '<option  value="'.$Id.'">'. $email.' (Parent)</option>';
                    $parent[] = array
                                                    ("name"=> $email, 
                                                    "id"=> $Id
                                                    );

                     
                 }
            echo json_encode($parent);
              
                // echo '</select>';
                // echo '<script> jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
                //     {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
                //     }).change(function(event){
                        
                //         if(event.target == this){
                      
   
                //             var getId= $(this).val();
                //             $(".setSendTo").val(getId);
                            
                //         }
                
                // });
                //  });
                   
                   
                // </script>';
   
               }

            
        break;

        case 'sendMessage':

                                $userid = $_POST['userid'];
                                $sendTo = $_POST['setSendTo'];
                                $message = $_POST['message'];
                                $title = $_POST['title'];
                                $res = "";
                                //$sendto = $_POST['sendto'];
                                $arr = explode(',',$sendTo);
                                $newList = array_unique($arr);
                                foreach($newList as $value){

                                $sql="INSERT INTO `mailbox`(`senderId`, `receiverId`, `Title`, `Message`) 
                                VALUES ('$userid','$value','$title','$message')";
                                $res = mysqli_query($db,$sql);
                                }
                                if($res){
                                        echo "Sent";
                                    }





        break;
        case 'sendMessage_all':

            $userid = $_POST['userid'];
            $sendtoAll = trim($_POST['sendtoAll']);
            $message = $_POST['message'];
            $title = $_POST['title'];
            if($sendtoAll=="Students"){
                $getStudent = "SELECT * FROM `users` WHERE `UserLevel`= 2";
                $result = mysqli_query($db,$getStudent);
                foreach($result as $rows){
                    $sendTo = $rows['UserId'];
                    $sql="INSERT INTO `mailbox`(`senderId`, `receiverId`, `Title`, `Message`) 
                    VALUES ('$userid','$sendTo','$title','$message')";
                    $res = mysqli_query($db,$sql);
                    if($res){
                        echo "Sent";
                    }
                }
            }
            else if($sendtoAll=="Staff"){
                $getStudent = "SELECT * FROM `users` WHERE `UserLevel`= 3";
                $result = mysqli_query($db,$getStudent);
                foreach($result as $rows){
                    $sendTo = $rows['UserId'];
                    $sql="INSERT INTO `mailbox`(`senderId`, `receiverId`, `Title`, `Message`) 
                    VALUES ('$userid','$sendTo','$title','$message')";
                    $res = mysqli_query($db,$sql);
                    if($res){
                        echo "Sent";
                    }
                }
            }
            else if($sendtoAll=="Parent"){
                $getStudent = "SELECT * FROM `users` WHERE `UserLevel`= 4";
                $result = mysqli_query($db,$getStudent);
                foreach($result as $rows){
                    $sendTo = $rows['UserId'];
                    $sql="INSERT INTO `mailbox`(`senderId`, `receiverId`, `Title`, `Message`) 
                    VALUES ('$userid','$sendTo','$title','$message')";
                    $res = mysqli_query($db,$sql);
                    if($res){
                        echo "Sent";
                    }
                }
            }

           



break;
        case 'InboxMessages':

                                $userid = $_POST['userid'];
                                $name ="";
                                $sql="SELECT * FROM `mailbox` WHERE `receiverId` = '$userid'";
                                $res = mysqli_query($db,$sql);
                                if(mysqli_num_rows($res)>0){
                                    foreach($res as $rows){
                                        $senderId = $rows['senderId'];

                                        $sql_sender= "SELECT * FROM `users` WHERE `UserId` = '$senderId'";
                                        $result = mysqli_query($db,$sql_sender);
                                       
                                            foreach($result as $info){
                                                $userLevel = $info['UserLevel'];
                                                if($userLevel=='1'){
                                                    $name = "Administration";
                                                }
                                                else if($userLevel=='4'){
                                                    $name =  $info['Username'];
                                                }
                                                else if($userLevel=='2'){
                                                    $sql_stud = "SELECT * FROM `students` WHERE `regId` = '$senderId'";
                                                    $res_stud = mysqli_query($db,$sql_stud);
                                                    foreach($res_stud as $stud){
                                                        $name = $stud['Name'];
                                                    }
                                                   
                                                }
                                                else if($userLevel=='3'){
                                                    $sql_staff = "SELECT * FROM `staff` WHERE `regId` = '$senderId'";
                                                    $res_staff = mysqli_query($db,$sql_staff);
                                                    foreach($res_staff as $staff){
                                                        $name = $staff['Name'];
                                                    }
                                                   
                                                }
                                                else{
                                                    $name = "Unknown";
                                                }
                                            
                                        }
                                       
                                        $title = $rows['Title'];
                                        $message = $rows['Message'];
                                        $date = $rows['Date'];
                                        $status = $rows['Status'];
                                        $messageId = $rows['id'];

                                        $data[]= array(
                                            "Prompt" => 'True',
                                            "Name" => $name,
                                            "Title"=>$title,
                                            "Message"=>$message,
                                            "Date"=>$date,
                                            "Status"=>$status,
                                            "MessageId"=>$messageId
                                        );
                                    }

                                    echo json_encode($data);
                                   
                                }
                                else if(mysqli_num_rows($res)<1){
                                    $data[]= array(
                                        "Prompt" => 'False'
                                    );

                                    echo json_encode($data);

                                }

            break;
case 'getMessages':

                $id = $_POST['id'];
                $name ="";
                $image="";
                
                $sql="SELECT * FROM `mailbox` WHERE `id` = '$id' LIMIT 1";
                $res = mysqli_query($db,$sql);

                $marks_read="UPDATE `mailbox` SET `Status`='1' WHERE `id` = '$id'";
                $res_read = mysqli_query($db,$marks_read);
                if(mysqli_num_rows($res)>0){
                    foreach($res as $rows){
                        $senderId = $rows['senderId'];

                        $sql_sender= "SELECT * FROM `users` WHERE `UserId` = '$senderId'";
                        $result = mysqli_query($db,$sql_sender);
                       
                            foreach($result as $info){
                                $userLevel = $info['UserLevel'];
                                if($userLevel=='1'){
                                    $name = "Administration";
                                    $image = "images/default.jpg";
                                }
                                else if($userLevel=='4'){
                                    $name =  $info['Username'];

                                }
                                else if($userLevel=='2'){
                                    $sql_stud = "SELECT * FROM `students` WHERE `regId` = '$senderId'";
                                    $res_stud = mysqli_query($db,$sql_stud);
                                    foreach($res_stud as $stud){
                                        $name = $stud['Name'];
                                        $image = $stud['Image'];
                                    }
                                   
                                }
                                else if($userLevel=='3'){
                                    $sql_staff = "SELECT * FROM `staff` WHERE `regId` = '$senderId'";
                                    $res_staff = mysqli_query($db,$sql_staff);
                                    foreach($res_staff as $staff){
                                        $name = $staff['Name'];
                                        $image = $staff['Image'];
                                    }
                                   
                                }
                                else{
                                    $name = "Unknown";
                                }
                            
                        }
                       
                        $title = $rows['Title'];
                        $message = $rows['Message'];
                        $date = $rows['Date'];
                       
                        $messageId = $rows['id'];

                        $data[]= array(
                            "Prompt" => 'True',
                            "Name" => $name,
                            "Title"=>$title,
                            "Message"=>$message,
                            "Date"=>$date,
                            "Image"=>$image,
                            "MessageId"=>$messageId
                        );
                    }

                    echo json_encode($data);
                   
                }
                else if(mysqli_num_rows($res)<1){
                    $data[]= array(
                        "Prompt" => 'False'
                    );

                    echo json_encode($data);

                }

break;
case 'getReplies':
                    $id = $_POST['id'];
                    $userId;
                    echo "<span>Replies</span>";
                    $sql = "SELECT * FROM `replymail` WHERE `senderId`='$userId' AND `messageId`='$id'";
                    $res = mysqli_query($db,$sql);
                    foreach ($res as $rows) {
                        $message = $rows['replymessage'];

                          echo "<p>".$message."</p>";
                        
                    }
    break;

case 'markAs':
                $id = $_POST['id'];
                $sql="SELECT * FROM `mailbox` WHERE `id` = '$id'";
                $res = mysqli_query($db,$sql);
                foreach($res as $info){
                    if($info['Status']==1){
                        $marks_read="UPDATE `mailbox` SET `Status`='0' WHERE `id` = '$id'";
                        $res_read = mysqli_query($db,$marks_read);

                    }
                    else if($info['Status']==0){
                        $marks_read="UPDATE `mailbox` SET `Status`='1' WHERE `id` = '$id'";
                        $res_read = mysqli_query($db,$marks_read);

                    }
                }

               

break;

case 'delMessage':
                $id = $_POST['id'];

                $sql = "DELETE FROM `mailbox` WHERE `id`= '$id'";
                $res = mysqli_query($db,$sql);
                if($res){
                    echo "Done";
                }
break;


case 'replyMessage':
                    $messageId = $_POST['messageId'];
                    $reply_title = $_POST['reply_title'];
                    $reply_text = $_POST['reply_text'];

                    $senderId = "";
                    $recieverId = "";

                    //get sender id
                    $sql = "SELECT * FROM `mailbox` WHERE id = '$messageId'";
                    $res = mysqli_query($db,$sql);
                    foreach($res as $rowId){
                        $senderId = $rowId['senderId'];
                        $recieverId = $rowId['receiverId'];

                    }

                    $sql_reply="INSERT INTO `mailbox`(`senderId`, `receiverId`, `Title`, `Message`) 
                    VALUES ('$recieverId','$senderId','$reply_title','$reply_text')";
                    $result = mysqli_query($db,$sql_reply);
                    if($result){
                        $sql_r="INSERT INTO `replymail`(`senderId`, `receiverId`, `messageId`,`replymessage`) VALUES ('$recieverId','$senderId','$messageId','$reply_text')";
                        $res2 = mysqli_query($db,$sql_r);

                        echo "Sent";
                    }

break;
case 'sendM':
                $sendto = $_POST['sendto'];
                $arr = explode(',',$sendto);
                $newList = array_unique($arr);
                foreach($newList as $key){
                     echo $key;
                }
               
                
                
break;


    }
}