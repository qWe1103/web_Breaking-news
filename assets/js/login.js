$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 点击“去登陆”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 从 layui 中获取 form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify自定义校验规则
    form.verify({
        // 自定义一个pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码的值
            // 还需要拿到密码框中的内容
            // 然后进行一次等于判断
            // 如果判断失败，则return一个提示消息即可
            var pwd = $('#pwd').val()
            if (pwd !== value) {
                return "两次输入的密码不一致!"
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1、阻止默认提交行为
        e.preventDefault();
        // 2、发起ajax的post请求
        var data = { username: $('#name').val(), password: $('#pwd').val() };
        $.post('/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录!');
            // 模拟人的点击行为
            $('#link_login').click();
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交事件
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登陆失败!");
                }
                layer.msg("登陆成功!");
                // 将登陆成功的token字符串存储到localStorage里面去
                localStorage.setItem('token', res.token);
                // 登陆成功后跳转到主页
                location.href = '/index.html';
            }
        })
    })
})