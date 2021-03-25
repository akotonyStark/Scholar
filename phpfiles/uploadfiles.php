<?php 

    include 'db.php';

    session_start();
    $userId = $_SESSION['userId'];
    if (!array_key_exists('userId', $_SESSION) && empty($_SESSION['userId'])){

        header('Location:index.html?promt=login');
        exit();
    }
    

   if(isset($_POST)){


    $type = $_POST['type'];
    $title = $_POST['title'];
    $summary = $_POST['summary'];
    $file = $_FILES['sourceMaterial']['tmp_name'];
    $fileurl = "learningfiles/".$_FILES['sourceMaterial']['name'];
    move_uploaded_file($file,"../".$fileurl);


    $sql = "INSERT INTO `learningdb`(`Title`, `Summary`, `Type`, `File`, `UserId`) 
            VALUES('$title','$summary','$type','$fileurl','$userId')";
    $result = mysqli_query($db,$sql);
    $rowId = mysqli_insert_id($db);
    if($result){
            $promt = "Done."; 
             
           
            $output[]=array(
                'prompt' => $promt,
                'Title'=>$title,
                'Summary'=>$summary,
                'Type'=>$type,
                'FileUrl'=>$fileurl,
                'UserId'=>$userId,
                'RowId'=>$rowId

        );
            echo json_encode($output);
    }











   }