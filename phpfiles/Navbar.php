<header id="header" class="header">

                <div class="header-menu">

                    <div class="col-sm-7">
                        <a id="menuToggle" class="menutoggle pull-left"><i class="fa fa fa-tasks"></i></a>
                        <div class="header-left">
                            <button class="search-trigger"><i class="fa fa-search"></i></button>
                            <div class="form-inline">
                                <form class="search-form">
                                    <input class="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search">
                                    <button class="search-close" type="submit"><i class="fa fa-close"></i></button>
                                </form>
                            </div>

                            <div class="dropdown for-notification">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-bell"></i>
                                <?php 
                                $num1 = 0;$num=0;
                                $sql="SELECT * FROM `announcement` WHERE `Status` = '0'";
                                $res1 = mysqli_query($db,$sql);
                               
                                
                                $num1 = mysqli_num_rows($res1); ?>
                                <span class="count bg-danger"><?php echo $num1;?></span>
                            </button>
                                <div class="dropdown-menu" aria-labelledby="notification">
                                    <p class="red">You have
                                        <?php echo $num1;?> Notification</p>
                                    <?php  foreach($res1 as $rows){
                                        $announcement = $rows['Announcement'];?>
                                    <a class="dropdown-item media" style="cursor:auto;">
                                        <i class="fa fa-check"></i>
                                        <p>
                                            <?php echo $announcement;?>
                                        </p>
                                    </a>
                                    <?php }?>
                                </div>
                            </div>

                            <div class="dropdown for-message">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="message" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                   <i class="ti-email"></i>
                                    <?php  $sql="SELECT mailbox.*,users.UserLevel,users.Image FROM `mailbox`,users 
                                    WHERE users.UserId = mailbox.senderId AND mailbox.receiverId='$userId' AND mailbox.`Status`=0";
                                    $res = mysqli_query($db,$sql);
                                    
                                    
                                    $num = mysqli_num_rows($res); ?>
                                    <span  class="count bg-primary "><?php echo $num;?></span>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="message" style="padding: 0 10px;">
                                    <p class="">You have
                                        <?php echo $num;?> Message</p>
                                    <?php  foreach($res as $rows){
                                        $senderImage =$rows['Image'];
                                       

                                        $title = $rows['Title'];?>
                                    <a class="dropdown-item media">
                                        <img src="<?php echo $senderImage;?>" alt="ss" 
                                            style="width: 30px; height: 30px;border-radius: 50%;">
                                        <p>
                                            <?php echo $title;?>
                                        </p>
                                    </a>
                                    <?php }?>
                                    <a title="Go to inbox" style="text-decoration: underline;color: indianred; font-size: smaller;" href="indexmailbox.html">Go to Inbox</a>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="user-area dropdown float-right">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="user-avatar rounded-circle" src="<?php echo $image; ?>" alt="User Avatar" style="border :1px solid #e1e1e1;">
                            </a>

                            <div class="user-menu dropdown-menu">
                                <a class="nav-link" href="#"><i class="fa fa-user"></i> My Profile</a>

                                <a class="nav-link" href="#"><i class="fa fa-user"></i> Notifications <span class="count"><?php echo $num + $num1; ?></span></a>

                                <!-- <a class="nav-link" href="#"><i class="fa fa-cog"></i> Settings</a> -->

                                <a class="nav-link" href="phpfiles/logout.php"><i class="fa fa-power-off"></i> Logout</a>
                            </div>
                        </div>

                        <div class="language-select dropdown" id="language-select">
                            <a class="dropdown-toggle" href="#" data-toggle="dropdown" id="language" aria-haspopup="true" aria-expanded="true">
                                <i class="flag-icon flag-icon-gh"></i>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="language">
                                <div class="dropdown-item">
                                    <span class="flag-icon flag-icon-fr"></span>
                                </div>
                                <div class="dropdown-item">
                                    <i class="flag-icon flag-icon-es"></i>
                                </div>
                                <div class="dropdown-item">
                                    <i class="flag-icon flag-icon-us"></i>
                                </div>
                                <div class="dropdown-item">
                                    <i class="flag-icon flag-icon-it"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
</header>