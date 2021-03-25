<?php

include "db.php";


if($_POST){

    $action = $_POST['action'];

    switch ($action) {

        case 'getParentWard':
            $parentEmail = $_POST['parentEmail'];
        
            echo '<select data-placeholder="Choose a Student..." class="standardSelect" id="ClassList">
            <option   selected value="">Choose a Student...</option>';
           
                $sql = "SELECT * FROM `students` WHERE `Email`= '$parentEmail'";
                $result = mysqli_query($db,$sql);
                foreach($result as $rows){
                    echo '<option  getId="'. $rows['regId'].'" id="classList" value="'. $rows['regId'].'">'. $rows['Name'].'</option>';
                }
          
            echo '</select>';
            echo '<script>

                var term = $("#setTerm").val();
                var setYear = $("#setYear").val();
               
                jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
                    {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
                    }).change(function(event){
                        
                        if(event.target == this){
                      
                            var studentId= $(this).val();
                           
                            $(".setStudentId").val(studentId);
                            loadClass();
                            
                            
                           
                        }
                      
                
                    });
                 });

                 
                   
                 nextValue = ()=>{
                    var term = $("#setTerm").val();
                    var setYear = $("#setYear").val();
                    var nextElement = $("#ClassList > option:selected").next("option");
                    var len = nextElement.length; 
                    if (nextElement.val() =="") {
                        $("#prevValue").hide();
                        //$("#nextValue").removeAttr("disabled");
                        $("#nextValue").hide();
                       // $("#nextValue").css("background-color", "green");
                    }
                    else if (nextElement.length > 0) {
                        $("#nextValue").show();
                        $("#ClassList > option:selected").removeAttr("selected").next("option").attr("selected", "selected");
                        jQuery("#ClassList").val(nextElement.val()).trigger("chosen:updated");
                        $(".setStudentName").val(nextElement.val());
                        loadStudentsrecord()
                        remarksForm(nextElement.val(),term,setYear)
                        $("#prevValue").show();
                    
                    }
                    else if(nextElement.length == len){
                       // $("#nextValue").attr("disabled", "disabled");
                       // $("#nextValue").css("cursor", "not-allowed");
                        $("#nextValue").hide();
                        //$("#prevValue").css("background-color", "green");
                    }
                  
                 

                };
                prevValue = ()=>{
                    var term = $("#setTerm").val();
                    var setYear = $("#setYear").val();
                    var nextElement = $("#ClassList > option:selected").prev("option");
                    var len = nextElement.length; 
                    if (nextElement.val() =="") {
                        $("#prevValue").hide();
                        $("#nextValue").show();
                        //$("#nextValue").removeAttr("disabled");
                        //$("#nextValue").css("background-color", "green");
                    }
                   else if (nextElement.length > 0) {
                        $("#prevValue").show();
                        $("#nextValue").show();
                      $("#ClassList > option:selected").removeAttr("selected").prev("option").attr("selected", "selected");
                      jQuery("#ClassList").val(nextElement.val()).trigger("chosen:updated");
                      $(".setStudentName").val(nextElement.val());
                      loadStudentsrecord()
                      remarksForm(nextElement.val(),term,setYear)
                    }
                    
                    else{
                        $("#prevValue").hide();
                       // $("#prevValue").css("background-color", "red");
                        $("#nextValue").show();
                    }
                  
                 

                };
                </script>';
           
break;

case 'getClass':

                    $studentId = $_POST['studentId'];
                    $sql = "SELECT DISTINCT(`Class`) FROM `assessment` WHERE `StudentId` = '$studentId'";
                    $res = mysqli_query($db,$sql);
                    if(mysqli_num_rows($res)>0){
                    foreach ($res as $ClassList) {
                        $classname = $ClassList['Class'];
                        $classes [] = array('ClassList' =>$classname);
                    }

                    echo json_encode($classes);}
                    else{
                        $classname = "No class found";
                        $classes [] = array('ClassList' =>$classname);
                        echo json_encode($classes);

                    }

break;


    }



}