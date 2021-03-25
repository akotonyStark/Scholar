//alert('working')
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

loadStudentsrecord = () => {
    var studentClass = $("#setClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var StudentName = $(".setStudentName").val();

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
            header(studentId, studentClass, term, setYear);
            loadRemarks(studentId, term, setYear);
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
                pageLoader("hide");
                $(".listresult").html(res);

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
            console.log(response);
            $("#headerremark").html(response);
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
            pageLoader("hide");
        },
        success: function (response) {
            pageLoader("hide");
            $("#remarks").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

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
            // $('#remarks').html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

printReport = () => {
    var data = document.getElementById("printReport").innerHTML;
    var myWindow = window.open("", "printReciept", "height=500,width=1200");
    myWindow.document.write("<html><head><title>Scholar</title>");
    myWindow.document.write(
        ' <link rel="stylesheet" href="vendors/bootstrap/dist/css/bootstrap.min.css">'
    );
    myWindow.document.write(
        "<link rel='stylesheet' href='assets/css/style.css'>"
    );
    myWindow.document.write(
        '<link href="../assets/kendo/css/kendo.default.mobile.min.css" rel="stylesheet" />'
    );
    myWindow.document.write(
        ' <link rel="stylesheet" href="assets/css/kendo.default.min.css">'
    );
    myWindow.document.write(
        ' <link href="assets/kendo/css/kendo.bootstrap.min.css" rel="stylesheet" />'
    );
    myWindow.document.write(
        '<link href="assets/kendo/css/kendo.common.min.css" rel="stylesheet" />'
    );

    myWindow.document.write("</head><body >");
    myWindow.document.write(
        "<br><br><center><h2>Scholar Terminal Report</h2></center>"
    );
    myWindow.document.write(data);
    myWindow.document.write("</body></html>");
    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload = function () {
        // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
};
