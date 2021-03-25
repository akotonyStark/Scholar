<?php

include "db.php";


if($_POST){

    $action = $_POST['action'];

    switch ($action) {
        case 'assessmentSheet':
                                $studentClass = $_POST['studentClass'];
                                $term = $_POST['term'];
                                $year = $_POST['setYear'];
                                $subject = $_POST['setSubject'];
                                $studentId = "";

                                    $sql = "SELECT * FROM `students` WHERE students.Class='$studentClass' AND `regId` NOT IN 
                                    (SELECT assessment.StudentId FROM assessment WHERE assessment.Term='$term' AND assessment.Class='$studentClass' AND assessment.Subject = '$subject' AND assessment.Year = '$year')
                                    ORDER BY students.Name";
                                    $res = mysqli_query($db,$sql);
                                    $message = "Entry not found";
                                    if(mysqli_num_rows($res)>0){
                                        foreach ($res as $row) {
                                            $studentName = $row['Name'];
                                            $studentId = $row['regId'];
                      
                      
                                            $data[] = array(
                                             'message'=> $message, 
                                              'studentName'=>$studentName,
                                              'studentId'=>$studentId,
                                              'Term'=>$term,
                                              'Subject'=>$subject);
                      
                      
                                      }
                                      echo json_encode($data);
                                    }
                                    else{
                                        $data[] = array(
                                            'message'=> "Entry has been made. Try <a href='editassessment.html'>editing.</a>");
                                        echo json_encode($data);
                                    }
                                    
                              

break;

 case 'saveAssessment':

                                $test1= $_POST['test1'];
                                $test2= $_POST['test2'];
                                $grpwrk= $_POST['grpwrk'];
                                $pwork= $_POST['pwork'];
                                $exam= $_POST['exam'];
                                $term= $_POST['term'];
                                $year= $_POST['year'];
                                $subject= $_POST['subject'];
                                $studId= $_POST['studId'];
                                $studentClass= $_POST['studentClass'];

                                if($studId !='undefined'){
                              
                                    $class_score = ($test1 + $test1 + $grpwrk + $pwork)*(40/100);
                                    $exam_score = ($exam/100)*60;
                                    $total = $class_score + $exam_score;
                                   
                                    $sql = "INSERT INTO `assessment`( `StudentId`,`Class`, `Subject`, `TestA`, `TestB`, `Groupwork`, `Projectwork`,
                                     `Class_score`, `Exams`, `Exams_score`, `Total`, `Term`, `Year`)
                                      VALUES ('$studId','$studentClass','$subject','$test1','$test2','$grpwrk','$pwork','$class_score','$exam','$exam_score','$total','$term','$year')";
    
                                      $result = mysqli_query($db,$sql);
                                      if($result){
                                          echo "Done";

                                        //   save student total score
                                        $sum_score = "SELECT `StudentId`, SUM(Total) AS Total FROM assessment WHERE `StudentId`='$studId' AND `Term`='$term' AND `Year`='$year'";
                                        $res = mysqli_query($db,$sum_score);
                                        foreach($res as $studtotal)
                                            $overallTotal = $studtotal['Total'];
                                        
                                    $check = "SELECT * FROM `total_score` WHERE `studentId` = '$studId' AND `Term`='$term' AND `Year`='$year'";
                                    $check_result = mysqli_query($db, $check);
                                    if(mysqli_num_rows($check_result)==0){

                                    $insert_total = "INSERT INTO `total_score`(`studentId`,`Class`, `Total_score`, `Term`, `Year`) 
                                    VALUES ('$studId','$studentClass','$overallTotal','$term','$year')";
										 $res_total = mysqli_query($db, $insert_total);
                                    }
                                    if(mysqli_num_rows($check_result)>0){

                                        $update_total = "UPDATE `total_score` SET `Total_score`='$overallTotal' WHERE `studentId` = '$studId' AND `Term`='$term' AND `Year`='$year'";
                                        $update_res =  mysqli_query($db, $update_total);

                                    }                                  
                                        
                                }

                                 }//end

                               



 break;

case 'loadAssessment':

                $studentClass = $_POST['studentClass'];
                $term = $_POST['term'];
                $year = $_POST['setYear'];
                $subject = $_POST['setSubject'];

                                $sql="SELECT assessment.id,`students`.`Name`,assessment.TestA,assessment.TestB,assessment.Groupwork,assessment.Projectwork,assessment.Exams FROM students, assessment 
                                WHERE students.regId=assessment.StudentId AND assessment.Subject = '$subject' AND assessment.Term = '$term' AND students.Class='$studentClass' AND assessment.Year='$year'
                                ORDER BY `students`.`Name`";
                                $result = mysqli_query($db,$sql);
                                if(mysqli_num_rows($result)>0){
                                    $message= "Records found";
                                    foreach($result as $rows){
                                        $studentName = $rows['Name'];
                                        $rowId = $rows['id'];
                                        $TestA = $rows['TestA'];
                                        $TestB = $rows['TestB'];
                                        $Groupwork = $rows['Groupwork'];
                                        $Projectwork = $rows['Projectwork'];
                                        $Exams = $rows['Exams'];
                                       
                                        $dataList[] = array(
                                                        'message' =>$message,
                                                        'studentName'=>$studentName,
                                                        'rowId'=>$rowId,
                                                        'TestA'=>$TestA,
                                                        'TestB'=>$TestB,
                                                        'Groupwork'=>$Groupwork,
                                                        'Projectwork'=>$Projectwork,
                                                        'Exams'=>$Exams);
                                        }
                                    echo json_encode($dataList);
                                }
                                else{
                                    $message= "Records not found. <a href='assessment.html'>Please enter assessment first</a>";
                                    $dataList[] = array('message' =>$message); 
                                                                              
                                    echo json_encode($dataList);
                                }
                               




     break;
case 'updateAssessment':
 echo "Done";
                $test1= $_POST['test1'];
                $test2= $_POST['test2'];
                $grpwrk= $_POST['grpwrk'];
                $pwork= $_POST['pwork'];
                $exam= $_POST['exam'];
                $rowId= $_POST['rowId'];
                $studId ="";
                $term ="";
                $year="";

                    $getInfo = "SELECT * FROM `assessment` WHERE `id` = '$rowId'";
                    $info_result = mysqli_query($db,$getInfo);
                    foreach($info_result as $info){
                        $studId = $info['StudentId'];
                        $term = $info['Term'];
                        $year = $info['Year'];
                    }

                if($rowId !='undefined'){

                    $class_score = ($test1 + $test1 + $grpwrk + $pwork)*(40/100);
                    $exam_score = ($exam/100)*60;
                    $total = $class_score + $exam_score;
                   
                    $sql = "UPDATE `assessment` SET `TestA`='$test1',`TestB`='$test2',
                    `Groupwork`='$grpwrk',`Projectwork`='$pwork',`Class_score`='$class_score',
                    `Exams`='$exam',`Exams_score`='$exam_score',`Total`='$total' WHERE `id` = '$rowId'";

                      $result = mysqli_query($db,$sql);
                      if($result){
                           //   save student total score
                           $sum_score = "SELECT `StudentId`, SUM(Total) AS Total FROM assessment WHERE `StudentId`='$studId' AND `Term`='$term' AND `Year`='$year'";
                           $res = mysqli_query($db,$sum_score);
                           foreach($res as $studtotal)
                               $overallTotal = $studtotal['Total'];
                           
                        $check = "SELECT * FROM `total_score` WHERE `studentId` = '$studId' AND `Term`='$term' AND `Year`='$year'";
                        $check_result = mysqli_query($db, $check);
                        if(mysqli_num_rows($check_result)==0){

                            $insert_total = "INSERT INTO `total_score`(`studentId`, `Total_score`, `Term`, `Year`) 
                            VALUES ('$studId','$overallTotal','$term','$year')";
                                    $res_total = mysqli_query($db, $insert_total);
                        }
                        if(mysqli_num_rows($check_result)>0){

                            $update_total = "UPDATE `total_score` SET `Total_score`='$overallTotal' WHERE `studentId` = '$studId' AND `Term`='$term' AND `Year`='$year'";
                            $update_res =  mysqli_query($db, $update_total);

                        }

                         echo "Done";

                      }

                }
break;

case 'studentsRecord':
                        $studClass = $_POST['studentClass'];
                        $term = $_POST['term'];
                        $year = $_POST['setYear'];
                        $StudentName = $_POST['StudentId'];
                        $studentClass = "";

                       

                        $sql="SELECT students.Name,assessment.StudentId,assessment.Class,assessment.Subject,assessment.Class_score,assessment.Exams_score,assessment.Total FROM students,assessment 
                        WHERE assessment.Class = '$studClass' AND assessment.Term = '$term' AND assessment.Year='$year' AND students.regId= assessment.StudentId AND students.regId='$StudentName'";
                        $result = mysqli_query($db,$sql);
                        foreach($result as $rows){

                            $subject = $rows['Subject'];
                            $studentName = $rows['Name'];
                            $studentId= $rows['StudentId'];
                            $studentClass= $rows['Class'];
                          
                            $class_score= $rows['Class_score'];
                            $exams_score= $rows['Exams_score'];
                            $total_score= $rows['Total'];
                            $setposition="";
                            $grade = "";


                            $sql_position = "SELECT  1 +(SELECT count(*)FROM `assessment` a WHERE a.Total> b.Total AND `Subject` ='$subject'

					AND `Class`='$studentClass' AND Term='$term'AND `Year`='$year')AS rank FROM `assessment` b WHERE `StudentId`='$studentId' AND `Subject` ='$subject' AND Term='$term' AND `Year`='$year'";
                            $res= mysqli_query($db,$sql_position);
                            foreach($res as $getrank)
                                $rank =  $getrank['rank'];
								if($rank =="1"||$rank =="21"||$rank =="31"||$rank =="41"){
									$setposition =  $rank."st";
								}
								else if($rank =="2"||$rank =="22"||$rank =="32"||$rank =="42"){
                                    $setposition =  $rank."nd";
								}
								else if($rank =="3"||$rank =="23"||$rank =="33"||$rank =="43"){
                                    $setposition =  $rank."rd";
								}
								else{
                                    $setposition =  $rank."th";
								}
                           
                                if($total_score>=80){
                                    $grade = 1;
                                    $remarks = "Distinction";
                                }
                                else if($total_score <=80 && $total_score>=75){
                                    $grade = 2;
                                    
                                    $remarks = "Excellent";
                                }
                                else if($total_score <=74 && $total_score>=70){
                                    $grade = 3;
                                    $remarks = "Very good";
                                   
                                }
                                else if($total_score <=69 && $total_score>=65){
                                    $grade = 4;
                                    $remarks = "Good";
                                   
                                }
                                else if($total_score <=64 && $total_score>=60){
                                    $grade = 5;
                                    $remarks = "Credit";
                                }
                                else if($total_score <=59 && $total_score>=50){
                                    $grade = 6;
                                    $remarks = "Pass";


                                }
                                else if($total_score<50){
                                    $grade = 7;
                                    $remarks = "Fail";
                                }



                            $data[]= array(
                                "StudentName" => $studentName,
                                "Subject"     => $subject,
                                "Class_score"     => $class_score,
                                "Exams_score"     => $exams_score,
                                "Total_score"     => $total_score,
                                "Position"     => $setposition,
                                "Grade"     => $grade,
                                "Remarks"     => $remarks,
                                "StudentId"     => $studentId

                            );

                        }
                        echo json_encode($data);
