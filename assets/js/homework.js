$("#addHomework").click(function () {
    ClearForm();
});
var homeworkform = "";
var SubjectArray = [];
var url = `phpfiles/homework.php`;
var HomeWorkList = [];
$(document).ready(function () {
    var uname = localStorage.getItem("username");
    $("#username").text(uname);

    var Staff = [];

    LoadAllStaff();

    function LoadAllStaff() {
        let data = new FormData();
        data.append("action", "LoadAllStaff");
        pageLoader("show");
        fetch(url, { method: "POST", body: data })
            .then((response) => {
                console.log(response);
                return response.json();
                if (response.ok) {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                Staff = data;
                LoadStaff();
            })
            .catch((err) => {
                console.log(err);
                pageLoader("hide");
            });
    }

    function LoadStaff() {
        console.log(Staff);

        let options = "";
        Staff.forEach(function (element) {
            options += `<div class="col-md-4">
                            <aside class="profile-nav alt">
                                <section class="card">
                                    <div class="card-header user-header alt bg-dark">
                                        <div class="media">
                                            <a href="#">
                                                <img class="align-self-center rounded-circle mr-3" style="width:85px; height:85px;" alt="" src="${element.image}">
                                            </a>
                                            <div class="media-body">
                                                <h2 class="text-light display-6">${element.name}</h2>
                                                <p>${element.subject}</p>
                                            </div>
                                        </div>
                                    </div>


                                    <ul class="list-group list-group-flush">

                                        <li class="list-group-item availableHomework">
                                            <a class="showHomework" getid="${element.id}" sub="${element.subject}" name="${element.name}" style="z-index: 10;" > 
                                            
                                            
                                            <i class="fa fa-bell-o"></i> Available Homework <span class="badge badge-success pull-right">${element.availabbleHomework}</span></a>
                                        </li>
                                        <li class="list-group-item">
                                            <a href="#"> <i class="fa fa-tasks"></i> Previous Homework <span class="badge badge-danger pull-right">${element.previousHomework}</span></a>
                                        </li>
                                        <li class="list-group-item">
                                            <a href="#"> <i class="fa fa-comments-o"></i> Message <span class="badge badge-warning pull-right r-activity">${element.message}</span></a>
                                        </li>
                                    </ul>

                                </section>
                            </aside>
                        </div>`;

            pageLoader("hide");
        });
        $(".homeworkview").html(options);

        $(".showHomework").click(function () {
            let id = $(this).attr("getid");
            let sub = $(this).attr("sub");
            let name = $(this).attr("name");
            LoadHomeWorkList(id, sub, name);
        });
    }

    $("#homeworkFile").change(function () {
        //var file_data = $(this).prop("files")[0];
        var prop = document.getElementById("homeworkFile").files[0];
        var image = prop.name;
        var image_size = prop.size;
        var image_ext = image.split(".").pop().toLowerCase();
        if (
            jQuery.inArray(image_ext, ["gif", "png", "jpg", "jpeg", "pdf"]) ==
            -1
        ) {
            toastr.error("Please select a valid file.");

            $("#homeworkFile").val("");
        } else if (image_size > 5000000) {
            toastr.error("Please file size is too big");

            $("#file").val("");
        } else if (
            jQuery.inArray(image_ext, ["gif", "png", "jpg", "jpeg", "pdf"]) !=
                -1 &&
            image_size <= 1500000
        ) {
        }
    });

    homeworkform = document.getElementById("homeWorkForm");

    homeworkform.addEventListener("submit", function (e) {
        pageLoader("show");
        e.preventDefault();
        $("#teacherName").removeAttr("disabled");
        let userId = document.getElementById("userId").value;
        console.log(userId);
        let formData = new FormData(this);
        formData.append("action", "submit");
        formData.append("userId", userId);

        fetch(url, { method: "POST", body: formData })
            .then((response) => {
                $("#teacherName").attr("disabled", "disabled");
                console.log(response);
                return response.json();
                if (response.ok) {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                LoadAllStaff();
                ClearForm();
                $(".cancel").click();
                pageLoader("hide");
            })
            .catch((err) => {
                console.log(err);
                pageLoader("hide");
            });
    });
    LoadSubjects();
    function LoadSubjects() {
        pageLoader("show");
        let url = "phpfiles/actions.php";

        let data = new FormData();
        data.append("action", "subjectList");

        fetch(url, { method: "POST", body: data })
            .then((response) => {
                console.log(response);
                return response.json();
                if (response.ok) {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                SubjectArray = data;
                setSubject();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function ClearForm() {
        $("#subject").val("");
        $("#homeworkTitle").val("");
        $("#homeworkFile").val("");
        $("#message").val("");
    }

    function setSubject() {
        console.log("subjects: ", SubjectArray);
        let options =
            '<option value="" disabled selected >Select Subject</option>';
        SubjectArray.forEach(function (subject) {
            options += `<option value="${subject.SubjectList}" >${subject.SubjectList}</option>`;
        });
        $("#subject").html(options);
        pageLoader("hide");
    }

    $("#search").keyup(function () {
        // console.log($("#search").val());
        let data = new FormData();
        data.append("search", $("#search").val());
        data.append("action", "SearchStaff");

        fetch(url, { method: "POST", body: data })
            .then((response) => {
                console.log(response);
                return response.json();
                if (response.ok) {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                Staff = data;
                LoadStaff();
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    function LoadHomeWorkList(id, sub, name) {
        pageLoader("show");
        $(".sub").text(name + " " + sub + " Homework");
        console.log(id, sub);
        let formData = new FormData();
        formData.append("action", "LoadHomeWorkList");
        formData.append("userId", id);
        formData.append("subject", sub);

        fetch(url, { method: "POST", body: formData })
            .then((response) => {
                return response.json();
                if (response.ok) {
                    throw new Error("Network response was not ok.");
                }
            })
            .then((data) => {
                HomeWorkList = data;
                console.log("HomeWorkList: ", HomeWorkList);
                GetHomeList();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //append list on modal body
    function GetHomeList() {
        pageLoader("hide");
        console.log(HomeWorkList);
        let options = "";
        let currentUser = $("#currentUser").val();
        HomeWorkList.forEach(function (item) {
            // console.log("ID: ", item.id);
            if (currentUser == item.staffId) {
                options += `<tr id="${item.id}">
                            <td>${item.title}</td>
                            <td>${moment().calendar(item.date)}</td>
                            <td>
                            <span><i class="fa fa-eye preview" path = "${
                                item.homeworkFile
                            }" mess ="${item.message}"></i></span>
                             <span>
                             <a href="${item.homeworkFile}" download>
                                <i class="fa fa-download"></i>
                             </a></span>
                             <span>
                             <a myid="${item.id}" >
                                <i class="fa fa-remove remove"></i>
                             </a></span>
                            </td>
                            
                        </tr>`;
            } else if (currentUser != item.staffId) {
                options += `<tr id="${item.id}">
                            <td>${item.title}</td>
                            <td>${moment().calendar(item.date)}</td>
                            <td>
                            <span><i class="fa fa-eye preview" path = "${
                                item.homeworkFile
                            }" mess ="${item.message}"></i></span>
                             <span>
                             <a href="${item.homeworkFile}" download>
                                <i class="fa fa-download"></i>
                             </a></span>
                            
                            </td>
                            
                        </tr>`;
            }
        });

        $("#homeworkList").html(options);
        $("#homeworkListModalBtn").click();

        $(".preview").click(function () {
            let message = $(this).attr("mess");

            $("#homeworkmessage").html(message);
            $("#PreviewHomeworkModalBtn").click();
            let filepath = $(this).attr("path");
            // document.getElementById("previewHomework").src = filepath;
            // console.log(filepath);
            //console.log($("#previewHomework").attr("src", filepath.value));
            $("#previewHomework").attr("src", filepath + "#toolbar=0");
        });
        $(".remove").click(function () {
            let id = $(this).closest("tr").attr("id");
            let data = new FormData();
            data.append("action", "RemoveHomework");
            data.append("id", id);

            if (confirm("Do you want to remove this homework?")) {
                pageLoader("show");
                fetch(url, { method: "POST", body: data })
                    .then((response) => {
                        return response.text();
                        if (response.ok) {
                            throw new Error("Network response was not ok.");
                        }
                    })
                    .then((data) => {
                        console.log(data);
                        if ("Done") {
                            $("#" + id).remove();
                        }
                        pageLoader("hide");
                    })
                    .catch((err) => {
                        pageLoader("hide");
                        console.log(err);
                    });
            }
        });
    }
});
