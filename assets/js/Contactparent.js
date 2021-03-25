$(document).ready(function () {
    var ParentList = [];
    var uname = localStorage.getItem("username");
    $("#username").text(uname);

    //gets lists of students parents
    getParents = () => {
        var getClass = $("#selectClass").val();
        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            data: "action=getParentContact&&getClass=" + getClass,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                console.log(res);
                ParentList = JSON.parse(res);
                SetParentList();
                //$("#getList").html(res);
            },
            error: function (err) {
                console.log(err);
            },
        });
    };

    jQuery(document).ready(function () {
        jQuery(".standardSelect")
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
    });

    function SetParentList() {
        let options = "";
        ParentList.forEach((parent) => {
            options += `<option value = "${parent.id}">${parent.name} (${parent.parentEmail})</option>`;
        });

        $(".standardSelect").html(options);
        jQuery(".standardSelect").chosen("destroy").chosen({ width: "100%" });
    }

    sendMessage = () => {
        var setSendTo = $("#setSendTo").val();
        var sendTo = $("#sendTo").val();
        var userid = $("#userid").val();
        var message = $(".messagetxt").val();
        // console.log("setSendTo: ", setSendTo);
        var title = $("#title").val();
        var sendtoAll = "Parent";

        if (sendTo != "") {
            if (
                $("#sentToAll").prop("checked") &&
                message != "" &&
                title != ""
            ) {
                setSendTo = ParentList.toString();

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
                        location.href = "contactparent.html";
                    },
                    error: function (err) {
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
                        toastr.success(res);
                        pageLoader("hide");
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

    function reload(url) {
        location.href = url;
    }
});
