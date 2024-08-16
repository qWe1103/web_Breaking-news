// 注意：每次调用 $.get() 或 $.post() 或 $.ajax()的时候，会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的ajax请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为有权限的接口，设置headers请求头
    if (options.headers.indexOf(/my/) !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    // 不论成功还是失败，最终都会调用complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登陆页面
            location.href = '/login.html';
        }
    }
})