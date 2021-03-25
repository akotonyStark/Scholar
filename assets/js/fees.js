var fees = [];

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

    // add payment category

    addPaymentType = () => {
        var setClass = $("#setClass").val();
        var feeName = $("#feeName").val();
        var amount = $("#amount").val();

        $.ajax({
            type: "POST",
            url: "phpfiles/actions.php",
            data:
                "action=addPaymentType&feeName=" +
                feeName +
                "&setClass=" +
                setClass +
                "&amount=" +
                amount,
            dataType: "JSON",

            beforeSend: function () {
                pageLoader("show");
            },
            success: function (result) {
                pageLoader("hide");
                var res = result[0].prompt;
                var url = result[0].url;
                if (res.includes("is added to fees setup.")) {
                    toastr.success(res);
                    loadFeesdata();
                    clearInput();
                } else if (res.includes("already")) {
                    toastr.warning(res);
                    toastr.error(
                        "adding " + feeName + " for " + setClass + " failed"
                    );
                }
            },
            error: function (err) {
                pageLoader("hide");
                console.log(err);
            },
        });
    };

    loadFeesdata = () => {
        $.ajax({
            url: "phpfiles/actions.php",
            type: "POST",
            dataType: "JSON",
            data: "action=FeesData",
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (data) {
                pageLoader("hide");
                if (data.length == 1) {
                    fees = [];
                    feesData(fees);
                } else {
                    fees = data;
                    feesData(fees);
                }

                //console.table(fees);
            },
            error: function (err) {
                console.log(err);
                pageLoader("hide");
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

    feesData = (fees) => {
        $("#feeGrid").kendoGrid({
            dataBound: onDataBound,
            dataSource: {
                data: fees,
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
            editable: "popup",

            height: 400,
            columns: [
                { field: "PaymentType", title: "Payment Type", width: "45%" },
                { field: "Class", title: "Class", width: "20%" },
                {
                    field: "Amount",
                    title: "Amount",
                    width: "20%",
                    attributes: { style: "text-align:right" },
                    headerAttributes: { style: "text-align:right" },
                },
                { field: "id", title: "id", width: "17%", hidden: true },
                {
                    field: "Action",
                    title: "Action",
                    width: "15%",
                    headerAttributes: { style: "text-align:right" },
                    template:
                        "<button id='delete' onClick='delete_feeSetup(#= id #)' class='btn .btn btn-danger delete' style='float:right'><i class='fa fa fa-remove'></i></button>" +
                        "<button id='edit'  class='btn .btn btn-success edit' style='float:right'><i class='fa fa fa-edit'></i></button>",
                },
            ],
        });

        // //add event listender to kendo action buttons
        var grid = $("#feeGrid").data("kendoGrid");
        grid.tbody.on("click", "#edit", getSelectedItem);
    };

    delete_feeSetup = (id) => {
        var id = id;

        $.ajax({
            url: "phpfiles/actions.php",
            type: "post",
            data: "action=delete_feeSetup&&id=" + id,
            beforeSend: function () {
                pageLoader("show");
            },
            success: function (res) {
                toastr.success(res);
                loadFeesdata();
                pageLoader("hide");
            },
            error: function (err) {
                pageLoader("hide");
            },
        });
    };

    function getSelectedItem(ev) {
        var grid = $("#feeGrid").data("kendoGrid");
        var row = $(ev.target).closest("tr");
        var dataItem = grid.dataItem(row);
        //console.log('dataItem: ' + dataItem.Class)
        document.getElementById("feeName").value = dataItem.PaymentType;
        document.getElementById("setClass").value = dataItem.Class;
        document.getElementById("amount").value = dataItem.Amount;
        document.getElementById("id").value = dataItem.id;
        $(".addfeesbtnholde").hide();
        $(".updatefeesbtnholde").show();
    }

    cancelUpdate = () => {
        $(".addfeesbtnholde").show();
        $(".updatefeesbtnholde").hide();
        clearInput();
    };

    updatePaymentType = () => {
        var setClass = $("#setClass").val();
        var feeName = $("#feeName").val();
        var amount = $("#amount").val();
        var id = $("#id").val();

        // console.log(id);

        $.ajax({
            type: "POST",
            url: "phpfiles/actions.php",
            data:
                "action=updatePaymentType&feeName=" +
                feeName +
                "&setClass=" +
                setClass +
                "&amount=" +
                amount +
                "&id=" +
                id,
            dataType: "JSON",

            beforeSend: function () {
                pageLoader("show");
            },
            success: function (result) {
                var res = result[0].prompt;
                pageLoader("hide");
                var url = result[0].url;
                if (res.includes("Update Successful")) {
                    toastr.success(res);
                    clearInput();
                    loadFeesdata();
                } else if (res.includes("already")) {
                    toastr.warning(res);
                    toastr.error(
                        "updating " + feeName + " for " + setClass + " failed"
                    );
                }
            },
            error: function (err) {
                console.log(err);
                pageLoader("hide");
            },
        });
    };

    clearInput = () => {
        document.getElementById("feeName").value = "";
        document.getElementById("setClass").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("id").value = "";
    };
});
