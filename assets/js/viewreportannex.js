var assessmentSheet = [];
var assessments = [];

var studentsrecord = [];

$("#getClass").change(function () {
    var getClass = $("#getClass").val();
    if (getClass == "") {
        $("#assessmentGrid,#remarks,#headerremark").html("");
        $("#viewreport").attr("hidden", "true");
    }
    if (getClass != "") {
        // loadStudentsrecord()
        // loadRemarks(StudentId, term, setYear)
        // header(StudentId, term, setYear)
        $("#viewreport").removeAttr("hidden");
    }
});

$("#getClass").mouseup(function () {
    var getValue = $("#getClass").val();

    if (getValue == "") {
        $("#viewreport").attr("hidden", "true");
    } else if (getValue != "") {
        $("#viewreport").removeAttr("hidden");
    }
});

$("#setYear").change(function () {
    if ($("#setYear").val() != "") {
        var parentEmail = $(".parentEmail").val();
        //console.log(parentEmail)
        if (parentEmail != "") {
            $.ajax({
                url: "phpfiles/reportannex.php",
                type: "post",
                data: "action=getParentWard&&parentEmail=" + parentEmail,
                beforeSend: function () {},
                success: function (res) {
                    $(".listresult").html(res);

                    // getPaymentType();
                    //console.log(res)
                },
                error: function (err) {},
            });
        } else {
            $(".listresult").html("");
        }
    } else {
        $(".listresult").html("");
    }
});

loadClass = () => {
    var studentId = $(".setStudentId").val();
    $.ajax({
        url: "phpfiles/reportannex.php",
        type: "post",
        dataType: "JSON",
        data: "action=getClass&&studentId=" + studentId,
        beforeSend: function () {},
        success: function (response) {
            //console.log(response)
            $("#getClass").find("option").remove();
            var len = response.length;
            for (var i = 0; i < len; i++) {
                var classes = response[i].ClassList;

                var myClassList =
                    "<option value='" + classes + "'>" + classes + "</option>";

                $("#getClass").append(myClassList);
            }
        },
        error: function (err) {},
    });
};

loadStudentsrecord2 = () => {
    var studentClass = $("#getClass").val();
    var term = $("#setTerm").val();
    var setYear = $("#setYear").val();
    var setStudentId = $(".setStudentId").val();
    //console.log(studentClass + " " + " " + term + "  " + setYear + "  " + setStudentId)
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
            setStudentId,
        beforeSend: function () {
            console.log("loading...");
        },
        success: function (data) {
            $("#assessmentGrid").html("");

            studentsrecord = data;
            console.log(studentsrecord);
            reportForm(studentsrecord);
            var studentId = studentsrecord[0].StudentId;
            loadRemarks(studentId, term, setYear);
            header(studentId, studentClass, term, setYear);
            $("#reportcard").removeAttr("hidden");
        },
        error: function (err) {
            console.log(err);
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

reportForm2 = (studentsrecord) => {
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
        beforeSend: function () {},
        success: function (response) {
            $("#remarks").html("");
            //  console.log(response)
            $("#remarks").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            console.log(err);
        },
    });
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
        beforeSend: function () {},
        success: function (response) {
            //console.log(response)
            $("#headerremark").html("");
            $("#headerremark").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            console.log(err);
        },
    });
};
