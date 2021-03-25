var totalPopulation = [];

(function($) {
    // students gender distribution
    var studentsGender = [];

    studentGender = () => {
        $.ajax({
            url: "phpfiles/analytics.php",
            type: "post",
            data: "action=studentsGender",
            dataType: "JSON",
            beforeSend: function() {

            },
            success: function(res) {
                // var len = res.length;
                // for(i = 0; i<len;i++){

                // }
                var male = res[0].Male;
                var female = res[0].Female;

                studentGenderDistribution(male, female)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
    studentGender()

    // staff gender distribution
    staffGender = () => {
        $.ajax({
            url: "phpfiles/analytics.php",
            type: "post",
            data: "action=staffGender",
            dataType: "JSON",
            beforeSend: function() {

            },
            success: function(res) {
                // var len = res.length;
                // for(i = 0; i<len;i++){

                // }
                var male = res[0].Male;
                var female = res[0].Female;

                staffGenderDistribution(male, female)
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
    staffGender()
    var yearArr = [];
    var getYear = "";
    // students population
    studentsPopulation = () => {
        // var getYear = "";
        var getTotal = "";
        var totalPopulation = [];

        $.ajax({
            url: "phpfiles/analytics.php",
            type: "post",
            data: "action=studentsPopulation",
            dataType: "JSON",
            beforeSend: function() {

            },
            success: function(res) {
                console.log(res)
                for (i = 0; i < res.length; i++) {
                    getYear = res[i].Year;
                    getTotal = res[i].Total;

                    totalStudent = parseInt(getTotal);

                    yearArr.push(getYear)

                    totalPopulation.push(totalStudent)

                    // console.log(yearArr)
                    console.log(totalPopulation)
                }


            },
            error: function(err) {
                console.log(err)
            }
        })
    }

    studentsPopulation()



    "use strict";

    //Team chart
    //students population
    var ctx = document.getElementById("team-chart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yearArr,
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                data: [0, 7, 3],
                label: "Expense",
                backgroundColor: '#e1e1e1',
                borderColor: 'rgba(220,53,69,0.75)',
                borderWidth: 3.5,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(40,167,69,0.75)',
            }, ]
        },
        options: {
            responsive: true,
            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },


            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
            }
        }
    });


    //Sales chart
    var ctx = document.getElementById("sales-chart");
    ctx.height = 150;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"],
            type: 'line',
            defaultFontFamily: 'Montserrat',
            datasets: [{
                label: "Foods",
                data: [0, 30, 10, 120, 50, 63, 10],
                backgroundColor: 'transparent',
                borderColor: 'rgba(220,53,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(220,53,69,0.75)',
            }, {
                label: "Electronics",
                data: [0, 50, 40, 80, 40, 79, 120],
                backgroundColor: 'transparent',
                borderColor: 'rgba(40,167,69,0.75)',
                borderWidth: 3,
                pointStyle: 'circle',
                pointRadius: 5,
                pointBorderColor: 'transparent',
                pointBackgroundColor: 'rgba(40,167,69,0.75)',
            }]
        },
        options: {
            responsive: true,

            tooltips: {
                mode: 'index',
                titleFontSize: 12,
                titleFontColor: '#000',
                bodyFontColor: '#000',
                backgroundColor: '#fff',
                titleFontFamily: 'Montserrat',
                bodyFontFamily: 'Montserrat',
                cornerRadius: 3,
                intersect: false,
            },
            legend: {
                display: false,
                labels: {
                    usePointStyle: true,
                    fontFamily: 'Montserrat',
                },
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
                text: 'Normal Legend'
            }
        }
    });


    //pie chart
    studentGenderDistribution = (male, female) => {

        var ctx = document.getElementById("pieChart");
        ctx.height = 150;
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: [male, female],
                    backgroundColor: [
                        "grey",
                        "gold",

                    ],
                    hoverBackgroundColor: [
                        "rgba(0, 123, 255,0.9)",
                        "rgba(0, 123, 255,0.7)",

                    ]

                }],
                labels: [
                    "Male",
                    "Female",
                ]
            },
            options: {
                responsive: true
            }
        });

    }



    //doughnut chart
    staffGenderDistribution = (male, female) => {
        var ctx = document.getElementById("doughnutChart");
        ctx.height = 150;
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [male, female],
                    backgroundColor: [
                        "grey",
                        "gold",


                    ],
                    hoverBackgroundColor: [
                        "rgba(0, 123, 255,0.7)",
                        "rgba(0, 123, 255,0.9)",


                    ]

                }],
                labels: [
                    "Male",
                    "Female",
                ]
            },
            options: {
                responsive: true
            }
        });

    }



    // single bar chart
    var ctx = document.getElementById("singelBarChart");
    ctx.height = 75;
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Prime Rose", "Lavenda", "Iris", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Prime Rose", "Lavenda", "Iris", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6"],
            datasets: [{
                label: "Classes In School",
                data: [40, 55, 75, 81, 56, 55, 40, 41, 25, 40, 55, 75, 81, 56, 55, 40, 41, 25],
                borderColor: "#333",
                borderWidth: "0",
                backgroundColor: "#cecece"
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });




})(jQuery);