checkimage = () => {
    var fileType = $("#fileType").val();
    if (fileType == "Image") {
        var file_data = $("#file").prop("files")[0];
        var prop = document.getElementById("file").files[0];
        var image = prop.name;
        var image_size = prop.size;
        var image_ext = image.split(".").pop().toLowerCase();
        if (jQuery.inArray(image_ext, ["gif", "png", "jpg", "jpeg"]) == -1) {
            toastr.error("Please select a valid image file.");

            $("#file").val("");
        } else if (image_size > 5000000) {
            toastr.error("Please image size is too big");

            $("#file").val("");
        } else if (
            jQuery.inArray(image_ext, ["gif", "png", "jpg", "jpeg"]) != -1 &&
            image_size <= 1500000
        ) {
        }
        console.log("Upload Image");
    } else if (fileType == "Video") {
        var file_data = $("#file").prop("files")[0];
        var prop = document.getElementById("file").files[0];
        var image = prop.name;
        var image_size = prop.size;
        var image_ext = image.split(".").pop().toLowerCase();
        if (
            jQuery.inArray(image_ext, [
                "mp4",
                "MP4",
                "MKV",
                "AVI",
                "mkv",
                "avi",
            ]) == -1
        ) {
            toastr.error(
                "Please select a video with extension mp4 or mkv or avi."
            );

            $("#file").val("");
        } else if (image_size > 50000000) {
            toastr.error("Please video size is too big");

            $("#file").val("");
        } else if (
            jQuery.inArray(image_ext, [
                "mp4",
                "MP4",
                "MKV",
                "AVI",
                "mkv",
                "avi",
            ]) != -1 &&
            image_size <= 15000000
        ) {
        }
        console.log("Upload video");
    }

    if (fileType == "Book") {
        var file_data = $("#file").prop("files")[0];
        var prop = document.getElementById("file").files[0];
        var image = prop.name;
        var image_size = prop.size;
        var image_ext = image.split(".").pop().toLowerCase();
        if (jQuery.inArray(image_ext, ["pdf", "ppt", "doc"]) == -1) {
            toastr.error("Please select a valid book file (.pdf, .ppt, .doc).");

            $("#file").val("");
        } else if (image_size > 5000000) {
            toastr.error("Please book size is too big");

            $("#file").val("");
        } else if (
            jQuery.inArray(image_ext, ["pdf", "ppt", "doc"]) != -1 &&
            image_size <= 1500000
        ) {
        }
        console.log("Upload book");
    }
};

