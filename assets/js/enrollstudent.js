var students = [];
var Clubs = [];
jQuery(document)
    .ready(function () {
        jQuery(".standardSelect").chosen({
            disable_search_threshold: 10,
            no_results_text: "Oops, nothing found!",
            width: "100%",
        });
    })
    .change(function (event) {
        if (event.target == this) {
            var myValue = $(this).val();
            $("#setSendTo").val(myValue);
            console.log(myValue);
        }
    });

// $(document).ready(function() {

loadStudentdata = () => {
    $.ajax({
        url: "phpfiles/actions.php",
        type: "POST",
        dataType: "JSON",
        data: "action=studentData",
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            if (data.length == 1) {
                students = [];
                // console.log(students);
                studentsData(students);
            } else {
                students = data;
                studentsData(students);
            }

            console.table(students);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

function findStuent() {
    var search = $("#search").val();

    $.ajax({
        url: "phpfiles/actions.php",
        type: "post",
        dataType: "JSON",
        data: "action=searchstudent&search=" + search,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            if (data.length == 0) {
                students = [];
                // studentsData(students);
            } else {
                students = data;
                studentsData(students);
            }

            //console.table(students);
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
}

// var studentData = loadStudentdata();
// console.log("StudData: " + studentData)
studentsData = (students) => {
    var students = students;
    $("#grid").kendoGrid({
        dataSource: {
            data: students,
            pageSize: 5,
        },
        sortable: true,
        filterable: false,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5,
        },
        groupable: false,
        toolbar: [
            {
                template:
                    "<button id='enrollModal' onClick='enrollModal()' class='btn .btn btn-success' style='float:right'><i class='fa fa fa-plus'></i>&nbsp;Add Student</button><button id='enrollModal' onClick='loadStudentdata()' class='btn .btn btn-warning' style='float:right; margin-right:10px'><i class='fa fa fa-refresh'></i>&nbsp;Refresh Data</button>",
            },
        ],
        height: 500,
        columns: [
            {
                field: "Image",
                title: "Image",
                width: "7%",
                template:
                    "<div><img class='img1' style='width:80px; height:80px;' src='#= Image #' /></div>",
                hidden: false,
            },
            { field: "StudId", title: "StudId", width: "15%", hidden: true },
            { field: "Name", title: "Name", width: "20%" },
            { field: "fname", title: "FName", width: "15%", hidden: true },
            { field: "lname", title: "LName", width: "15%", hidden: true },
            { field: "mname", title: "MName", width: "15%", hidden: true },
            { field: "DOB", title: "Birth Date", width: "10%" },
            { field: "Gender", title: "Gender", width: "10%" },
            { field: "Classroom", title: "Class", width: "10%" },
            { field: "Contact", title: "Contact", width: "10%" },
            { field: "Email", title: "Email", width: "20%" },
            { field: "Club", title: "Club", width: "20%", hidden: true },
            { field: "House", title: "House", width: "20%", hidden: true },
            {
                field: "Action",
                title: "Action",
                width: "10%",
                template:
                    "<button id='delete' class='btn .btn btn-danger delete' style='float:right'><i class='fa fa fa-remove'></i></button>" +
                    "<button id='edit' onClick='enrollModal_edit()' class='btn .btn btn-success' style='float:right'><i class='fa fa fa-edit'></i></button>" +
                    "<button id='view' onClick='viewModal()' class='btn .btn btn-info' style='float:right'><i class='fa fa fa-eye'></i></button>",
            },
        ],
    });

    //add event listender to kendo action buttons
    var grid = $("#grid").data("kendoGrid");
    grid.tbody.on("click", "#edit", getSelectedItem);
    grid.tbody.on("click", "#view", viewSelectedItem);

    //grid.tbody.on("click", "#delete", deletStudent);
    $(".delete").click(function (ev) {
        //alert('Am i deleted');
        var grid = $("#grid").data("kendoGrid");
        var row = $(ev.target).closest("tr");
        var dataItem = grid.dataItem(row);

        document.getElementById("studUniqueId").value = dataItem.studId;
        var id = document.getElementById("studUniqueId").value;
        //deletStudent();

        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            data: "action=deleteStudent&&StudId=" + id,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (result) {
                pageLoader("hide");
                toastr.success(result);
                loadStudentdata();
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    });
};

enrollModal = () => {
    $("#staticModalbtn").click();

    //console.log('working');
    clearModal();
};
enrollModal_edit = () => {
    $("#staticModalbtn2").click();

    //console.log('working');
    clearModal();
};

viewModal = (e) => {
    $("#staticModalbtn3").click();
};

function viewSelectedItem(e) {
    var grid = $("#grid").data("kendoGrid");
    var row = $(e.target).closest("tr");
    var dataItem = grid.dataItem(row);

    console.log("Selected Item: ", dataItem);
    document.getElementById("viewProfileName").innerHTML = dataItem.Name;
    document.getElementById("viewProfileEmail").innerHTML = dataItem.Email;
    document.getElementById("viewProfileContact").innerHTML = dataItem.Contact;
    document.getElementById("viewProfilePic").src = dataItem.Image;
    document.getElementById("viewClass").innerHTML = dataItem.Classroom;

    var club = dataItem.Club;
    if (club == "") {
        document.getElementById("viewClub").innerHTML = "N/A";
    } else {
        document.getElementById("viewClub").innerHTML = dataItem.Club;
    }

    var house = dataItem.House;
    if (house == "") {
        document.getElementById("viewHouse").innerHTML = "N/A";
    } else {
        document.getElementById("viewHouse").innerHTML = dataItem.House;
    }
}

function getSelectedItem(e) {
    var grid = $("#grid").data("kendoGrid");
    var row = $(e.target).closest("tr");
    var dataItem = grid.dataItem(row);

    console.log("Grid Data: ", dataItem);

    console.log("Grid DataItem: ", dataItem.Club);
    document.getElementById("StudId").value = dataItem.StudId;
    $("#profileimage2").attr("src", dataItem.Image);
    // document.getElementById('file').value = dataItem.Image;
    document.getElementById("fname").value = dataItem.fname;
    document.getElementById("mname").value = dataItem.mname;
    document.getElementById("lname").value = dataItem.lname;
    document.getElementById("dob").value = dataItem.DOB;
    document.getElementById("contact").value = dataItem.Contact;
    document.getElementById("email").value = dataItem.Email;
    var selectbox = document.getElementById("gender");
    document.getElementById("gender").innerHTML = selectbox.innerHTML;
    var genSel = dataItem.Gender.substring(0, 1);
    if (genSel == "M") {
        selectbox.innerHTML =
            "<option>" + dataItem.Gender + "</option><option>Female</option>";
    } else {
        selectbox.innerHTML =
            "<option>" + dataItem.Gender + "</option><option>Male</option>";
    }
    document.getElementById("setClubs").value = dataItem.Club;
    let myclub = dataItem.Club.split(",");
    jQuery(".standardSelect").val(myclub).trigger("chosen:updated");
    document.getElementById("house").value = dataItem.House;
    $("#studLevel")
        .find(":selected")
        .text(dataItem.Classroom)
        .val(dataItem.Classroom);
}

clearModal = () => {
    $("#profileimage,#profileimage2").attr("src", "images/default.jpg");

    $("form input[type=text]").val("");
    $("form input[type=date]").val("");
    $("form select").val("");
    $("form input[type=email]").val("");
    $("form input[type=file]").val("");
    $("form select").val("");
};

// enroll student
$("#enrollStudForm")
    .unbind("submit")
    .bind("submit", function () {
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: "phpfiles/enrollstudent.php",
            type: "post",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (output) {
                pageLoader("hide");
                var res = output.prompt;
                if (res == "Done.") {
                    toastr.success("Registration Successful.");
                    clearModal();
                    loadStudentdata();
                    $(".cancel").click();
                } else {
                    toastr.error(output.prompt);
                }
            },
            error: function (e) {
                pageLoader("hide");
                console.log(e);
            },
        });
        return false;
    });

// edit student information
$("#editStudForm")
    .unbind("submit")
    .bind("submit", function (e) {
        //e.preventDefault();
        // alert($("#setClubs").val());
        var formData = new FormData($(this)[0]);
        formData.append("clubs", $("#setClubs").val());

        $.ajax({
            url: "phpfiles/editstudent.php",
            type: "post",
            data: formData,
            dataType: "JSON",
            cache: false,
            processData: false,
            contentType: false,
            async: false,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (output) {
                pageLoader("hide");
                var res = output.prompt;
                if (res == "Done") {
                    toastr.success("Update Successful.");
                    loadStudentdata();
                    $(".cancel").click();
                    clearModal();
                } else {
                    toastr.error(output.prompt);
                }
            },
            error: function (e) {
                pageLoader("hide");
                console.log(e);
            },
        });
        return false;
    });

ClubList();
// club list
function ClubList() {
    $.ajax({
        type: "post",
        url: "phpfiles/actions.php",
        data: "action=clubList",
        dataType: "JSON",
        beforeSend: function () {
            pageLoader("show");
        },

        success: function (response) {
            Clubs = response;
            SetClubList();
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function SetClubList() {
    let options = "";
    Clubs.forEach((club) => {
        options += `<option value = "${club.ClubList}">${club.ClubList}</option>`;
    });

    $(".standardSelect").html(options);
    $(".standardSelect").html(options);
    jQuery(".standardSelect")
        .chosen("destroy")
        .chosen({
            disable_search_threshold: 10,
            no_results_text: "Oops, nothing found!",
            width: "100%",
        })
        .change(function (event) {
            if (event.target == this) {
                var myValue = $(this).val();
                $("#setClubs").val(myValue);
                console.log(myValue);
            }
        });
    pageLoader("hide");
}

// });

// //gets lists of students parents
// getParents = () => {
//     var getClass = $('#selectClass').val()
//     $.ajax({
//         url: "phpfiles/action.php",
//         type: "post",
//         data: "action=getParentContact&&getClass=" + getClass,
//         beforeSend: function() {

//         },
//         success: function(res) {
//             $('#getList').html(res)
//         },
//         error: function(err) {
//             console.log(err)
//         }
//     })
// }
