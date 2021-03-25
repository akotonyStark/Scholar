//alert('working')

$(document).ready(function () {
    var uname = localStorage.getItem("username");
    $("#username").text(uname);
});

showYear = () => {};

$("#setTerm").mouseup(function () {
    var getValue = $("#setTerm").val();

    if (getValue == "") {
        $("#setYear,#setClass,#setSubject,#reset,#start").attr(
            "hidden",
            "true"
        );
    } else if (getValue != "") {
        $("#setYear").removeAttr("hidden");
    }
});
$("#setYear").mouseup(function () {
    var getValue = $("#setYear").val();

    if (getValue == "") {
        $("#setClass,#setSubject,#reset,#start,#getClass").attr(
            "hidden",
            "true"
        );
    } else if (getValue != "") {
        $("#setClass,#getClass").removeAttr("hidden");
    }
});
$("#setClass").mouseup(function () {
    var getValue = $("#setClass").val();

    if (getValue == "") {
        $("#setSubject,#reset,#start,#setSubject2").attr("hidden", "true");
    } else if (getValue != "") {
        $("#setSubject,#setSubject2").removeAttr("hidden");
    }
});

$("#setSubject").change(function () {
    var getValue = $("#setSubject").val();
    if (getValue == "") {
        $("#reset,#start").attr("hidden", "true");
    } else if (getValue != "") {
        // $('#reset,#start').removeAttr('hidden');
        loadAssessmentsheet();
    }
});

$("#setSubject2").change(function () {
    var getValue = $("#setSubject2").val();
    if (getValue == "") {
        $("#reset,#start").attr("hidden", "true");
    } else if (getValue != "") {
        // $('#reset,#start').removeAttr('hidden');
        loadAssessment();
    }
});

var assessmentSheet = [];
var assessments = [];

var studentsrecord = [];

loadAssessmentsheet = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var setSubject = $("#setSubject").val();

    var studentClass = studentClass;
    var term = term;
    var setYear = setYear;
    var setSubject = setSubject;

    $.ajax({
        url: "phpfiles/assessment.php",
        type: "POST",
        dataType: "JSON",
        data:
            "action=assessmentSheet&&studentClass=" +
            studentClass +
            "&&term=" +
            term +
            "&&setYear=" +
            setYear +
            "&&setSubject=" +
            setSubject,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            $("#assessmentGrid").html("");
            // console.log(data[0].message)
            if (data[0].studentId == null) {
                $("#assessmentGrid").html(data[0].message);
                toastr.warning(data[0].message);
            } else {
                assessmentSheet = data;
                assessmentForm(assessmentSheet);
                $("#saveInput").removeAttr("hidden");
            }
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
            // if (err.responseText.includes('null')) {
            //     $("#assessmentGrid").html('');
            //     $("#assessmentGrid").html('No records found');
            //     toastr.warning('No records found')
            // } else {
            // console.log(err.responseText)
            // }
        },
    });
};

