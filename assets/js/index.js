$(function() {
    getUserinfo()

    $('#btnLogout').on('click', function() {
        layui.layer.confirm('确认退出登陆?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1、清除localStorage里面的token
            localStorage.removeItem('token');
            // 2、返回到login.html页面
            location.href = '/login.html';
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // Headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败!")
            }
            // 调用renderAvatar渲染登陆头像
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用complete回调函数
        // complete: function(res) {
        //     // 在complete函数中可以使用 responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token');
        //         // 强制跳转到登陆页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 1、获取用户名称
    var name = user.nicename || user.username;
    // 2、设置欢迎文本
    $('.welcome').html("欢迎&nbsp&nbsp" + name);
    // 3、按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1、渲染图片头像
        $('.layui-nav-img').attr('src'.user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2、渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}