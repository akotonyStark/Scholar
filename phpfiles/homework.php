<?php
include 'db.php';

 //header('Content-type: text/html; charset=utf-8');

    if (isset($_POST)) {
        $action = $_POST['action'];

     
    switch ($action) {

        case 'LoadAllStaff':
                           
                            $name = "";
                            $previousHomework ="";
                            $availabbleHomework = "";
                            $message = "";
                            $staffId = "";
                            $subject = "";
                            $message = "";
                            $image ="";
                            $sql = "SELECT `Subject`,`StaffId`,COUNT(`Message`) AS Mess, COUNT(`StaffId`) AS TotalHomework FROM `homework`
                             Group BY `Subject`,`StaffId` Order By `Subject` ";
                            $result = mysqli_query($db,$sql);
                             foreach($result as $rows)
                             {
                                  $availabbleHomework = $rows['TotalHomework'];
                                   $subject = $rows['Subject'];
                                    $message = $rows['Mess'];
                                 $staffId = $rows['StaffId'];


                                 //get staff information
                                $sql_info = "SELECT * FROM `users` WHERE `UserId` = '$staffId'";
                                $res = mysqli_query($db,$sql_info);
                                foreach($res as $row)
                                {
                                    $name = $row['Username'];
                                    $image = $row['Image'];
                                    $level = $row['UserLevel'];

                                    if($level == 3){

                                        $sql_name = "SELECT `Name` FROM `staff` WHERE `regId` = '$staffId'";
                                        $res = mysqli_query($db,$sql_name);
                                        foreach($res as $res_row)
                                        {
                                            $name = $res_row['Name'];
                                        }
                                    }

                                }
                            
                                // //get staff homeworks
                                // $sql_homework = "SELECT COUNT(`StaffId`)AS Homeworks, COUNT(`Message`) AS Messages  FROM `homework` WHERE `StaffId` = '$staffId'";
                                // $resCount = mysqli_query($db,$sql_homework);
                                // foreach($resCount as $res_row)
                                // {
                                //     $previousHomework = $res_row['Homeworks'];
                                //      $message = $res_row['Messages'];
                                  
                                // }

                                //  //get subject
                                // $sql_subject= "SELECT `Subject` FROM `homework` WHERE `StaffId` = '$staffId'";
                                // $resSubject = mysqli_query($db,$sql_subject);
                                // foreach($resSubject as $row_sub)
                                // {
                                //     $subject = $row_sub['Subject'];
                                  
                                // }

                               
                                
                                 $staff[] = array
                                                    ("name"=> $name, 
                                                    "subject"=> $subject, 
                                                    "availabbleHomework"=> $availabbleHomework, 
                                                    "previousHomework"=>$previousHomework,
                                                     "message"=>$message,
                                                      "image"=>$image,
                                                      "id"=>$staffId
                                                    );
                            
                             }
                             

                            echo json_encode($staff);
        break;
        case 'submit':
                    $name = $_POST['teacherName'];
                    $subject = $_POST['subject'];
                    $homeworkTitle = $_POST['homeworkTitle'];
                    $message = $_POST['message'];
                    $userId = $_POST['userId'];
                     $file = $_FILES['homeworkFile']['tmp_name'];
                    $fileurl = "homework/".$_FILES['homeworkFile']['name'];
                    move_uploaded_file($file,"../".$fileurl);


                    $sql="INSERT INTO `homework`(`StaffId`,`Subject`, `Title`, `Message`,`HomeworkFile`) 
                    VALUES ('$userId','$subject','$homeworkTitle','$message','$fileurl')";
                    $res = mysqli_query($db,$sql);
                    if($res){
                        $homework[] = array
                                    ("messate"=> "Saved", 
                                    
                                    "userId"=>$userId
                                    );
            
                     echo json_encode($homework);

                    }

                     
    break;

    case 'SearchStaff':
                            $name = "";
                            $previousHomework ="";
                            $availabbleHomework = "";
                            $message = "";
                            $staffId = "";
                            $subject = "";
                            $message = "";
                            $image ="";
                            $search =$_POST['search'];
                            // echo 'finding....'; 
                            //  echo $search; 
                            $search =$_POST['search'];
                             $sql = "SELECT `Subject`,`StaffId`,COUNT(`Message`) AS Mess, COUNT(`StaffId`) AS TotalHomework FROM `homework`
                             Where `Subject` Like '%$search%' Group BY `Subject`,`StaffId` ";
                            $result = mysqli_query($db,$sql);
                           
                             foreach($result as $rows)
                             {
                                  $availabbleHomework = $rows['TotalHomework'];
                                   $subject = $rows['Subject'];
                                    $message = $rows['Mess'];
                                 $staffId = $rows['StaffId'];


                                 //get staff information
                                $sql_info = "SELECT * FROM `users` WHERE `UserId` = '$staffId'";
                                $res = mysqli_query($db,$sql_info);
                                foreach($res as $row)
                                {
                                    $name = $row['Username'];
                                    $image = $row['Image'];
                                    $level = $row['UserLevel'];

                                    if($level == 3){

                                        $sql_name = "SELECT `Name` FROM `staff` WHERE `regId` = '$staffId'";
                                        $res = mysqli_query($db,$sql_name);
                                        foreach($res as $res_row)
                                        {
                                            $name = $res_row['Name'];
                                        }
                                    }

                                }
                                
                                 $staff[] = array
                                                    ("name"=> $name, 
                                                    "subject"=> $subject, 
                                                    "availabbleHomework"=> $availabbleHomework, 
                                                    "previousHomework"=>$previousHomework,
                                                     "message"=>$message,
                                                      "image"=>$image,
                                                      "id"=>$staffId
                                                    );
                            
                             }
                             

                            echo json_encode($staff);
    break;

    case 'LoadHomeWorkList':
                              $subject =$_POST['subject'];
                                $staffId =$_POST['userId'];
                             $sql = "SELECT * FROM `homework` WHERE `StaffId` ='$staffId' AND `Subject` ='$subject'";
                            $result = mysqli_query($db,$sql);
                            foreach($result as $row)
                                        {
                                            $homeworkFile = $row['HomeworkFile'];
                                             $title = $row['Title'];
                                              $date = $row['Date'];
                                               $message = $row['Message'];
                                               $id = $row['Id'];

                                               $homework[] = array
                                    (
                                    "subject"=> $subject, 
                                    "title"=> $title,
                                    "homeworkFile"=> $homeworkFile, 
                                    "date"=> $date, 
                                    "message"=>$message,
                                    "id" =>$id,
                                    "staffId" =>$staffId
                                    
                                    );
                                        }
                           
                                    echo json_encode($homework);

    break;

    case 'RemoveHomework':
                            $id =$_POST['id'];

                              $sql = "SELECT * FROM `homework`  WHERE `Id` ='$id'";
                            $result = mysqli_query($db,$sql);
                            foreach ($result as $row) {
                               $homeworkfile = $row['HomeworkFile'];
                                unlink("../".$homeworkfile);
                            }
                            
                               
                            $sql = "DELETE FROM `homework` WHERE `Id` ='$id'";
                            $result = mysqli_query($db,$sql);
                            if($result){
                                echo "Done";
                            }
        break;


        }

    }