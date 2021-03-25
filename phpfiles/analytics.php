<?php

include 'db.php';

if(isset($_POST)){
    $action = $_POST['action'];

    switch ($action) {
        // students gender
        case 'studentsGender':
                         $sql = "SELECT * FROM `students` WHERE `Gender`='Male'";
                         $res = mysqli_query($db,$sql);
                         $maleCount = mysqli_num_rows($res);  
                         
                         $sql1 = "SELECT * FROM `students` WHERE `Gender`='Female'";
                         $res1 = mysqli_query($db,$sql1);
                         $femaleCount = mysqli_num_rows($res1);  

                         $data [] = array("Male"=>$maleCount,"Female"=>$femaleCount);

                         echo json_encode($data);
            break;
            case 'staffGender':
                $sql = "SELECT * FROM `staff` WHERE `Gender`='Male'";
                $res = mysqli_query($db,$sql);
                $maleCount = mysqli_num_rows($res);  
                
                $sql1 = "SELECT * FROM `staff` WHERE `Gender`='Female'";
                $res1 = mysqli_query($db,$sql1);
                $femaleCount = mysqli_num_rows($res1);  

                $data [] = array("Male"=>$maleCount,"Female"=>$femaleCount);

                echo json_encode($data);
   break;

   case 'studentsPopulation':
                            $sql = "SELECT DISTINCT(YEAR(`RegDate`)) AS YEAR,Count(*) AS Total FROM `students` GROUP BY YEAR";
                            $res = mysqli_query($db,$sql);

                            foreach($res as $row){
                               $year = $row['YEAR'];
                               $total = $row['Total'];

                               $data [] = array("Year"=>$year,"Total"=>$total);
                            }
                            
                            echo json_encode($data);
break;
        
        default:
            # code...
            break;
    }

   


}