assessmentForm = (assessmentSheet) => {
    $("#assessmentGrid").kendoGrid({
        dataSource: {
            data: assessmentSheet,
            pageSize: assessmentSheet.length,
        },
        scrollable: true,
        toolbar: [
            {
                template:
                    "<button id='saveAssessment' onClick='saveInput()' class='btn .btn btn-success' style='float:right'><i class='fa fa fa-floppy'></i>&nbsp;Save</button><button id='enrollModal' onClick='loadStudentdata()' class='btn .btn btn-warning' style='float:right; margin-right:10px'><i class='fa fa fa-refresh'></i>&nbsp;Clear</button>",
            },
        ],
        // pageable: {
        //     refresh: false,
        //     pageSizes: false,
        //     buttonCount: 10
        // },
        height: 400,
        columns: [
            {
                field: "studentId",
                title: "studentId",
                width: "10%",
                hidden: true,
            },
            { field: "studentName", title: "Name", width: "30%" },
            { field: "Term", title: "Term", width: "17%", hidden: true },
            { field: "Subject", title: "Subject", width: "20%", hidden: true },
            {
                field: "TestA",
                title: "TestA",
                width: "10%",

                template:
                    "<input type='number' min='0' max='30' class='test1'  value='0.0' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "TestB",
                title: "TestB",
                width: "10%",

                template:
                    "<input type='number' min='0' max='30'  class='test2'  value='0.0' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "Groupwork",
                title: "Groupwork",
                width: "10%",

                template:
                    "<input type='number' min='0' max='20' class='grpwrk'    value='0.0' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "Projectwork",
                title: "Projectwork",
                width: "10%",

                template:
                    "<input type='number' min='0' max='20' class='pwork'  value='0.0' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "studId",
                title: "studId",
                width: "10%",
                hidden: true,
                template:
                    "<input class='studId'   value='#=studentId#' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "Exams",
                title: "Exams",
                width: "10%",

                template:
                    "<input type='number' min='0' max='100' class='exam' value='0.0' style='height:15px; font-size:13px;width:100%'>",
            },
        ],
    });

    //validating input values
    $(".test1,.test2").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 30) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });
    $(".grpwrk,.pwork").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 20) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });

    $(".exam").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 100) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });
};

saveInput = () => {
    var data = [];

    var term = $("#setTerm").val();
    var year = $("#setYear").val();
    var subject = $("#setSubject").val();
    var studentClass = $("#setClass").val();

    $("#assessmentGrid tr").each(function () {
        var obj = {};

        $(this)
            .find("input")
            .each(function () {
                obj[$(this).attr("class")] = $(this).val();
            });
        data.push(obj);
    });
    var len = data.length;
    var count = 0;
    var res = "";
    for (var i = 0; i < len; i++) {
        var test1 = data[i].test1;
        var test2 = data[i].test2;
        var grpwrk = data[i].grpwrk;
        var pwork = data[i].pwork;
        var exam = data[i].exam;
        var studId = data[i].studId;
        count++;

        $.ajax({
            url: "phpfiles/assessment.php",
            type: "post",
            data:
                "action=saveAssessment&test1=" +
                test1 +
                "&test2=" +
                test2 +
                "&grpwrk=" +
                grpwrk +
                "&pwork=" +
                pwork +
                "&exam=" +
                exam +
                "&term=" +
                term +
                "&year=" +
                year +
                "&subject=" +
                subject +
                "&studentClass=" +
                studentClass +
                "&studId=" +
                studId,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (response) {
                pageLoader("hide");
                res = response;
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    }
    if ((count = len)) {
        // alert("done");
        toastr.info("Save");
        toastr.options = { preventDuplicates: true };
    }
};

loadAssessment = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var setSubject = $("#setSubject2").val();

    // var studentClass = studentClass;
    // var term = term;
    // var setYear = setYear;
    // var setSubject = setSubject;

    if (setSubject != "") {
        // console.log("subject " + setSubject)
        $.ajax({
            url: "phpfiles/assessment.php",
            type: "POST",
            dataType: "JSON",
            data:
                "action=loadAssessment&&studentClass=" +
                studentClass +
                "&&term=" +
                term +
                "&&setYear=" +
                setYear +
                "&&setSubject=" +
                setSubject,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (data) {
                pageLoader("hide");
                if (data[0].studentName == null) {
                    $("#assessmentGrid").html(data[0].message);
                    toastr.warning(data[0].message);
                } else {
                    $("#assessmentGrid").html("");
                    assessments = data;
                    assessmentData(assessments);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    }
};

assessmentData = (assessments) => {
    $("#assessmentGrid").kendoGrid({
        dataSource: {
            data: assessments,
            pageSize: assessments.length,
        },

        // pageable: {
        //     refresh: true,
        //     pageSizes: true,
        //     buttonCount: 10
        // },
        toolbar: [
            {
                template:
                    "<button id='saveAssessment' onClick='updateInput()' class='btn .btn btn-success' style='float:right'><i class='fa fa fa-floppy'></i>&nbsp;Update</button>",
            },
        ],
        height: 400,
        columns: [
            { field: "rowId", title: "#", width: "5%", hidden: true },
            {
                field: "studentName",
                title: "Name",
                width: "35%",
                headerAttributes: { style: "font-weight:bold" },
            },

            {
                field: "TestA",
                title: "TestA",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },

                template:
                    "<input type='number' min='0' max='30' class='test1'  value='#=TestA#' style='height:15px; font-size:13px;width:100%'>",
            },
            {
                field: "TestB",
                title: "TestB",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },

                template:
                    "<input type='number' min='0' max='30'  class='test2'  value='#=TestB#' style='height:15px; font-size:13px;width:100%'   >",
            },
            {
                field: "Groupwork",
                title: "Groupwork",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },

                template:
                    "<input type='number' min='0' max='20' class='grpwrk'  value='#=Groupwork#' style='height:15px; font-size:13px;width:100%' >",
            },
            {
                field: "Projectwork",
                title: "Projectwork",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },

                template:
                    "<input type='number' min='0' max='20' class='pwork' value='#=Projectwork#' style='height:15px; font-size:13px;width:100%' >",
            },
            {
                field: "rowId",
                title: "rowId",
                width: "15%",
                hidden: true,
                template:
                    "<input class='rowId'  value='#=rowId#' style='height:15px; font-size:13px;width:100%' >",
            },

            {
                field: "Exams",
                title: "Exams",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },

                template:
                    "<input type='number' min='0' max='100' class='exam'  value='#=Exams#' style='height:15px; font-size:13px;width:100%' >",
            },
        ],
    });

    //validating input values
    $(".test1,.test2").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 30) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });
    $(".grpwrk,.pwork").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 20) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });

    $(".exam").focusout(function () {
        let test1 = $(this).val();
        if (test1 > 100) {
            $(this).val(0.0);
            toastr.warning("Invlide score.");
        }
    });
};

