function pageLoader(strType) {
    let something;
    let theName = strType.toLowerCase();
    something =
        theName == "show"
            ? $("body").LoadingOverlay("show", {
                  background: "rgba(192,192,192,0.3)",
              })
            : theName == "hide"
            ? $("body").LoadingOverlay("hide", true)
            : console.log("Contact CoderBot if Loader does not work!");
    return something;
}
$(document).ready(function () {
    // currentAnnouncement()
    var GetClass = [];
    var Clubs = [];
    refresh = (url) => {
        var url = url;
        location.href = url;
    };

    $("#loginform")
        .unbind("submit")
        .bind("submit", function () {
            var formData = new FormData($(this)[0]);

            $.ajax({
                url: "phpfiles/login.php",
                type: "post",
                data: formData,
                dataType: "JSON",
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                beforeSend: function () {
                    // pageLoader("show");
                },
                success: function (result) {
                    //  pageLoader("hide");
                    var res = result[0].prompt;
                    var url = result[0].url;
                    if (res == "done") {
                        window.location.href = "" + url + "";
                    } else {
                        toastr.error(res);
                    }
                },
                error: function (err) {
                    console.log(err);
                },
            });

            return false;
        });

    // class list
    classList = () => {
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=classList",
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },

            success: function (response) {
                pageLoader("hide");
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var classes = response[i].ClassList;

                    var myClassList =
                        "<option value='" +
                        classes +
                        "'>" +
                        classes +
                        "</option>";
                    //console.log(classes)
                    $("#setClass,#studLevel1,#studLevel,#selectClass").append(
                        myClassList
                    );
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    };
    // editng class
    getClassValue = () => {
        var getseletedValue = $("#setClass").val();
        if (getseletedValue == "") {
            $("#addClassBtn").removeAttr("disabled");
            $("#removeclass,#editclass").attr("disabled", "disabled");
        } else if (getseletedValue != "") {
            $("#addClassBtn").attr("disabled", "disabled");
            $("#removeclass,#editclass").removeAttr("disabled");
        }
    };

    //update class
    updateClass = () => {
        var getText = $("#editclass").text();
        var setclassValue = $("#setClass").val();
        var getNewValue = $("#className").val();
        //console.log(getText);

        if (getText == "Edit") {
            $("#className").val(setclassValue);
            $("#editclass").text("Done");
        } else if (getText == "Done") {
            $("#editclass").text("Done");

            var id = $(this).val();
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data:
                    "action=UpdateClass&getNewValue=" +
                    getNewValue +
                    "&oldclassValue=" +
                    setclassValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    if (response.includes("Done")) {
                        $("#editclass").text("Edit");
                        $("#className").val("");
                        $("#setClass :selected").remove();
                        $("#setClass").append(
                            "<option>" + getNewValue + "</option>"
                        );
                        $("#addClassBtn").removeAttr("disabled");
                        $("#removeclass,#editclass").attr(
                            "disabled",
                            "disabled"
                        );
                        toastr.success(" Update Successful");
                        toastr.success(
                            getNewValue + " is added to class list."
                        );
                    }
                },
            });
        }
    };

    //add class
    AddClass = () => {
        var classname = $("#className").val();

        if (classname == "") {
            toastr.error("Please enter class name ");

            // $('#classname').css('border','1px solid red');
        } else {
            //console.log(classname);
            $.ajax({
                type: "POST",

                url: "phpfiles/actions.php",
                data: "action=addClass&className=" + classname,

                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (response) {
                    pageLoader("hide");
                    var found = "already added";
                    if (response.includes(found)) {
                        toastr.warning(response);
                        toastr.error("Class not added");
                    } else {
                        toastr.success(response);
                        $("#setClass").append(
                            "<option>" + classname + "</option>"
                        );
                        $("#className").val("");
                    }
                },
            });
        }
    };

    // remove class
    removeClass = () => {
        var getValue = $("#setClass").val();
        if (confirm("Do you want to remove " + getValue + "?")) {
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data: "action=RemoveClass&getValue=" + getValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    toastr.success(response);
                    $("#setClass :selected").remove();
                    $("#addClassBtn").removeAttr("disabled");
                    $("#removeclass,#editclass").attr("disabled", "disabled");
                },
            });
        }
    };

    // subject list
    subjectList = () => {
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
                SubjectArray = response;
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var subjects = response[i].SubjectList;

                    var mysubject =
                        "<option value='" +
                        subjects +
                        "'>" +
                        subjects +
                        "</option>";
                    //console.log(subjects)
                    $("#setSubject,#setSubject2").append(mysubject);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    };

    //add subject
    AddSubject = () => {
        var subjectname = $("#subjectName").val();

        if (subjectname == "") {
            toastr.error("Please enter subject name ");

            // $('#classname').css('border','1px solid red');
        } else {
            //console.log(subjectname);
            $.ajax({
                type: "POST",

                url: "phpfiles/actions.php",
                data: "action=addSubject&subjectName=" + subjectname,

                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (response) {
                    pageLoader("hide");
                    var found = "already added";
                    if (response.includes(found)) {
                        toastr.warning(response);
                        toastr.error("Subject not added");
                    } else {
                        toastr.success(response);
                        $("#setSubject,#getSubjects").append(
                            "<option>" + subjectname + "</option>"
                        );
                        $("#subjectName").val("");
                    }
                },
            });
        }
    };

    // remove subject
    removeSubject = () => {
        var getValue = $("#setSubject").val();
        if (confirm("Do you want to remove " + getValue + "?")) {
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data: "action=RemoveSubject&getValue=" + getValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    toastr.success(response);
                    $("#setSubject :selected").remove();
                    $("#addSubjectBtn").removeAttr("disabled");
                    $("#removesubject,#editsubject").attr(
                        "disabled",
                        "disabled"
                    );
                },
            });
        }
    };

    // editng subject
    getSubjectValue = () => {
        var getseletedValue = $("#setSubject").val();
        if (getseletedValue == "") {
            $("#addSubjectBtn").removeAttr("disabled");
            $("#removesubject,#editsubject").attr("disabled", "disabled");
        } else if (getseletedValue != "") {
            $("#addSubjectBtn").attr("disabled", "disabled");
            $("#removesubject,#editsubject").removeAttr("disabled");
        }
    };

    //update subject
    updateSubject = () => {
        var getText = $("#editsubject").text();
        var setclassValue = $("#setSubject").val();
        var getNewValue = $("#subjectName").val();
        //console.log(getText);

        if (getText == "Edit") {
            $("#subjectName").val(setclassValue);
            $("#editsubject").text("Done");
        } else if (getText == "Done") {
            $("#editsubject").text("Done");

            var id = $(this).val();
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data:
                    "action=UpdateSubject&getNewValue=" +
                    getNewValue +
                    "&oldclassValue=" +
                    setclassValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    if (response.includes("Done")) {
                        $("#editsubject").text("Edit");
                        $("#subjectName").val("");
                        $("#setSubject :selected").remove();
                        $("#setSubject").append(
                            "<option>" + getNewValue + "</option>"
                        );
                        $("#addSubjectBtn").removeAttr("disabled");
                        $("#removesubject,#editsubject").attr(
                            "disabled",
                            "disabled"
                        );
                        toastr.success(" Update Successful");
                        toastr.success(
                            getNewValue + " is added to subject list."
                        );
                    }
                },
            });
        }
    };

    // club list
    clubList = () => {
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=clubList",
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },

            success: function (response) {
                pageLoader("hide");
                Clubs = response;
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var clubs = response[i].ClubList;

                    var myclub =
                        "<option value='" + clubs + "'>" + clubs + "</option>";
                    //console.log(clubs)
                    $("#setClub,#club").append(myclub);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    };

    //add club
    AddClub = () => {
        var clubname = $("#clubName").val();

        if (clubname == "") {
            toastr.error("Please enter club name ");

            // $('#classname').css('border','1px solid red');
        } else {
            // console.log(clubname);
            $.ajax({
                type: "POST",

                url: "phpfiles/actions.php",
                data: "action=addClub&clubName=" + clubname,

                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (response) {
                    pageLoader("hide");
                    var found = "already added";
                    if (response.includes(found)) {
                        toastr.warning(response);
                        toastr.error("Club not added");
                    } else {
                        toastr.success(response);
                        $("#setClub").append(
                            "<option>" + clubname + "</option>"
                        );
                        $("#clubName").val("");
                    }
                },
            });
        }
    };

    // remove club
    removeClub = () => {
        var getValue = $("#setClub").val();
        if (confirm("Do you want to remove " + getValue + "?")) {
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data: "action=RemoveClub&getValue=" + getValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("show");
                    toastr.success(response);
                    $("#setClub :selected").remove();
                    $("#addClubBtn").removeAttr("disabled");
                    $("#removeclub,#editclub").attr("disabled", "disabled");
                },
            });
        }
    };

    // // editng club
    // getClubValue = () => {
    //     var getseletedValue = $('#setClub').val();
    //     if (getseletedValue == "") {

    //         $('#addClubBtn').removeAttr('disabled');
    //         $('#removeclub,#editclub').attr('disabled', 'disabled');

    //     } else if (getseletedValue != "") {
    //         $('#addClubBtn').attr('disabled', 'disabled');
    //         $('#removeclub,#editclub').removeAttr('disabled');

    //     }

    // }

    //update club
    updateClub = () => {
        var getText = $("#editclub").text();
        var setclassValue = $("#setClub").val();
        var getNewValue = $("#clubName").val();
        //console.log(getText);

        if (getText == "Edit") {
            $("#clubName").val(setclassValue);
            $("#editclub").text("Done");
        } else if (getText == "Done") {
            $("#editclub").text("Done");

            var id = $(this).val();
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data:
                    "action=UpdateClub&getNewValue=" +
                    getNewValue +
                    "&oldclassValue=" +
                    setclassValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    if (response.includes("Done")) {
                        $("#editclub").text("Edit");
                        $("#clubName").val("");
                        $("#setClub :selected").remove();
                        $("#setClub").append(
                            "<option>" + getNewValue + "</option>"
                        );
                        $("#addClubBtn").removeAttr("disabled");
                        $("#removeclub,#editclub").attr("disabled", "disabled");
                        toastr.success(" Update Successful");
                        toastr.success(getNewValue + " is added to club list.");
                    }
                },
            });
        }
    };

    // editng club
    getClubValue = () => {
        var getseletedValue = $("#setClub").val();
        if (getseletedValue == "") {
            $("#addClubBtn").removeAttr("disabled");
            $("#removeclub,#editclub").attr("disabled", "disabled");
        } else if (getseletedValue != "") {
            $("#addClubBtn").attr("disabled", "disabled");
            $("#removeclub,#editclub").removeAttr("disabled");
        }
    };

    // house

    houseList = () => {
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=houseList",
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },

            success: function (response) {
                pageLoader("hide");
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var houses = response[i].HouseList;
                    var myhouse =
                        "<option value='" +
                        houses +
                        "'>" +
                        houses +
                        "</option>";
                    console.log(houses);
                    $("#setHouse,#house").append(myhouse);
                }
            },
            error: function (err) {
                console.log(err);
            },
        });
    };

    //add house
    AddHouse = () => {
        var housename = $("#houseName").val();

        if (housename == "") {
            toastr.error("Please enter house name ");

            // $('#classname').css('border','1px solid red');
        } else {
            console.log(housename);
            $.ajax({
                type: "POST",

                url: "phpfiles/actions.php",
                data: "action=addHouse&houseName=" + housename,

                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (response) {
                    pageLoader("hide");
                    var found = "already added";
                    if (response.includes(found)) {
                        toastr.warning(response);
                        toastr.error("House not added");
                    } else {
                        toastr.success(response);
                        $("#setHouse").append(
                            "<option>" + housename + "</option>"
                        );
                        $("#houseName").val("");
                    }
                },
            });
        }
    };

    // remove house
    removeHouse = () => {
        var getValue = $("#setHouse").val();
        if (confirm("Do you want to remove " + getValue + "?")) {
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data: "action=RemoveHouse&getValue=" + getValue,
                beforeSend: function () {
                    pageLoader("show");
                },

                success: function (response) {
                    pageLoader("hide");
                    toastr.success(response);
                    $("#setHouse :selected").remove();
                    $("#addHouseBtn").removeAttr("disabled");
                    $("#removehouse,#edithouse").attr("disabled", "disabled");
                },
            });
        }
    };

    //update house
    updateHouse = () => {
        var getText = $("#edithouse").text();
        var sethouseValue = $("#setHouse").val();
        var getNewValue = $("#houseName").val();
        //console.log(getText);

        if (getText == "Edit") {
            $("#houseName").val(sethouseValue);
            $("#edithouse").text("Done");
        } else if (getText == "Done") {
            $("#edithouse").text("Done");

            var id = $(this).val();
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data:
                    "action=UpdateHouse&getNewValue=" +
                    getNewValue +
                    "&oldhouseValue=" +
                    sethouseValue,
                beforeSend: function () {
                    pageLoader("hide");
                },

                success: function (response) {
                    pageLoader("hide");
                    if (response.includes("Done")) {
                        $("#edithouse").text("Edit");
                        $("#houseName").val("");
                        $("#setHouse :selected").remove();
                        $("#setHouse").append(
                            "<option>" + getNewValue + "</option>"
                        );
                        $("#addHouseBtn").removeAttr("disabled");
                        $("#removehouse,#edithouse").attr(
                            "disabled",
                            "disabled"
                        );
                        toastr.success(" Update Successful");
                        toastr.success(getNewValue + " is added to club list.");
                    }
                },
            });
        }
    };

    // editng house
    getHouseValue = () => {
        var getseletedValue = $("#setHouse").val();
        if (getseletedValue == "") {
            $("#addHouseBtn").removeAttr("disabled");
            $("#removehouse,#edithouse").attr("disabled", "disabled");
        } else if (getseletedValue != "") {
            $("#addHouseBtn").attr("disabled", "disabled");
            $("#removehouse,#edithouse").removeAttr("disabled");
        }
    };

    //AddAnnouncement
    AddAnnouncement = () => {
        var announcement = $("#announcement").val();
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=AddAnnouncement&getValue=" + announcement,
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },

            success: function (response) {
                pageLoader("hide");
                toastr.success(response[0].prompt);
                // $("#announcement").html("");
                var listdiv =
                    "<div id='" +
                    response[0].id +
                    "' class='listdiv'><p class='text'> " +
                    response[0].Announcement +
                    "</p>" +
                    "<div class='actionholder'>" +
                    "<span class='listView' onclick=''>" +
                    "<i onclick='setView(" +
                    response[0].id +
                    ");myFun(this);' class='fa fa-eye'></i onclick='myFun(this)'>" +
                    "</span>" +
                    "<span class='listdel' onclick='listdel(" +
                    response[0].id +
                    ")'>" +
                    "<i class='fa fa-remove'></i>" +
                    "</span>" +
                    "</div>";
                $("#announcementList").append(listdiv);
                $("#announcement").val("");
            },
        });
    };

    listdel = (id) => {
        //alert(id);
        if (confirm("Do you want to continue?")) {
            $.ajax({
                type: "post",
                url: "phpfiles/actions.php",
                data: "action=removeAnnouncement&&id=" + id,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (res) {
                    pageLoader("hide");
                    $("#" + id).remove();
                },
            });
        }
    };
    setView = (id) => {
        var id = id;
        $.ajax({
            type: "post",
            url: "phpfiles/actions.php",
            data: "action=makeVisible&&id=" + id,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                toastr.info(res);
            },
        });
    };
    myFun = (x) => {
        x.classList.toggle("fa-eye-slash");
    };
    viewAnnouncement = () => {
        $("#announcementModalbtn").click();
    };
});
