var staff = [];
var Subjects = [];

$(document).ready(function () {
    var uname = localStorage.getItem("username");
    $("#username").text(uname);
    loadStaffData();
    function loadStaffData() {
        $.ajax({
            url: "phpfiles/actions.php",
            type: "POST",
            dataType: "JSON",
            data: "action=staffData",
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (data) {
                pageLoader("hide");
                if (data.length == 1) {
                    staff = [];
                    staffData(staff);
                } else {
                    staff = data;
                    staffData(staff);
                }

                //console.table(students);
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    }

    staffData = () => {
        $("#grid").kendoGrid({
            dataSource: {
                data: staff,
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
                        "<button id='enrollModal' onClick='enrollModal()' class='btn .btn btn-success' style='float:right'><i class='fa fa fa-plus'></i>&nbsp;Add Staff</button><button id='enrollModal' onClick='loadStaffData()' class='btn .btn btn-warning' style='float:right; margin-right:10px'><i class='fa fa fa-refresh'></i>&nbsp;Refresh Data</button>",
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
                    field: "StaffId",
                    title: "regId",
                    width: "15%",
                    hidden: true,
                },
                { field: "Name", title: "Name", width: "20%" },
                { field: "fname", title: "FName", width: "15%", hidden: true },
                { field: "lname", title: "LName", width: "15%", hidden: true },
                { field: "mname", title: "MName", width: "15%", hidden: true },
                {
                    field: "DOB",
                    title: "Birth Date",
                    width: "10%",
                    hidden: true,
                },
                { field: "Gender", title: "Gender", width: "10%" },
                { field: "Department", title: "Department", width: "10%" },
                { field: "Contact", title: "Contact", width: "10%" },
                { field: "Email", title: "Email", width: "20%" },
                {
                    field: "Duties",
                    title: "Duties",
                    width: "10%",
                    hidden: true,
                },
                {
                    field: "Position",
                    title: "Position",
                    width: "10%",
                    hidden: true,
                },
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

        $(".delete").click(function (ev) {
            //alert('Am i deleted');
            var grid = $("#grid").data("kendoGrid");
            var row = $(ev.target).closest("tr");
            var dataItem = grid.dataItem(row);

            document.getElementById("staffUniqueId").value = dataItem.StaffId;
            var id = document.getElementById("staffUniqueId").value;
            // console.log(dataItem);
            // console.log(id);
            //deletStudent();
            if (confirm("Are sure you want to delete this staff?")) {
                $.ajax({
                    url: "phpfiles/actions.php",
                    type: "post",
                    data: "action=deleteStaff&&StaffId=" + id,
                    beforeSend: function () {
                        pageLoader("show");
                    },
                    success: function (result) {
                        pageLoader("hide");
                        toastr.success(result);
                        // loadStaffData();
                    },
                    error: function (err) {
                        pageLoader("hide");
                        console.log(err);
                    },
                });
            }
        });
    };

    enrollModal = () => {
        $("#staticModalbtn").click();

        //console.log('working');
        clearModal();
    };

    $("#enrollStaffForm")
        .unbind("submit")
        .bind("submit", function () {
            var formData = new FormData($(this)[0]);
            formData.append("subjects", $("#setSubjects").val());

            $.ajax({
                url: "phpfiles/enrollstaff.php",
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
                        loadStaffData();
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

        // console.log("Selected Item: ", dataItem);
        document.getElementById("viewProfileName").innerHTML = dataItem.Name;
        document.getElementById("viewProfileEmail").innerHTML = dataItem.Email;
        document.getElementById("viewProfileContact").innerHTML =
            dataItem.Contact;
        document.getElementById("viewProfilePic").src = dataItem.Image;
        document.getElementById("viewDepartment").innerHTML =
            dataItem.Department;
        document.getElementById("Viewduties").innerHTML = dataItem.Duties;

        var position = dataItem.Position;
        if (position == "") {
            document.getElementById("viewPosition").innerHTML = "N/A";
        } else {
            document.getElementById("viewPosition").innerHTML =
                dataItem.Position;
        }

        var house = dataItem.Duties;
        if (house == "") {
            document.getElementById("ViewSubjectAssigned").innerHTML = "N/A";
        } else {
            document.getElementById("ViewSubjectAssigned").innerHTML =
                dataItem.Duties;
        }
    }

    function getSelectedItem(e) {
        var grid = $("#grid").data("kendoGrid");
        var row = $(e.target).closest("tr");
        var dataItem = grid.dataItem(row);

        //console.log("Grid Data: ", grid)

        console.log("Grid DataItem: ", dataItem);
        document.getElementById("StaffId").value = dataItem.StaffId;
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
                "<option>" +
                dataItem.Gender +
                "</option><option>Female</option>";
        } else {
            selectbox.innerHTML =
                "<option>" + dataItem.Gender + "</option><option>Male</option>";
        }

        document.getElementById("setSubjects").value = dataItem.Duties;
        let mysubject = dataItem.Duties.split(",");

        jQuery(".standardSelect").val(mysubject).trigger("chosen:updated");

        $("#department")
            .find(":selected")
            .text(dataItem.Department)
            .val(dataItem.Department);
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

    // edit student information
    $("#editStaffForm")
        .unbind("submit")
        .bind("submit", function (e) {
            //e.preventDefault();
            var formData = new FormData($(this)[0]);
            formData.append("subjects", $("#setSubjects").val());

            $.ajax({
                url: "phpfiles/editstaff.php",
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
                        loadStaffdata();
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
        Subjects.forEach((subject) => {
            options += `<option value = "${subject.SubjectList}">${subject.SubjectList}</option>`;
        });

        $(".standardSelect").html(options);
        $(".standardSelect").html(options);
        jQuery(".standardSelect")
            .chosen("destroy")
            .chosen({
                disable_search_threshold: 5,
                no_results_text: "Oops, nothing found!",
                width: "100%",
            })
            .change(function (event) {
                if (event.target == this) {
                    var myValue = $(this).val();
                    $("#setSubjects").val(myValue);
                    console.log(myValue);
                }
            });
    }
});