//validating input values
$(".test1").focusout(function () {
    alert("out");
});

updateInput = () => {
    var data = [];

    // var term = $('#setTerm').val();
    // var year = $('#setYear').val();
    // var subject = $('#setSubject').val();

    $("#assessmentGrid tr").each(function () {
        var obj = {};

        $(this)
            .find("input")
            .each(function () {
                obj[$(this).attr("class")] = $(this).val();
            });
        data.push(obj);
    });

    //console.log(data);
    var res = "";

    var len = data.length;
    var count = 0;
    for (var i = 0; i < len; i++) {
        var test1 = data[i].test1;
        var test2 = data[i].test2;
        var grpwrk = data[i].grpwrk;
        var pwork = data[i].pwork;
        var exam = data[i].exam;
        var rowId = data[i].rowId;
        count++;

        $.ajax({
            url: "phpfiles/assessment.php",
            type: "post",
            data:
                "action=updateAssessment&test1=" +
                test1 +
                "&test2=" +
                test2 +
                "&grpwrk=" +
                grpwrk +
                "&pwork=" +
                pwork +
                "&exam=" +
                exam +
                "&rowId=" +
                rowId,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (response) {
                pageLoader("hide");
                res = response;
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    }
    if ((count = len)) {
        // alert("done");
        toastr.info("Save");
        toastr.options = { preventDuplicates: true };
    }
};

loadStudentsrecord = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var StudentName = $(".setStudentName").val();

    // var studentClass = studentClass;
    // var term = term;
    // var setYear = setYear;
    // var setSubject = setSubject;

    $.ajax({
        url: "phpfiles/assessment.php",
        type: "POST",
        dataType: "JSON",
        data:
            "action=studentsRecord&&studentClass=" +
            studentClass +
            "&&term=" +
            term +
            "&&setYear=" +
            setYear +
            "&&StudentId=" +
            StudentName,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            $("#assessmentGrid").html("");

            studentsrecord = data;
            //console.log(studentsrecord);
            reportForm(studentsrecord);
            var studentId = studentsrecord[0].StudentId;
            remarksForm(studentId, term, setYear);
            $("#saveInput").removeAttr("hidden");

            // $('#setYear,#setClass,#setSubject,#setTerm').attr('disabled', 'disabled');
            //console.table(fees);
        },
        error: function (err) {
            pageLoader("hide");
            // console.log(err);
            if (err.responseText.includes("null")) {
                $("#assessmentGrid").html("");
                $("#assessmentGrid").html("No records found");
                toastr.warning("No records found");
            } else {
                console.log(err.responseText);
                pageLoader("hide");
            }
        },
    });
};

reportForm = (studentsrecord) => {
    $("#assessmentGrid").kendoGrid({
        dataSource: {
            data: studentsrecord,
            pageSize: 10,
        },

        // pageable: {
        //     refresh: true,
        //     pageSizes: true,
        //     buttonCount: 10
        // },
        height: 310,
        columns: [
            {
                field: "StudentId",
                title: "#",
                width: "5%",
                hidden: true,
                headerAttributes: { style: "text-align:right" },
            },
            {
                field: "StudentName",
                title: "Student Name",
                width: "35%",
                hidden: true,
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Subject",
                title: "Subject",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Class_score",
                title: "Class score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Exams_score",
                title: "Exams score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Total_score",
                title: "Total score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Grade",
                title: "Grade",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Position",
                title: "Position",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Remarks",
                title: "Remarks",
                width: "20%",
                headerAttributes: { style: "font-weight:bold" },
            },
        ],
    });
};

$(".getClassList").change(function () {
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    console.log(setYear + " " + term);
    var classLevel = $(".getClassList").val();
    if (classLevel != "") {
        $.ajax({
            url: "phpfiles/assessment.php",
            type: "post",
            data:
                "action=getClassList&&classLevel=" +
                classLevel +
                "&&term=" +
                term +
                "&&setYear=" +
                setYear,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                $(".listresult").html(res);
                pageLoader("hide");
                // getPaymentType();
                //console.log(res)
            },
            error: function (err) {
                pageLoader("hide");
            },
        });
    } else {
        $(".listresult").html("");
    }
});

