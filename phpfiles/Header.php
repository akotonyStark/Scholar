<?php
        $userType="";
        $name = "";
            session_start();
        $userId = $_SESSION['userId'];
        if (!array_key_exists('userId', $_SESSION) && empty($_SESSION['userId'])){

            header('Location:index.html?promt=login');
            exit();
        }
        include 'phpfiles/db.php';
        $userLevel ="";
        $username = "";
        $image = "";
        $sql = "SELECT * FROM `users` WHERE `UserId` = '$userId'";
        $res = mysqli_query($db,$sql);
        if(mysqli_num_rows($res)>0){
        foreach($res as $row){
            $userLevel = $row['UserLevel'];
            if($userLevel == 2){
                $sql = "SELECT * FROM `students` WHERE `regId` = '$userId'";
                $res = mysqli_query($db,$sql);
                foreach($res as $studimage){
                    $image = $studimage['Image'];
                    $name = $studimage['Name'];
                }
            }
            else if($userLevel == 3){
                $sql_staffimage = "SELECT * FROM `staff` WHERE `regId` = '$userId'";
                $res_staffimage = mysqli_query($db,$sql_staffimage);
                foreach($res_staffimage as $staffimage){
                    $image = $staffimage['Image'];
                    $name = $staffimage['Name'];
                }
            }
             else if($userLevel == 1){$name = "Admin";   $image = "images/default.jpg"; }
            else{
               
                    $image = "images/default.jpg";    
            }
            $username = $row['Username'];
           
        }
    
    
    }

?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" lang="en">
<!--<![endif]-->


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SCHOLAR</title>
    <meta name="description">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" href="images/faviconx.png">
    <link rel="shortcut icon" href="images/faviconx.png">

    <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="vendors/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendors/themify-icons/css/themify-icons.css">
    <link rel="stylesheet" href="vendors/flag-icon-css/css/flag-icon.min.css">
    <link rel="stylesheet" href="vendors/selectFX/css/cs-skin-elastic.css">
    <link rel="stylesheet" href="vendors/jqvmap/dist/jqvmap.min.css">
     <link rel="stylesheet" href="vendors/datatables.net-bs4/css/dataTables.bootstrap4.min.css">
        <link rel="stylesheet" href="vendors/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css">
         <link href="assets/bootstrap-summernote/summernote.css" rel="stylesheet" type="text/css" />

    <link rel="stylesheet" href="vendors/chosen/chosen.min.css">

 <script src="assets/js/moment.js"></script>
 <link rel="stylesheet" href="assets/css/style.css">
        <link rel="stylesheet" href="assets/css/float.css">

        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>

        <!-- Kendo CSS -->
        <link href="assets/kendo/css/kendo.default.mobile.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="assets/css/kendo.default.min.css">
        <link href="assets/kendo/css/kendo.bootstrap.min.css" rel="stylesheet" />
        <link href="assets/kendo/css/kendo.common.min.css" rel="stylesheet" />

        <!-- Kendo JS -->
        <script src="assets/js/jquery-1.9.1.min.js"></script>
        <script src="assets/js/kendo.all.min.js"></script>
        <script src="assets/kendo/js/kendo.web.min.js"></script>
        <script src="assets/kendo/js/knockout-3.1.0.js"></script>
        <script src="assets/kendo/js/knockout-kendo.min.js"></script>


        <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>

        <!-- toastr -->
        <link rel="stylesheet" href="assets/css/toastr.css">
        <script src="assets/js/toastr.js"></script>
         <script src="assets/loadingoverlay.js"></script>

</head>
<input id="currentUser" type="text" hidden value ="<?php echo  $userId ?>">