$("#uploadForm")
    .unbind("submit")
    .bind("submit", function () {
        var formData = new FormData($(this)[0]);

        $.ajax({
            url: "phpfiles/uploadfiles.php",
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
                //console.log(output)
                var res = output[0].prompt;
                var title = output[0].Title;
                var type = output[0].Type;
                var fileurl = output[0].FileUrl;
                var summary = output[0].Summary;
                var userId = output[0].UserId;
                var id = output[0].RowId;
                if (res == "Done.") {
                    toastr.success("Upload Successful.");
                    $(".cancel").click();
                    clearfields();
                    template(title, type, fileurl, summary, id, userId);
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

loadResorcefiles = () => {
    $.ajax({
        url: "phpfiles/loadresorcefiles.php",
        type: "post",
        dataType: "JSON",
        data: "action=loadresorcefiles",
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            //console.log(data)
            var mess = data[0].message;
            if (mess.includes("Oops!! No resource material found")) {
                toastr.info("Oops!! No resource material found");
            } else {
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var title = data[i].Title;
                    var type = data[i].Type;
                    var fileurl = data[i].FileUrl;
                    var summary = data[i].Summary;
                    var userId = data[i].UserId;
                    var id = data[i].RowId;

                    template(title, type, fileurl, summary, id, userId);
                }
            }
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

function _show() {
    var search = $("#search").val();

    $.ajax({
        url: "phpfiles/loadresorcefiles.php",
        type: "post",
        dataType: "JSON",
        data: "action=searchresorcefiles&&search=" + search,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            console.log(data);
            var mess = data[0].message;
            if (mess.includes("Oops!! No resource material found")) {
                toastr.info("Oops!! No resource material found");
            } else {
                $("#result").html("");
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var title = data[i].Title;
                    var type = data[i].Type;
                    var fileurl = data[i].FileUrl;
                    var summary = data[i].Summary;
                    var userId = data[i].UserId;
                    var id = data[i].RowId;

                    template(title, type, fileurl, summary, id, userId);
                }
            }
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
}

template = (title, type, fileurl, summary, id, userId) => {
    var getUser = $("#getUser").val();
    // console.log(getUser + "   " + userId)
    var title = title;
    var type = type;
    var fileurl = fileurl;
    var summary = summary;
    var rowId = id;
    var userId = userId;

    var template = "";

    if (type == "Book") {
        if (getUser != userId) {
            template =
                '<div class="col-md-4">' +
                '<div class="card delHolder">' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/pdf-file-red.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        if (getUser == userId) {
            template =
                '<div class="col-md-4" id="' +
                rowId +
                '">' +
                '<div  title = "Open ' +
                title +
                '" class="card delHolder">' +
                '<span title = "Remove ' +
                title +
                '" onclick="delItem(' +
                rowId +
                ')" class="delItem"> <i class="fa fa-remove"></i></span>' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/pdf-file-red.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }
    if (type == "Video") {
        if (getUser != userId) {
            template =
                '<div class="col-md-4">' +
                '<div  title = "Open ' +
                title +
                '" class="card delHolder">' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/video.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        if (getUser == userId) {
            template =
                '<div class="col-md-4" id="' +
                rowId +
                '">' +
                '<div  title = "Open ' +
                title +
                '" class="card delHolder">' +
                '<span  title = "Remove ' +
                title +
                '" onclick="delItem(' +
                rowId +
                ')" class="delItem"><i class="fa fa-remove"></i></span>' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/video.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }

    if (type == "Image") {
        if (getUser != userId) {
            template =
                '<div class="col-md-4">' +
                '<div  title = "Open ' +
                title +
                '" class="card delHolder">' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/video.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
        if (getUser == userId) {
            template =
                '<div class="col-md-4" id="' +
                rowId +
                '">' +
                '<div  title = "Open ' +
                title +
                '" class="card delHolder">' +
                '<span  title = "Remove ' +
                title +
                '" onclick="delItem(' +
                rowId +
                ')" class="delItem"><i class="fa fa-remove"></i></span>' +
                '<a href="' +
                fileurl +
                '"> <img class="card-img-top" src="images/video.png" alt="Card image cap"> </a>' +
                '<div class="card-body">' +
                '<h4 class="card-title mb-3">' +
                title +
                "</h4>" +
                '<p class="card-text">' +
                summary +
                "</p>" +
                "</div>" +
                "</div>" +
                "</div>";
        }
    }

    $("#result").append(template);
};

clearfields = () => {
    $("#fileType").val("");
    $("#summary").val("");
    $("#file").val("");
    $("#title").val("");
};

delItem = (id) => {
    $.ajax({
        url: "phpfiles/loadresorcefiles.php",
        type: "post",
        dataType: "JSON",
        data: "action=removeresorcefiles&rowId=" + id,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            toastr.success(data[0].message);
            $("#" + id).remove();
            location.href = "learning.html";
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
};

function _show() {
    var search = $("#search").val();

    $.ajax({
        url: "phpfiles/loadresorcefiles.php",
        type: "post",
        dataType: "JSON",
        data: "action=searchresorcefiles&search=" + search,
        beforeSend: function () {
            pageLoader("show");
        },
        success: function (data) {
            pageLoader("hide");
            console.log(data);
            var mess = data[0].message;
            if (mess.includes("Oops!! No resource material found")) {
                toastr.info("Oops!! No resource material found");
                $("#result").html("");
            } else {
                $("#result").html("");
                var len = data.length;
                for (var i = 0; i < len; i++) {
                    var title = data[i].Title;
                    var type = data[i].Type;
                    var fileurl = data[i].FileUrl;
                    var summary = data[i].Summary;
                    var userId = data[i].UserId;
                    var id = data[i].RowId;

                    template(title, type, fileurl, summary, id, userId);
                }
            }
        },
        error: function (err) {
            pageLoader("hide");
            console.log(err);
        },
    });
}