remarksForm = (studentId, term, year) => {
    var studentId = studentId;
    var term = term;
    var year = year;
    //console.log(studentId)
    $.ajax({
        url: "phpfiles/assessment.php",
        type: "post",
        data:
            "action=remarks&&studentId=" +
            studentId +
            "&&term=" +
            term +
            "&&year=" +
            year,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (response) {
            pageLoader("hide");
            $("#remarks").html(response);
            $("#getStudentId").val(studentId);
        },
        error: function (err) {
            console.log(err);
        },
    });
};

saveRemarks = () => {
    var studentId = $("#getStudentId").val();
    var term = $("#setTerm").val();
    var year = $("#setYear").val();
    var teacher_remark = $("#setTeacher_remarks").val();
    var head_remark = $("#setHead_remarks").val();
    var attendance = $("#setAttendance").val();
    var conduct = $("#setConduct").val();

    $.ajax({
        url: "phpfiles/assessment.php",
        type: "post",
        data:
            "action=saveRemarks&&term=" +
            term +
            "&&year=" +
            year +
            "&&teacher_remark=" +
            teacher_remark +
            "&&head_remark=" +
            head_remark +
            "&&conduct=" +
            conduct +
            "&&studentId=" +
            studentId +
            "&&attendance=" +
            attendance,

        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            toastr.success(data);
            $("#nextValue").click();
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });

    // console.log(studentId + " " + " " + term + " " + year + " " + teacher_remark + " " + head_remark + " " + attendance)
};

