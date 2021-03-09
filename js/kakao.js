$(function () {

    var winWidth;


    //pahamBtn 누르면 pchammenu 보이기
    $(".gnb>.pchamBtn>a").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(".hamMenu").css("display", "block");
        } else {
            $(".hamMenu").css("display", "none");
        }
    })

    //mhamBtn 누르면 slide 메뉴 보이기
    $(".mhamBtn").click(function () {
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(".slideMenu").css("display", "block");

            $(".slideMenu").stop().animate({
                marginRight: 0 + "%"
            }, 500)
        } else {


            $(".slideMenu").stop().animate({
                marginRight: -100 + "%"
            }, 500)
            $(".slideMenu").css("display", "none");
        }
    })

    //slideMenu 누르면 sub 보이기
    $(".slideMenu>.sub").hide();
    $(".slideMenu>#slideNav>li>a").click(function () {
        //        console.log($(this).index());
        $(this).parent("li").children(".sub").slideToggle("fast");
    })

    $(".slideMenu>#slideNav>.sub>li>a").click(function () {
        $(".slideMenu>.sub>.subMenu").hide();
        $(this).parent("li").children(".subMenu").slideToggle("fast");
    })



    //nav 마우스올라가면 글자색바꾸기
    $("#nav>li>a").on({
        "mouseover": function () {
            $(this).css("color", "#f8dd20");
        },
        "focus": function () {
            $(this).css("color", "#f8dd20");
        },
        "mouseout": function () {
            $(this).css("color", "#333");
        }
    })

    $("#nav>li").on({
        "mouseover": function () {
            $(this).children("ul").css("display", "block")
            $(this).siblings().children("ul").css("display", "none")
        },
        "mouseleave": function () {
            $(this).children("ul").css("display", "none")
        }
    })



    //aboutKakaoRight 배너
    var showGoal = 0;


    var objGoal = $(".goal>li:eq(0)").clone();
    $(".goal").append(objGoal);
    var goalTotal = $(".goal>li").length;


    var goalTimer = setInterval(function () {

        if (showGoal == goalTotal - 1) {
            showGoal = 0;
            $(".goal").css("margin-left", 0);
        }
        showGoal++;
        goalMove();
    }, 3000);

    //mouseover setIntersal 정지 out 재생
    $(".goal").on({
        "mouseover": function () {
            clearInterval(goalTimer);
        },
        "mouseout": function () {
            goalTimer = setInterval(function () {

                if (showGoal == goalTotal - 1) {
                    showGoal = 0;
                    $(".goal").css("margin-left", 0);
                }
                showGoal++;
                goalMove();
            }, 3000);
        }
    })


    function goalMove() {
        $(".goal").stop().animate({
            marginLeft: -showGoal * 100 + "%"
        }, 500)

        $(".goalBtn>li").eq(showGoal).addClass("active").siblings().removeClass("active");
        if (showGoal == 5) {
            $(".goalBtn>li:first").addClass("active").siblings().removeClass("active");
        }
        //        if(showGoal==1) {
        //            $(".goal>li").css("background","#f1525a");
        //        }
    }


    $(".goalBtn>li").click(function (e) {

        e.preventDefault();
        showGoal = $(this).index();
        goalMove();
    })




    //historyLeft

    //버튼 색 바꾸기
    $(".more").on({
        "mouseover": function () {
            $(this).addClass("active").text("+");
            $(this).css("background", "#f8dd20");
        },
        "mouseout": function () {
            $(this).removeClass("remove").text("more");
            $(this).css("background", "white");
        }
    })

    //history 배너 이동
    var showHistory = 0;
    var slideNum = 0;
    var liWidth = $(".historyList>li").width();
    var winWidth = $(window).width();
    var historyTimer;
    var objHistory = $(".historyList>li").clone();
    $(".historyList").append(objHistory);

   $(window).on("resize", function (e) {
        winWidth = $(window).width();
        showHistory = 0;
        $(".historyList").css("margin-left", 0);
        $(".historyList").css("left", 0);
        $(".historySlide>.currentSlide").css("margin-left", 0);
       $(".hamBtn").removeClass("active");
       $(".slideMenu").css("display","none");
       $(".pchamBtn").removeClass("active");
       $(".hamMenu").css("display","none");

        if (winWidth > 767) {
            clearTimeout(timer);
            tt();
        } else {
            clearTimeout(timer);
            slide();
        }
    })


    function historyMove() {
        $(".historyList").stop().animate({
            marginLeft: -showHistory * liWidth + "px"
        }, 1000)

        if (showHistory == 6) {
            $(".historySlide>.currentSlide").css("margin-left", 0);
        } else {
            $(".historySlide>.currentSlide").stop().animate({
                "margin-left": showHistory * 16.6666666 + "%"
            }, 1000)
        }
    }

    function slide() {
        $(".historyList").stop().animate({
            "left": "-1440px"
        }, 30000, "linear",function () {
            $(".historyList").css("left", 0);
            slide();
        });
    }


    function tt() {

        if (showHistory == 6) {
            showHistory = 0;
            $(".historyList").css("margin-left", 0);
        }

        showHistory++;
        historyMove();
        historyTimer = setTimeout(tt, 3000);
    }


    if (winWidth > 767) {
        tt();
    } else {
        slide();
        clearTimeout(historyTimer);
    }





    //historyList 화살표 조절
    $(".historyBtnright>a").click(function (e) {
        e.preventDefault();

        if (showHistory == 6) {
            showHistory = 0;
            $(".historyList").css("margin-left", 0 + "px");
            $(".historySlide>.currentSlide").css("margin-left", 0);
        }
        showHistory++;
        historyMove();
    })

    $(".historyBtnleft>a").click(function (e) {
        e.preventDefault();

        if (showHistory == 0) {
            showHistory = 6;
            $(".historyList").css("margin-left", -liWidth * showHistory + "px");
            $(".historySlide>.currentSlide").css("margin-left", "84.44%");
        }
        showHistory--;
        historyMove();
    })



    //mouseover setInterval 정지 out 재생
    $(".historyLeft").on({
        "mouseover": function () {
            clearInterval(historyTimer);
        },

        "mouseout": function () {
            historyTimer = setInterval(function () {


                if (showHistory == 6) {
                    showHistory = 0;
                    $(".historyList").css("margin-left", -liWidth + "px");
                }
                showHistory++;
                historyMove();
            }, 3000)
        }
    })






    //imformation fade
    var infoIndex = 0;

    $(".informationBtn>li").click(function (e) {
        e.preventDefault();
        infoIndex = $(this).index();
        $(".informationImg>li").eq(infoIndex).fadeIn(500).siblings().fadeOut(500);
        $(".informationImg>li").eq(infoIndex).addClass("active").siblings().removeClass("active");
    })


    //news slide
    var newsIndex = 0;
    $(".newsBtn>li").click(function (e) {
        e.preventDefault();
        newsIndex = $(this).index();
        $(".newsList").stop().animate({
            marginLeft: -100 * newsIndex + "%"
        }, 1000)


        $(".newsBtn>li").eq(newsIndex).addClass("active").siblings().removeClass("active");

    })



    //footer 메뉴,  질문 부분 4
    $(".footerTop>li>a").click(function (e) {
        e.preventDefault();

        if ($(this).next("ul").hasClass("active")) {
            $(this).next("ul").css("display", "none").removeClass("active");
        } else {
            $(this).next("ul").css("display", "block").addClass("active");

        }



    })


    //관련 사이트 열기

    $(".Sites").click(function () {
        $(".sitesList").slideToggle(500);
    })




})
