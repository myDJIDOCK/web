// 发送数据到指定URL的函数
function send(v) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://djidock.iepose.cn');
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({ value: v });
    xhr.send(data);
}

// 获取数据并更新指定元素内容的函数
function getData(v1, v2) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', v1, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            document.getElementById(v2).innerHTML = data.value;
        }
    };
    xhr.send();
}

// 发送RTMP请求并更新指定元素内容的函数
function send_rtmp() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/send_rtmp', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            document.getElementById('UAV_text').innerHTML = data.value;
        }
    };
    xhr.send();
}

// 处理RTMP相关操作的函数
function rtmp(s) {
    if (s === 'on') {
        send('rtmp_open');
        setTimeout(send_rtmp, 2000);
        document.getElementById("rtmp_button1").style.display = "none";
        document.getElementById("rtmp_button2").style.display = "block";
    } else if (s === 'start') {
        document.getElementById("UAV2").style.display = "none";
        document.getElementById("UAV").style.display = "block";
    } else {
        document.write("<b>晚上好!</b>");
    }
}

// 进入全屏模式的函数
function enterFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Edge
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

// 切换侧边栏显示状态的函数
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar1 = document.getElementById('sidebar_ck');
    const sidebar2 = document.getElementById('sidebar_sj');
    const sidebar3 = document.getElementById('sidebar_tc');
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        toggleBtn.innerHTML = '☰ 展开';
        sidebar1.style.display = 'none';
        sidebar2.style.display = 'none';
        sidebar3.style.display = 'none';
        swapDivs1();
    } else {
        toggleBtn.innerHTML = '☰ 收起';
        sidebar1.style.display = 'block';
        swapDivs2();
    }
}

function openhd() {
    // 在新窗口或标签中打开指定页面
    window.open("https://app.flydji.cn/", "_blank");
}

function openjm() {
    // 在新窗口或标签中打开指定页面
    window.open("https://www.get3d.cn/desktop/dataset", "_blank");
}

// 播放开盖视频的函数
function play_open() {
    var myVideo = document.getElementById("video");
    document.getElementById("src").src = "../static/images/白天开盖.mp4";
    myVideo.load();
    myVideo.play();
}

// 播放关盖视频的函数
function play_close() {
    var myVideo = document.getElementById("video");
    document.getElementById("src").src = "../static/images/白天关盖.mp4";
    myVideo.load();
    myVideo.play();
}

// 处理按键事件的函数
function onKeyPress(event) {
    if (event.key === 'q') {
        enterFullscreen();
    } else if (event.key === 'w') {
        play_open();
    } else if (event.key === 'e') {
        play_close();
    }
}

// 交换元素位置的函数（侧边栏收起时）
function swapDivs1() {
    const monitor3 = document.getElementById('monitor3');
    const video = document.getElementById('video');
    const monitor4 = document.getElementById('monitor4')
    const card2 = document.getElementById('card2');
    const parent1 = monitor3.parentNode;
    const parent2 = card2.parentNode;
    const next1 = monitor3.nextSibling;
    const next2 = card2.nextSibling;

    monitor4.style.marginTop = '6.8%';
    monitor4.style.marginBottom = '6.8%';
    monitor3.style.border = '2px solid white';
    card2.style.border = '0px solid white';
    video.style.marginTop = '0%';

    parent1.insertBefore(card2, next1);
    parent2.insertBefore(monitor3, next2);

    const middlecolumn = document.getElementById('middlecolumn');
    middlecolumn.style.width = '68%';
    middlecolumn.style.aspectRatio = '16/9';
    const leftcolumn = document.getElementById('leftcolumn');
    leftcolumn.style.width = '27.5%';
}

// 交换元素位置的函数（侧边栏展开时）
function swapDivs2() {
    const monitor3 = document.getElementById('monitor3');
    const video = document.getElementById('video');
    const monitor4 = document.getElementById('monitor4');
    const card2 = document.getElementById('card2');
    const parent1 = monitor3.parentNode;
    const parent2 = card2.parentNode;
    const next1 = monitor3.nextSibling;
    const next2 = card2.nextSibling;

    monitor4.style.marginTop = '0%';
    monitor4.style.marginBottom = '0%';
    monitor3.style.border = '0px solid white';
    card2.style.border = '2px solid white';
    video.style.marginTop = '22%';

    parent1.insertBefore(card2, next1);
    parent2.insertBefore(monitor3, next2);

    const middlecolumn = document.getElementById('middlecolumn');
    middlecolumn.style.width = '50%';
    middlecolumn.style.aspectRatio = '1/0.937';
    const leftcolumn = document.getElementById('leftcolumn');
    leftcolumn.style.width = '27.5%';
}

// 监听按键事件
document.addEventListener('keydown', onKeyPress);