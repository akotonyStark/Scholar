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

var studentsrecord = [];

loadStudentsrecord = () => {
    var studentClass = $("#getClass").val();
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
            console.log("loading...");
        },
        success: function (data) {
            $("#assessmentGrid").html("");

            studentsrecord = data;
            //console.log(studentsrecord);
            reportForm(studentsrecord);
            var studentId = studentsrecord[0].StudentId;
            loadRemarks(studentId, term, setYear);
            header(studentId, studentClass, term, setYear);
            $("#reportcard").removeAttr("hidden");

            // $('#setYear,#setClass,#setSubject,#setTerm').attr('disabled', 'disabled');
            //console.table(fees);
        },
        error: function (err) {
            // console.log(err);
            if (err.responseText.includes("null")) {
                $("#assessmentGrid").html("");
                $("#assessmentGrid").html("No records found");
                toastr.warning("No records found");
                $("#assessmentGrid,#remarks,#headerremark").html("");
                $("#reportcard").attr("hidden", "true");
            } else {
                console.log(err.responseText);
            }
        },
    });
};

reportForm = () => {
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
            $("#headerremark").html(response);
            // $('#getStudentId').val(studentId);
        },
        error: function (err) {
            console.log(err);
        },
    });
};
