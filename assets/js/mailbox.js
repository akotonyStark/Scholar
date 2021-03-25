$(document).ready(function () {
    var StudentList = [];
    var StaffList = [];
    var ParentList = [];
    var AdminList = [];

    var uname = localStorage.getItem("username");
    $("#username").text(uname);

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
});

loadInboxMessages = (id) => {
    var Id = id;
    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data: "action=InboxMessages&userid=" + Id,
        dataType: "JSON",
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (res) {
            pageLoader("hide");
            var len = res.length;
            for (var i = 0; i < len; i++) {
                var prompt = res[i].Prompt;
                if (prompt == "True") {
                    var Title = res[i].Title;
                    var Message = res[i].Message;
                    var date = res[i].Date;
                    var Name = res[i].Name;
                    var Status = res[i].Status;
                    var id = res[i].MessageId;

                    messagetr(id, Name, Title, Message, date, Status);
                } else {
                    toastr.info("You have no messages.");
                    $("table").append("You have no messages");
                }
            }
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

messagetr = (id, Name, Title, Message, date, status) => {
    var template = "";
    var Message = Message.slice(0, 50);
    var date = date.slice(0, 10);
    if (status == "0") {
        template =
            '<tr id="' +
            id +
            '">' +
            '<td style="width: 25%;" class="open" id="' +
            id +
            '">' +
            Name +
            "</td>" +
            '<td style="width: 55%;" class="open" id="' +
            id +
            '">' +
            "<span><b>" +
            Title +
            " - </b></span><span>" +
            Message +
            "..." +
            "</span>" +
            "</td>" +
            '<td class="date">' +
            moment().calendar(date) +
            "</td>" +
            "<td>" +
            '<div class="actionHolder">' +
            '<i onclick =markAs("' +
            id +
            '") title="Mark as read" class="fa fa-envelope"></i>&nbsp;&nbsp;' +
            '<i onclick =delMessage("' +
            id +
            '") title="Delete" class="fa fa-trash-o"></i>' +
            "</div>" +
            "</td>" +
            "</tr>";
    }
    if (status == "1") {
        template =
            '<tr id="' +
            id +
            '">' +
            '<td style="width: 25%;" class="open" id="' +
            id +
            '">' +
            Name +
            "</td>" +
            '<td style="width: 55%;" class="open" id="' +
            id +
            '">' +
            "<span><b>" +
            Title +
            " - </b></span><span>" +
            Message +
            "..." +
            "</span>" +
            "</td>" +
            '<td class="date">' +
            moment().calendar(date) +
            "</td>" +
            "<td>" +
            '<div class="actionHolder">' +
            '<i id="markas" onclick =markAs("' +
            id +
            '") title="Mark as unread" class="fa fa-envelope-o"></i>&nbsp;&nbsp;' +
            '<i id="delmessage" onclick =delMessage("' +
            id +
            '") title="Delete" class="fa fa-trash-o"></i>' +
            "</div>" +
            "</td>" +
            "</tr>";
    }

    $("tbody").append(template);

    $("table tbody .open").click(function () {
        var id = $(this).attr("id");
        console.log(id);
        $.ajax({
            url: "phpfiles/mailbox.php",
            type: "post",
            data: "action=getMessages&id=" + id,
            dataType: "JSON",
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                var len = res.length;
                for (var i = 0; i < len; i++) {
                    var prompt = res[i].Prompt;
                    if (prompt == "True") {
                        var Title = res[i].Title;
                        var Message = res[i].Message;
                        var date = res[i].Date;
                        var Name = res[i].Name;
                        var image = res[i].Image;
                        var id = res[i].MessageId;

                        viewMessage(id, Name, Title, Message, date, image);
                        getReplies(id);
                    } else {
                        console.log("no data found " + res);
                    }
                }
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    });
};
getReplies = (id) => {
    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data: "action=getReplies&&id=" + id,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (res) {
            // console.log(res)
            pageLoader("hide");
            $(".replymessages").html(res);
        },
    });
};

markAs = (id) => {
    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data: "action=markAs&&id=" + id,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function () {
            pageLoader("hide");
            refresh();
        },
    });
};

