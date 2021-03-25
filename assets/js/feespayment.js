var feepayment = [];
$(document).ready(function () {
    var uname = localStorage.getItem("username");
    $("#username").text(uname);

    function moneyInTxt(value, standard, dec = 2) {
        nf = new Intl.NumberFormat(standard, {
            minimumFractionDigits: dec,
            maximumFractionDigits: 2,
        });
        return nf.format(Number(value) ? value : 0.0);
    }

    function commaRemover(value) {
        value = value.replace(/,/g, "");
        return parseFloat(value);
    }

    loadFeesPayment = () => {
        $.ajax({
            url: "phpfiles/actions.php",
            type: "POST",
            dataType: "JSON",
            data: "action=FeesPayment",
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (data) {
                pageLoader("hide");
                if (data.length == 1) {
                    feepayment = [];
                    feesPayment(feepayment);
                } else {
                    feepayment = data;
                    feesPayment(feepayment);
                }

                //console.table(fees);
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    };

    var onDataBound = function () {
        $("td").each(function () {
            if ($(this).text() > 0) {
                //$(this).css({ 'background-color': '#d9534f' });
                $(this).text(commaRemover($(this).text()));
                $(this).text(moneyInTxt($(this).text()));
            }
        });
    };

    feesPayment = (feepayment) => {
        $("#feeGrid").kendoGrid({
            dataBound: onDataBound,
            dataSource: {
                data: feepayment,
                pageSize: 8,
            },

            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5,
            },
            groupable: true,
            editable: "popup",
            editable: "inline",

            height: 400,
            columns: [
                { field: "studentName", title: "Student Name", width: "35%" },
                {
                    field: "Amount",
                    title: "Amount",
                    width: "15%",
                    attributes: { style: "text-align:right" },
                    headerAttributes: { style: "text-align:right" },
                },
                {
                    field: "Balance",
                    title: "Balance",
                    width: "15%",
                    attributes: { style: "text-align:right" },
                    headerAttributes: { style: "text-align:right" },
                },
                { field: "id", title: "id", width: "17%", hidden: true },
                { field: "paymentType", title: "Payment Type", width: "20%" },
                { field: "Term", title: "Term", width: "20%" },
                { field: "Year", title: "Year", width: "20%" },
                {
                    field: "studentClass",
                    title: "studentClass",
                    width: "20%",
                    hidden: true,
                },
                {
                    field: "Action",
                    title: "Action",
                    width: "15%",
                    headerAttributes: { style: "text-align:right" },
                    template:
                        "<button id='delete' onClick='delete_feePayment(#= id #)' class='btn .btn btn-danger delete' style='float:right'><i class='fa fa fa-remove'></i></button>" +
                        "<button id='edit' onClick='enrollModal_edit(#= id #)'  class='btn .btn btn-success edit' style='float:right'><i class='fa fa fa-edit'></i></button>",
                },
            ],
        });

        //add event listender to kendo action buttons
        var grid = $("#feeGrid").data("kendoGrid");
        grid.tbody.on("click", "#edit", getSelectedItem);
    };

    enrollModal_edit = (id) => {
        $("#staticModalbtn").click();
        var rowId = id;
        $("#rowId").val(rowId);
        setPaymentType(rowId);
    };

    setPaymentType = (rowId) => {
        var rowId = rowId;

        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            dataType: "JSON",
            data: "action=getPaymentClass&&rowId=" + rowId,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                var len = res.length;
                for (var a = 0; a < len; a++) {
                    var getpaymenttype = res[a].PaymentType;
                    var amount = res[a].Amount;

                    var paymenttype =
                        '<option value="' +
                        getpaymenttype +
                        '">' +
                        getpaymenttype +
                        " / GHS" +
                        amount +
                        "</option>";

                    $("#getpaymenttype").append(paymenttype);
                }
            },
            error: function (err) {
                pageLoader("hide");
            },
        });
    };

    function getSelectedItem(e) {
        var grid = $("#feeGrid").data("kendoGrid");
        var row = $(e.target).closest("tr");
        var dataItem = grid.dataItem(row);

        //console.log("Grid Data: ", grid)

        console.log("Grid DataItem: ", dataItem.paymentType);
        document.getElementById("rowId").value = dataItem.id;
        document.getElementById("getstudentname").value = dataItem.studentName;
        document.getElementById("getamountpaid").value = dataItem.Amount;
        document.getElementById("studentClass").value = dataItem.studentClass;
        $("#getpaymenttype")
            .find(":selected")
            .text(dataItem.paymentType)
            .val(dataItem.paymentType);
        $("#getterm").find(":selected").text(dataItem.Term).val(dataItem.Term);
    }

    delete_feePayment = (id) => {
        var id = id;

        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            data: "action=delete_feePayment&&id=" + id,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                pageLoader("hide");
                toastr.success(res);
                loadFeesPayment();
                // location.href = "addfees.html";
            },
            error: function (err) {
                pageLoader("hide");
            },
        });
    };

    jQuery(document).ready(function () {
        jQuery(".standardSelect_Term")
            .chosen({
                disable_search_threshold: 10,
                no_results_text: "Oops, nothing found!",
                width: "100%",
            })
            .change(function (event) {
                if (event.target == this) {
                    var setTerm = $(this).val();

                    $(".setTerm").val(setTerm);
                    selectClass();
                }
            });
    });

    selectClass = () => {
        var getseletedValue = $(".setTerm").val();
        if (getseletedValue == "") {
            $(".studentClass").attr("hidden", "true");
        } else {
            $(".studentClass").removeAttr("hidden");
        }
    };

    makeEntry = () => {
        var getseletedValue = $(".setPaymentType").val();
        if (getseletedValue == "") {
            $(".amountInput,.amountInputBtn").attr("hidden", "true");
        } else {
            $(".amountInput,.amountInputBtn").removeAttr("hidden");
        }
    };

    reSet = () => {
        $(".setPaymentType").val("");
        $(".setTerm").val("");
        $(".amountInput,.amountInputBtn").attr("hidden", "true");
        $(".studentClass").attr("hidden", "true");
        $("#amount").val("");
        $("#setStudentName").val("");
        $("#setTerm").val("");
        $("#setPaymentType").val("");
        $("#getClassList").val("");
    };

    // editng class
    $("#setClass").mouseup(function () {
        var getseletedValue = $("#setClass").val();
        if (getseletedValue == "") {
            $("#addClassBtn").removeAttr("disabled");
            $("#removeclass,#editclass").attr("disabled", "disabled");
        } else if (getseletedValue != "") {
            $("#addClassBtn").attr("disabled", "disabled");
            $("#removeclass,#editclass").removeAttr("disabled");
        }
    });

    $("#getClassList").change(function () {
        var classLevel = $("#getClassList").val();
        if (classLevel != "") {
            $.ajax({
                url: "phpfiles/actions.php",
                type: "post",
                data: "action=getClassList&&classLevel=" + classLevel,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (res) {
                    pageLoader("hide");
                    $(".listresult").html(res);

                    // getPaymentType();
                    //console.log(res)
                },
                error: function (err) {
                    pageLoader("hide");
                },
            });
        } else {
            $(".listresult").html("");
        }
    });

    getPaymentType = () => {
        var classLevel = $("#getClassList").val();
        if (classLevel != "") {
            $.ajax({
                url: "phpfiles/actions.php",
                type: "post",
                data: "action=getPaymentType&&classLevel=" + classLevel,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (res) {
                    pageLoader("hide");
                    $(".paymentTyperesult").html(res);
                    //console.log(res)
                },
                error: function (err) {
                    pageLoader("hide");
                },
            });
        }
    };

    savePayment = () => {
        var amount = $("#amount").val();
        var studentName = $("#setStudentName").val();
        var setTerm = $("#setTerm").val();
        var setYear = $("#setYear").val();
        var setPaymentType = $("#setPaymentType").val();
        var getClass = $("#getClassList").val();

        if (setYear == "") {
            toastr.warning("Please seclect academic year");
        } else if (amount != "" && setTerm != "") {
            $.ajax({
                type: "POST",
                url: "phpfiles/actions.php",
                data:
                    "action=feePayment&studentName=" +
                    studentName +
                    "&studentClass=" +
                    getClass +
                    "&Category=" +
                    setPaymentType +
                    "&amount=" +
                    amount +
                    "&term=" +
                    setTerm +
                    "&year=" +
                    setYear,
                beforeSend: function () {
                    pageLoader("show");
                },
                success: function (response) {
                    if (response.includes("Payment Reciept")) {
                        pageLoader("hide");
                        $(".receipt").html(response);
                        reSet();
                    } else {
                        pageLoader("hide");
                        toastr.warning(response);
                        toastr.error("Payment failed.");
                    }
                },
            });
        }
    };

    printReciept = () => {
        var data = document.getElementById("printReciept").innerHTML;
        var myWindow = window.open("", "printReciept", "height=500,width=1200");
        myWindow.document.write("<html><head><title>Scholar</title>");

        myWindow.document.write(
            " <style>.cardwrap {padding: 20px;height: auto;margin: 20px auto;border: 2px dotted black;overflow: hidden;position: relative;}.container {padding-top: 0;margin-top: -10px;}.crest {position: absolute;top: 20px;left: 40px;width: 70px;height: 70px; border: 1px solid #e1e1e1;}.cardwrap h1 {text-align: center;margin-top: 0; padding-top: 0;}.cardwrap h5 {font-size: 12px;}.cardwrap h4 {text-align: center;margin-top: 0;padding-top: 0;letter-spacing: 5px; }.dotted {border-bottom: 2px dotted #000000;width: 70%;float: left;margin-left: 20px;text-align: center;margin-top: -2px;font-weight: bold;margin-top: -2px;}.lable {width: 15%;float: left;font-weight: bold;text-align: left;}.wrap {padding: 5px;overflow: hidden;}.sign {width: 60%;position: absolute;bottom: 00px;right: 40px}</style>"
        );

        myWindow.document.write("</head><body >");

        myWindow.document.write(data);
        myWindow.document.write("</body></html>");
        myWindow.document.close(); // necessary for IE >= 10

        myWindow.onload = function () {
            // necessary if the div contain images

            myWindow.focus(); // necessary for IE >= 10
            myWindow.print();
            myWindow.close();
        };
    };

    updatePayment = () => {
        var paymenttype = $("#getpaymenttype").val();
        var studentClass = $("#studentClass").val();
        var getterm = $("#getterm").val();
        var getamountpaid = $("#getamountpaid").val();
        var rowId = $("#rowId").val();
        console.log(paymenttype);
        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            data:
                "action=updatePayment&rowId=" +
                rowId +
                "&paymenttype=" +
                paymenttype +
                "&getterm=" +
                getterm +
                "&getamountpaid=" +
                getamountpaid,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (response) {
                pageLoader("hide");
                toastr.success(response);
                setTimeout(refresh("viewpayment.html"), 1000);
            },
            error: function (err) {
                pageLoader("hide");
                toastr.error(err);
            },
        });
    };
});
