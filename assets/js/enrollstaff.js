var students = [];
var Subjects = [];

$(document).ready(function () {
    var uname = localStorage.getItem("username");
    $("#username").text(uname);

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
                    studentsData(students);
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
    };

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
                {
                    field: "StudId",
                    title: "StudId",
                    width: "15%",
                    hidden: true,
                },
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
                data: "action=deleteStudent&&Studi=" + id,
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
        document.getElementById("viewProfileContact").innerHTML =
            dataItem.Contact;
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

        //console.log("Grid Data: ", grid)

        console.log("Grid DataItem: ", dataItem.Image);
        document.getElementById("StudId").value = dataItem.StudId;
        $("#profileimage2").attr("src", dataItem.Image);
        // document.getElementById('file').value = dataItem.Image;
        document.getElementById("fname").value = dataItem.fname;
        document.getElementById("mname").value = dataItem.mname;
        document.getElementById("lname").value = dataItem.lname;
        document.getElementById("dob").value = dataItem.DOB;
        document.getElementById("contact").value = dataItem.Contact;
        document.getElementById("email").value = dataItem.Email;
        $("#gender")
            .find(":selected")
            .text(dataItem.Gender)
            .val(dataItem.Gender.substring(0, 1));
        $("#studLevel")
            .find(":selected")
            .text(dataItem.Classroom)
            .val(dataItem.Classroom);
    }

    clearModal = () => {
        $("#profileimage,#profileimage2").attr("src", "images/default.jpg");
        // document.getElementById('fname').value = '';
        // document.getElementById('mname').value = '';
        // document.getElementById('lname').value = '';
        // document.getElementById('dob').value = '';
        // document.getElementById('contact').value = '';
        // document.getElementById('email').value = '';
        // $('#gender').find(":selected").text("Select Gender");
        // $('#studLevel').find(":selected").text("Select Class");

        // $('#fname1, #lname1, #mname1, #email1,#contact1, #dob1').val('');
        // $('#gender1').find(":selected").text("Select Gender");
        //$('#studLevel1').find(":selected").val("");

        $("form input[type=text]").val("");
        $("form input[type=date]").val("");
        $("form select").val("");
        $("form input[type=email]").val("");
        $("form input[type=file]").val("");
        $("form select").val("");
    };

    SubjectList();
    // club list
    function SubjectList() {
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=subjectList",
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },

            success: function (response) {
                pageLoader("hide");
                Subjects = response;
                SetSubjectList();
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    }

    function SetSubjectList() {
        let options = "";
        Clubs.forEach((subject) => {
            options += `<option value = "${subject.SubjectList}">${subject.SubjectList}</option>`;
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
                    $("#Subjects").val(myValue);
                    console.log(myValue);
                }
            });
    }
});