delMessage = (id) => {
    // alert(id)
    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data: "action=delMessage&&id=" + id,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (res) {
            pageLoader("hide");
            toastr.success(res);
            $("#" + id).remove();
        },
    });
};

delMessage2 = (id) => {
    // alert(id)
    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data: "action=delMessage&&id=" + id,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (res) {
            pageLoader("hide");
            toastr.success(res);
            refresh();
        },
    });
};

viewMessage = (id, Name, Title, Message, date, image) => {
    var id = id;
    tem =
        "<div class='' style='background:#fff;height:auto; position:relative'>" +
        "<i title='Back' id='back' onclick='refresh()' class='fa fa-hand-o-left'></i>" +
        "<div class='replyholder'>" +
        "<i title='Reply' id='reply' onclick='replyMessage(" +
        id +
        ")' class='fa fa-mail-reply'></i>&nbsp;&nbsp;" +
        "<i title='Reply' id='remove' onclick =delMessage2('" +
        id +
        "') class='fa fa-trash-o'></i>" +
        "</div>" +
        "<div class='messagecontainer'>" +
        "<tr>" +
        "<td><img class='user-avatar rounded-circle img' src='" +
        image +
        "'></td>" +
        "<td>&nbsp;&nbsp;" +
        Name +
        "</td>" +
        "</tr><br><br>" +
        "<div class='replycontainer'></div><br>" +
        "<div class='replymessages'></div><br><br>" +
        "<h5>" +
        Title +
        "</h5><hr><br>" +
        "<p>" +
        Message +
        "</p>" +
        "</div>" +
        "</div><input hidden type='text' class='replyTitle' value='" +
        Title +
        "'>";

    $(".wrapper").html(tem);

    $(".replycontainer").toggle();
};

refresh = () => {
    location.href = "indexmailbox.html";
};

replyMessage = (id) => {
    var messagetitle = $(".replyTitle").val();
    //console.log(messagetitle)
    var replyTem =
        "<div>" +
        '<input type="text" hidden id="messageId" value="' +
        id +
        '">' +
        '<input type="text" class="form-control reply_title" id="reply_title"  placeholder="Title" value="RE:' +
        messagetitle +
        '">' +
        "</div><br>" +
        "<div>" +
        '<textarea class="form-control" id="replytext" cols="80" rows="5" style="resize:none"></textarea>' +
        '<div style="float:right;margin-top:8px" onclick="sendReply()" class="btn btn-success">Send</div>' +
        "</div>";

    $(".replycontainer").html(replyTem);
    $(".replycontainer").toggle();
};