break;
       

case 'getClassList':
                $classLevel = $_POST['classLevel'];
                $term = $_POST['term'];
                $setYear = $_POST['setYear'];
            
                echo '<select data-placeholder="Choose a Student..." class="standardSelect" id="ClassList">
                <option   selected value="">Choose a Student...</option>';

                    $query = "SELECT DISTINCT(`students`.`Name`),`assessment`.`StudentId` FROM students,assessment 
                    WHERE students.regId = assessment.StudentId AND `assessment`.`Year` = '$setYear' 
                    AND `assessment`.`Term` = '$term'AND `assessment`.`Class` = '$classLevel'";
               
                   // $sql = "SELECT * FROM `students` WHERE `Class`= '$classLevel'";
                    $result = mysqli_query($db,$query);
                    foreach($result as $rows){
                        echo '<option  getId="'. $rows['StudentId'].'" id="classList" value="'. $rows['StudentId'].'">'. $rows['Name'].'</option>';
                    }
              
                echo '</select>';
                echo '<script>

                var term = $("#setTerm").val();
                var setYear = $("#setYear").val();
               
                jQuery(document).ready(function() {jQuery(".standardSelect").chosen(
                    {disable_search_threshold: 10,no_results_text: "Oops, nothing found!",width: "100%" 
                    }).change(function(event){
                        
                        if(event.target == this){
                      
                            var studentName= $(this).val();
                           
                            $(".setStudentName").val(studentName);
                         
                           $("#nextValue").show()
                            loadStudentsrecord();
                            remarksForm(studentName,term,setYear)
                            
                           
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

case 'remarks':
        $studentId = $_POST['studentId'];
        $term = $_POST['term'];
        $year = $_POST['year'];
        
        $sql = "SELECT * FROM `remarks` WHERE `studentId`= '$studentId' AND `Term` = '$term' AND `Year`= '$year' LIMIT 1";
        $result = mysqli_query($db,$sql);
      

        if(mysqli_num_rows($result)==1){
            foreach($result as $rows){

                $Conduct = $rows['Conduct'];
                $Teacher_remark = $rows['Teacher_remark'];
                $Headmaster_remark	 = $rows['Headmaster_remark'];
                $Headmaster_remark	 = $rows['Headmaster_remark'];
                $attendance	 = $rows['attendance'];

            

                echo "
                <input type='text' hidden  value='".$studentId."' id='getStudentId'>
            <div class='col-md-3'>
                        <div class='form-group'>
            <select class='select-css' id='setConduct'>
                <option value='".$Conduct."'>".$Conduct."</option>
                <option value='Satisfactory'>Satisfactory</option>
                <option value='Hardworking'>Hardworking</option>
                <option value='Hardworking and Respectful'>Hardworking and Respectful</option>
            <option value='Calm and Respectful'>Calm and Respectful</option>
            <option value='Calm and Respectful'>Calm and Respectful</option>
            <option value='Dutiful'>Dutiful</option>
                </select></div></div>
            <div class='col-md-3'>
                <div class='form-group'>
                <select class='select-css' id='setTeacher_remarks'>
                <option value='".$Teacher_remark."'>".$Teacher_remark."</option>
                <option value='Good performance'>Good performance</option>
                <option value='Promising student'>Promising student</option>
                <option value='Could do better'>Could do better</option>
                <option value='Must be serious with books'>Must be serious with books</option>
                <option value='Must be helped at home'>Must be helped at home</option>
                <option value='More room for improvement'>Dutiful</option>
            </select></div></div>

            <div class='col-md-3'>
            <div class='form-group'>
            <select class='select-css' id='setHead_remarks'>
            <option value='".$Headmaster_remark."'>".$Headmaster_remark."</option>
                <option value='Satisfactory'>Satisfactory</option>
                <option value='Excellent performance'>Excellent performance</option>
                <option value='Good performance'>Good performance</option>
                <option value='Promising student'>Promising student</option>
                <option value='Could do better'>Could do better</option>
                <option value='Must be serious with books'>Must be serious with books</option>
                <option value='Must be helped at home'>Must be helped at home</option>
                <option value='More room for improvement'>Dutiful</option>
            </select>
            </div></div>

            <div class='col-md-3'>
            <div class='form-group'>
                <input type='number'  value='".$attendance."' id='setAttendance' class='form-control' style= 'height:29px; font-size:12px' max='70' min = '0' placeholder='Enter total attendance'/>
            </div>
            </div> ";
                        }
                    }

            else if(mysqli_num_rows($result)<1){
                      //  echo "new";

                            echo "
                            <input type='text' hidden  value='".$studentId."' id='getStudentId'>
                                <div class='col-md-3'>
                                            <div class='form-group'>
                                <select class='select-css' id='setConduct'>
                                    <option>Student's Conduct</option>
                                    <option value='Satisfactory'>Satisfactory</option>
                                    <option value='Hardworking'>Hardworking</option>
                                    <option value='Hardworking and Respectful'>Hardworking and Respectful</option>
                                    <option value='Calm and Respectful'>Calm and Respectful</option>
                                    <option value='Calm and Respectful'>Calm and Respectful</option>
                                    <option value='Dutiful'>Dutiful</option>
                                </select></div></div>
                        <div class='col-md-3'>
                                <div class='form-group'>
                                <select class='select-css' id='setTeacher_remarks'>
                                <option>Teacher's Remarks</option>
                                <option value='Good performance'>Good performance</option>
                                <option value='Promising student'>Promising student</option>
                                <option value='Could do better'>Could do better</option>
                                <option value='Must be serious with books'>Must be serious with books</option>
                                <option value='Must be helped at home'>Must be helped at home</option>
                                <option value='More room for improvement'>Dutiful</option>
                            </select></div></div>

                        <div class='col-md-3'>
                            <div class='form-group'>
                            <select class='select-css' id='setHead_remarks'>
                                <option>Headmaster's Remarks</option>
                                <option value='Satisfactory'>Satisfactory</option>
                                <option value='Excellent performance'>Excellent performance</option>
                                <option value='Good performance'>Good performance</option>
                                <option value='Promising student'>Promising student</option>
                                <option value='Could do better'>Could do better</option>
                                <option value='Must be serious with books'>Must be serious with books</option>
                                <option value='Must be helped at home'>Must be helped at home</option>
                                <option value='More room for improvement'>Dutiful</option>
                            </select>
                            </div></div>

                            <div class='col-md-3'>
                            <div class='form-group'>
                                <input type='number' id='setAttendance' class='form-control' style= 'height:29px; font-size:12px' max='70' min = '0' placeholder='Enter total attendance'/>
                            </div>
                            </div> 
                                            ";
                        }

                        echo ' <div style="float:right;margin-right:20px">

                                    <button id="saveRemarks" class="btn btn-info" onclick="saveRemarks()">Save & Continue</button>
                        
                                </div>
                                <div style="float:right;margin-right:20px">
                        
                                    <button id="saveRemarks" class="btn btn-success" onclick="saveRemarks2()">Save & Exit</button>
                        
                                </div>';

    break;

case 'saveRemarks':

                $studentId = $_POST['studentId'];
                $term = $_POST['term'];
                $year = $_POST['year'];
                $Teacher_remark = $_POST['teacher_remark'];
                $Headmaster_remark	 = $_POST['head_remark'];
                $conduct	 = $_POST['conduct'];
                $attendance	 = $_POST['attendance'];

                $sql = "SELECT * FROM `remarks` WHERE `studentId`= '$studentId' AND `Term` = '$term' AND `Year`= '$year' LIMIT 1";
                $result = mysqli_query($db,$sql);
        
                if(mysqli_num_rows($result)==1){

                    $update = "UPDATE `remarks` SET `Conduct`='$conduct',`Teacher_remark`='$Teacher_remark',
                    `Headmaster_remark`='$Headmaster_remark',`attendance`='$attendance'
                    WHERE `Term`='$term' AND `Year`='$year' AND `studentId`='$studentId'";
                    $res = mysqli_query($db,$update);
                    if($res){
                        echo "Saved.";
                    }

                }
                if(mysqli_num_rows($result)<1){
                    $insert = "INSERT INTO `remarks`( `studentId`, `Conduct`, `Teacher_remark`, `Headmaster_remark`, `attendance`, `Term`, `Year`)
                     VALUES ('$studentId','$conduct','$Teacher_remark','$Headmaster_remark','$attendance','$term','$year')";

                     $res = mysqli_query($db,$insert);
                     if($res){
                        echo "Saved.";
                     }
                }



break;

case 'studentremark':
        $studentId = $_POST['studentId'];
        $term = $_POST['term'];
        $year = $_POST['year'];
        
        $sql = "SELECT * FROM `remarks` WHERE `studentId`= '$studentId' AND `Term` = '$term' AND `Year`= '$year' LIMIT 1";
        $result = mysqli_query($db,$sql);
      

        if(mysqli_num_rows($result)==1){
            foreach($result as $rows){

                $Conduct = $rows['Conduct'];
                $Teacher_remark = $rows['Teacher_remark'];
                $Headmaster_remark	 = $rows['Headmaster_remark'];
                $Headmaster_remark	 = $rows['Headmaster_remark'];
                $attendance	 = $rows['attendance'];
                echo "
             
                        <div class='col-md-4'>
                                
                        <span><b>Conduct: </b></span> <span> ".$Conduct."</span>
                        </div>
                        <div class='col-md-4'>
                        <span><b>Teacher's Remark: </b></span> <span> ".$Teacher_remark."</span>
                        </div>

                        <div class='col-md-4'>
                        <span><b>Head Master's Remark:</b> </span> <span> ".$Headmaster_remark."</span>
                        </div>

                    ";
                        }
                    }


    break;


    case 'headerremark':

                        $studentId = $_POST['studentId'];
                        $term = $_POST['Term'];
                        $year = $_POST['Year'];
                        $studentName ="" ;
                        $studentClass=$_POST['studentClass'];
                        $attendance = "";
                        $position = "";
                        $image = "";
                           
                         //students information
                         $getName = "SELECT * FROM `students` WHERE `regId` = '$studentId'";
                         $res1 = mysqli_query($db,$getName); 
                         foreach($res1 as $info){
                            $image = $info['Image'];
                        $studentName = $info['Name'];
                        
                        }

                        //students class for the set year
                    //     $getclass= "SELECT `assessement`.`Class` FROM `assessement` WHERE `StudentId` = '$studentId' AND `Year` =' $year' LIMIT 1";
                    //     $res11 = mysqli_query($db,$getclass); 
                    //     foreach($res11 as $info1){
                         
                    //        $studentClass = $info1['Class'];

                    //        echo "My class name ".$studentClass;
                       
                    //    }

                       

                        //get student attendane
                        $sql = "SELECT * FROM `remarks` WHERE `studentId`= '$studentId' AND `Term` = '$term' AND `Year`= '$year' LIMIT 1";
                        $result = mysqli_query($db,$sql);
                        foreach($result as $row){
                            $attendance = $row['attendance'];
                        }
                        echo  '<img id="stdImg" src="'.$image.'" alt="" style="position: absolute;right:20px;top:20px; width:80px;height:80px">';

                        echo "
             
                        <div class='col-md-3'>
                                
                        <span><b>Name: </b></span> <span> ".$studentName."</span>
                        </div>
                        <div class='col-md-2'>
                        <span><b>Class: </b></span> <span> ".$studentClass."</span>
                        </div>

                        <div class='col-md-2'>
                        <span><b>Term:</b> </span> <span>".$term."</span>
                        </div>
                        <div class='col-md-2'>
                        <span><b>Year:</b> </span> <span>".$year."</span>
                        </div>";
                        echo"<div class='col-md-2'>
                        <span><b>Attendance:</b> </span> <span>".$attendance."</span>
                        </div>";


                         //get class average score 
                         $classAverage="";
                         $class_average ="SELECT AVG(`Total_score`) AS ClassAverage FROM `total_score` 
                         WHERE `Class` = '$studentClass' AND Term='$term' AND `Year`='$year'";
                         $res_avg = mysqli_query($db,$class_average);
                         foreach($res_avg  as $avg){
                             $classAverage = $avg['ClassAverage'];
                         }
                         echo"<div class='col-md-3'>
                         <span><b>Class Average Score: </b> </span> <span>".round($classAverage)."</span>
                         </div>";

                        //student total score
                        $studentTotalScore="";
                        $stud_total ="SELECT `Total_score` FROM `total_score` 
                        WHERE `studentId` = '$studentId' AND Term='$term' AND `Year`='$year'";
                        $res = mysqli_query($db,$stud_total);
                        foreach($res  as $row){
                            $studentTotalScore = $row['Total_score'];
                        }
                        echo"<div class='col-md-2'>
                        <span><b>Toal Score: </b> </span> <span>".round($studentTotalScore)."</span>
                        </div>";

                        //get student overall position
                        $getrank = "SELECT `studentId`,`Class`, `Total_score`, FIND_IN_SET( `Total_score`, (SELECT GROUP_CONCAT( distinct `Total_score` ORDER BY `Total_score` DESC) AS score FROM `total_score`
                        WHERE Class = '$studentClass' AND Term='$term' AND `Year`='$year')) as rank from `total_score`
									WHERE `studentId` ='$studentId' AND Class = '$studentClass' AND Term='$term' AND `Year`='$year'";
									$res = mysqli_query($db, $getrank);
									$position="";
									while($row=mysqli_fetch_array($res,MYSQLI_ASSOC)){
										$totalscore=$row['Total_score'];
										$rank=$row['rank'];

                                        //student overall postion;
                                        $position = "";
										if($rank =="1"||$rank =="21"||$rank =="31"||$rank =="41"){
											$position = $rank."st";
										}
										else if($rank =="2"||$rank =="22"||$rank =="32"||$rank =="42"){
											$position = $rank."nd";
										}
										else if($rank =="3"||$rank =="23"||$rank =="33"||$rank =="43"){
											$position = $rank."rd";
										}
										else{
											$position = $rank."th";
                                        }}

                                        echo"<div class='col-md-2'>
                                        <span><b>Position: </b> </span> <span>".$position."</span>
                                        </div>";

                                        //get number of rows
                                        
                                        $rollCall ="SELECT DISTINCT(`StudentId`) FROM `assessment` WHERE `Class` = '$studentClass' AND `Year` = '$year'";
                                        $res_roll= mysqli_query($db,$rollCall);
                                        $num_roll = mysqli_num_rows($res_roll);
                                        echo"<div class='col-md-3'>
                                        <span><b>Roll:</b> </span> <span> ".$num_roll."</span>
                                        </div>";



    break;



   
    default:
    # code...
    break;
}

}


    
   
