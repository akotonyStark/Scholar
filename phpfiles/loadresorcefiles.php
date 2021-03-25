<?php

include 'db.php';

if(isset($_POST)){
    $action = $_POST['action'];


    switch ($action) {
        case 'loadresorcefiles':
                                $sql = "SELECT * FROM `learningdb`";
                                $res = mysqli_query($db,$sql);
                                if($res){
                                    if(mysqli_num_rows($res)>0){

                                        $message = "Data found";
                                    
                                    foreach($res as $rows){
                                        $title = $rows['Title'];
                                        $summary = $rows['Summary'];
                                        $type = $rows['Type'];
                                        $fileurl = $rows['File'];
                                        $rowId = $rows['id'];
                                        $userId = $rows['UserId'];

                                        $data[]=array(
                                               'message'=>$message,
                                                'Title'=>$title,
                                                'Summary'=>$summary,
                                                'Type'=>$type,
                                                'FileUrl'=>$fileurl,
                                                'UserId'=>$userId,
                                                'RowId'=>$rowId

                                        );
                                    }

                                    echo json_encode($data);}
                                    if(mysqli_num_rows($res)<1){
                                        $message = "Oops!! No resource material found";

                                        $data[]=array('message'=>$message);

                                        echo json_encode($data);

                                    }
                                }
            break;

        case 'removeresorcefiles':

                                $id = $_POST['rowId'];
                                $getinfo = "SELECT * FROM `learningdb` WHERE `id`= '$id'";
                                $result = mysqli_query($db,$getinfo);
                                if($result){
                                    while($rows= mysqli_fetch_array($result)){
                                        $fileurl = $rows['File'];
                                       
                                        unlink("../".$fileurl);
                        
                                    }
                                }
                                $sql = "DELETE FROM `learningdb` WHERE `id` = '$id'";
                                $res = mysqli_query($db,$sql);
                                if($res){
                                    $message = "Done";
                                    $data[]=array('message'=>$message);
                                    

                                    echo json_encode($data);
                                }

        break;

        case 'searchresorcefiles':

                                    $find = $_POST['search'];

                                    $sql = "SELECT * FROM `learningdb` WHERE `Title` LIKE '%$find%'";
                                    $res = mysqli_query($db,$sql);
                                    if($res){
                                        if(mysqli_num_rows($res)>0){
                                            $message ="Recordes found";
                                            foreach($res as $rows){
                                                $title = $rows['Title'];
                                                $summary = $rows['Summary'];
                                                $type = $rows['Type'];
                                                $fileurl = $rows['File'];
                                                $rowId = $rows['id'];
                                                $userId = $rows['UserId'];

                                                $data[]=array(
                                                    'message'=>$message,
                                                     'Title'=>$title,
                                                     'Summary'=>$summary,
                                                     'Type'=>$type,
                                                     'FileUrl'=>$fileurl,
                                                     'UserId'=>$userId,
                                                     'RowId'=>$rowId
     
                                             );
                                            
                                            }
                                            echo json_encode($data);
                                        }

                                       else if(mysqli_num_rows($res)<1){
                                            $message = "Oops!! No resource material found";
    
                                            $data[]=array('message'=>$message);
    
                                            echo json_encode($data);
    
                                        }
                                    }

        break;
        
        default:
            # code...
            break;
    }






















}