sendReply = () => {
    var reply_text = $("#replytext").val();
    var reply_title = $("#reply_title").val();
    var messageId = $("#messageId").val();

    $.ajax({
        url: "phpfiles/mailbox.php",
        type: "post",
        data:
            "action=replyMessage&&messageId=" +
            messageId +
            "&&reply_text=" +
            reply_text +
            "&&reply_title=" +
            reply_title,

        beforeSend: function () {
            pageLoader("show");
        },
        success: function (res) {
            pageLoader("hide");
            toastr.success(res);
            $(".replymessages").append("<p>" + reply_text + "</p>");
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });

    $(".replycontainer").toggle();
};

//get receiver user level list
$("#sendTo").change(function () {
    let userlevel = $("#sendTo").val();
    console.log(userlevel);
    if (userlevel != "") {
        $.ajax({
            url: "phpfiles/mailbox.php",
            type: "post",
            data: "action=getUserlevel&&userlevel=" + userlevel,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                res = JSON.parse(res);

                if (userlevel == 1) {
                } else if (userlevel == 2) {
                    StudentList = res;
                    SetStudentList();
                } else if (userlevel == 3) {
                    StaffList = res;
                    SetStaffList();
                } else if (userlevel == 4) {
                    ParentList = res;
                    SetParentList();
                }

                console.log("studentClass: ", res);
                // $("#getList").html(res);

                var setSendTo = $("#setSendTo").val();

                // if (setSendTo != "") {
                //     $(".addtitle").removeAttr("hidden");
                // } else {
                //     $(".addtitle").attr("hidden", "true");
                // }
            },
            error: function (err) {
                pageLoader("hide");
            },
        });
    } else {
        $("#getList").html("");
    }
});
function SetStudentList() {
    let options = "";
    StudentList.forEach((student) => {
        options += `<option value = "${student.studentId}">${student.name} (${student.studentClass})</option>`;
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
                $("#setSendTo").val(myValue);
                console.log(myValue);
            }
        });
}
function SetStaffList() {
    let options = "";
    StaffList.forEach((staff) => {
        options += `<option value = "${staff.id}">${staff.name} (${staff.department})</option>`;
    });

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
                $("#setSendTo").val(myValue);
                console.log(myValue);
            }
        });
}
function SetParentList() {
    let options = "";
    ParentList.forEach((parent) => {
        options += `<option value = "${parent.id}">${parent.name}</option>`;
    });

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
                $("#setSendTo").val(myValue);
                console.log(myValue);
            }
        });
}
sendMessage = () => {
    var setSendTo = $("#setSendTo").val();
    var sendTo = $("#sendTo").val();
    var userid = $("#userid").val();
    var message = $(".messagetxt").val();
    console.log("setSendTo: ", setSendTo);
    var title = $("#title").val();
    var sendtoAll = $("#all").text();

    if (sendTo != "") {
        if ($("#sentToAll").prop("checked") && message != "" && title != "") {
            $.ajax({
                url: "phpfiles/mailbox.php",
                type: "post",
                data:
                    "action=sendMessage_all&message=" +
                    message +
                    "&userid=" +
                    userid +
                    "&sendtoAll=" +
                    sendtoAll +
                    "&title=" +
                    title,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (res) {
                    pageLoader("hide");
                    toastr.success(res);
                    location.href = "indexmailbox.html";
                },
                error: function (err) {
                    pageLoader("hide");
                    console.log(err);
                },
            });
        } else if (
            message != "" &&
            title != "" &&
            (setSendTo != "" || setSendTo != null || setSendTo.length > 0)
        ) {
            $.ajax({
                url: "phpfiles/mailbox.php",
                type: "post",
                data:
                    "action=sendMessage&message=" +
                    message +
                    "&userid=" +
                    userid +
                    "&setSendTo=" +
                    setSendTo +
                    "&title=" +
                    title,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (res) {
                    //console.log(res);
                    pageLoader("hide");
                    toastr.success(res);
                    setTimeout(reload("indexmailbox.html"), 2000);
                    //location.href = "indexmailbox.html";
                },
                error: function (err) {
                    pageLoader("hide");
                    console.log(err);
                },
            });
        }
    } else if (sendTo == "") {
        toastr.warning("Please select type of user.");
        $("#sendTo").css("border", "1px solid red");
    }
};
$("#sendTo").change(function () {
    let sentto = $("#sendTo").val();
    if (sentto != "") {
        $("#sendTo").css("border", "1px solid #e1e1e1");
    }
});
function reload(url) {
    location.href = url;
}

$("#toCompose").click(function () {
    $("#messagescontent").attr("hidden", "true");
    $("#composecontent").removeAttr("hidden");
});

$("#toInbox").click(function () {
    $("#messagescontent").removeAttr("hidden");
    $("#composecontent").attr("hidden", "true");
});

$("#sendTo").change(function () {
    var sendTo = $("#sendTo").val();
    var toall = "";
    if (sendTo == "2") {
        toall = "Students";
    }
    if (sendTo == "3") {
        toall = "Staff";
    }
    if (sendTo == "4") {
        toall = "Parent";
    }
    $("#all").html(toall);
});

$(".attachfileBtn").click(function () {
    $(".attachfileBtn").click();
});
