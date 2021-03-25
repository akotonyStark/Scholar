<aside id="left-panel" class="left-panel">
            <nav class="navbar navbar-expand-sm navbar-default">

                <div class="navbar-header">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fa fa-bars"></i>
                </button>
                    <!-- <a class="navbar-brand" href="./"><img src="images/logo.png" alt="Logo"></a> -->
                    <a class="navbar-brand " href="home.html"><i class="menu-icon fa fa-graduation-cap"></i></a>
                </div>

                <div id="main-menu" class="main-menu collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a href="home.html"> <i class="menu-icon fa fa-dashboard"></i>Dashboard </a>
                        </li>
                        <?php if($userLevel =="1"){ ?>
                        <h3 class="menu-title">MANAGEMENT</h3>
                        <!-- /.menu-title -->
                        <li class="menu-item-has-children dropdown">
                            <a href="home.html" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-graduation-cap"></i>Student Management</a>
                            <ul class="sub-menu children dropdown-menu">
                                <li><i class="fa fa-puzzle-piece"></i><a href="enrollstudent.html">Enroll Student</a></li>
                                <li><i class="fa fa-book"></i><a href="contactparent.html">Contact Parent</a></li>


                            </ul>
                        </li>
                        <li class="menu-item-has-children dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-group"></i>Staff Management</a>
                            <ul class="sub-menu children dropdown-menu">
                                <li><i class="fa fa-id-badge"></i><a href="employstaff.html">New Staff</a></li>
                                <li><i class="fa fa-table"></i><a href="employstaff.html">Staff History</a></li>
                            </ul>
                        </li>

                        <li class="menu-item-has-children dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-money"></i>Revenue Management</a>
                            <ul class="sub-menu children dropdown-menu">
                                <li><i class="menu-icon fa fa-money"></i><a href="indexrevenue.html">School Fees</a></li>
                                <li><i class="menu-icon fa fa-money"></i><a href="indexrevenue.html">Pay roll</a></li>
                            </ul>
                        </li>
                        <?php }?>

                        <h3 class="menu-title">Academics</h3>
                        <!-- /.menu-title -->

                        <li class="menu-item-has-children dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-file-pdf-o"></i>Student Reports </a>
                            <ul class="sub-menu children dropdown-menu">
                                <?php if($userLevel =="1" || $userLevel =="3"){ ?>
                                <li><i class="menu-icon fa fa-book"></i>
                                    <a href="assessment.html">Enter Assessment</a>
                                </li>
                                <li><i class="menu-icon fa fa-edit"></i>
                                    <a href="editassessment.html">Edit Assessment</a>
                                </li>
                                <?php } ?>
                                <?php if($userLevel =="1" || $userLevel =="3" || $userLevel =="4"){ ?>
                                <li><i class="menu-icon fa fa-file-pdf-o"></i>
                                    <a href=" createreport.html ">View Report</a>
                                </li>
                                <?php } ?>
                                <?php if($userLevel =="2"){ ?>
                                <li><i class="menu-icon fa fa-file-pdf-o"></i>
                                    <a href="viewreport.html">View Report</a>
                                </li>
                                <?php }?>
                            </ul>
                        </li>

                        <li class="menu-item-has-children dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-laptop"></i>Learning Portal</a>
                            <ul class="sub-menu children dropdown-menu">
                                <li><i class="menu-icon fa fa-laptop"></i><a href="learning.html">E-Library</a></li>
                                <!-- <li><i class="menu-icon fa fa-money"></i><a href="indexrevenue.html">Pay roll</a></li> -->
                            </ul>
                        </li>

                        <li class="menu-item-has-children dropdown">
                            <a href="indexhomework.html" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i class="menu-icon fa fa-book"></i>Homework Portal</a>
                            <ul class="sub-menu children dropdown-menu">
                                <!-- <li><i class="menu-icon fa fa-laptop"></i><a href="learning.html">E-Library</a></li> -->
                                <?php if($userLevel =="1" || $userLevel =="3"){ ?>
                                <li><i class="menu-icon fa fa-edit "></i>
                                    <a href="homework.html ">Give Homework</a>
                                </li>
                                <?php }?>
                                <li><i class="menu-icon fa fa-book"></i>
                                    <a href="indexreports.html">View Homeworks</a>
                                </li>
                            </ul>
                        </li>

                        <?php if($userLevel =="1"){ ?>
                        <h3 class="menu-title ">Tools</h3>
                        <!-- /.menu-title -->
                        <li class="menu-item-has-children dropdown ">
                            <a href="setup.html" class="dropdown-toggle " data-toggle="dropdown " aria-haspopup="true " aria-expanded="false "> <i class="menu-icon fa fa-gears "></i>School Setup</a>
                            <ul class="sub-menu children dropdown-menu ">
                                <li><i class="menu-icon fa fa-gear "></i><a href="setup.html ">Setup</a></li>

                            </ul>
                        </li>

                        <li class="menu-item-has-children dropdown ">
                            <a href="charts-chartjs.html" class="dropdown-toggle " data-toggle="dropdown " aria-haspopup="true " aria-expanded="false "> <i class="menu-icon fa fa-line-chart "></i>Analytics</a>
                            <ul class="sub-menu children dropdown-menu ">
                                <li><i class="menu-icon fa fa-sign-in "></i><a href="charts-chartjs.html">View Analytics</a></li>

                            </ul>
                        </li>
                        <?php }?>

                    </ul>
                </div>
                <!-- /.navbar-collapse -->
            </nav>
        </aside>