saveRemarks2 = () => {
    var studentId = $("#getStudentId").val();
    var term = $("#setTerm").val();
    var year = $("#setYear").val();
    var teacher_remark = $("#setTeacher_remarks").val();
    var head_remark = $("#setHead_remarks").val();
    var attendance = $("#setAttendance").val();
    var conduct = $("#setConduct").val();

    $.ajax({
        url: "phpfiles/assessment.php",
        type: "post",
        data:
            "action=saveRemarks&&term=" +
            term +
            "&&year=" +
            year +
            "&&teacher_remark=" +
            teacher_remark +
            "&&head_remark=" +
            head_remark +
            "&&conduct=" +
            conduct +
            "&&studentId=" +
            studentId +
            "&&attendance=" +
            attendance,

        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            toastr.success(data);
            refresh("createreport.html");
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });

    // console.log(studentId + " " + " " + term + " " + year + " " + teacher_remark + " " + head_remark + " " + attendance)
};

preViewReport = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var StudentId = $(".setStudentName").val();
    loadStudentsrecord2();
    header(StudentId, studentClass, term, setYear);
    loadRemarks(StudentId, term, setYear);
    $("#staticModalbtn2").click();
};

header = (studentId, studentClass, term, year) => {
    var studentId = studentId;
    var term = term;
    var year = year;
    var studentClass = studentClass;
    console.log(year);
    $.ajax({
        url: "phpfiles/assessment.php",
        type: "post",
        data:
            "action=headerremark&&studentId=" +
            studentId +
            "&&Term=" +
            term +
            "&&Year=" +
            year +
            "&&studentClass=" +
            studentClass,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (response) {
            pageLoader("hide");
            $(".reportHead").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

loadRemarks = (studentId, term, year) => {
    var studentId = studentId;
    var term = term;
    var year = year;
    // console.log(year)
    $.ajax({
        url: "phpfiles/assessment.php",
        type: "post",
        data:
            "action=studentremark&studentId=" +
            studentId +
            "&term=" +
            term +
            "&year=" +
            year,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (response) {
            pageLoader("hide");
            //  console.log(response)
            $("#remarksdiv").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};
var studentsrecord1 = [];
loadStudentsrecord2 = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var StudentId = $(".setStudentName").val();

    $.ajax({
        url: "phpfiles/assessment.php",
        type: "POST",
        dataType: "JSON",
        data:
            "action=studentsRecord&&studentClass=" +
            studentClass +
            "&&term=" +
            term +
            "&&setYear=" +
            setYear +
            "&&StudentId=" +
            StudentId,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            $("#Grid").html("");

            studentsrecord1 = data;
            //console.log(studentsrecord);
            reportForm(studentsrecord1);
            var studentId = studentsrecord1[0].StudentId;
            remarksForm(studentId, term, setYear);
            $("#saveInput").removeAttr("hidden");

            // $('#setYear,#setClass,#setSubject,#setTerm').attr('disabled', 'disabled');
            //console.table(fees);
        },
        error: function (err) {
            pageLoader("hide");
            // console.log(err);
            if (err.responseText.includes("null")) {
                $("#Grid").html("");
                $("#Grid").html("No records found");
                toastr.warning("No records found");
            } else {
                console.log(err.responseText);
            }
        },
    });
};

reportForm2 = (studentsrecord1) => {
    $("#Grid").kendoGrid({
        dataSource: {
            data: studentsrecord1,
            pageSize: 10,
        },

        // pageable: {
        //     refresh: true,
        //     pageSizes: true,
        //     buttonCount: 10
        // },
        height: 310,
        columns: [
            {
                field: "StudentId",
                title: "#",
                width: "5%",
                hidden: true,
                headerAttributes: { style: "text-align:right" },
            },
            {
                field: "StudentName",
                title: "Student Name",
                width: "35%",
                hidden: true,
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Subject",
                title: "Subject",
                width: "15%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Class_score",
                title: "Class score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Exams_score",
                title: "Exams score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Total_score",
                title: "Total score",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Grade",
                title: "Grade",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Position",
                title: "Position",
                width: "10%",
                headerAttributes: { style: "font-weight:bold" },
            },
            {
                field: "Remarks",
                title: "Remarks",
                width: "20%",
                headerAttributes: { style: "font-weight:bold" },
            },
        ],
    });
};
