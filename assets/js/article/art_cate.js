$(function() {
    var layer = layui.layer;
    var form = layui.form;
    initArticleList();

    // 获取文章分类的列表
    function initArticleList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                console.log(res);
                var htmlString = template('tpl-table', res);
                $('tbody').html(htmlString);
            }
        })
    }

    var indexAdd = null;
    // 为添加类别按钮绑定点击事件
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });

    // 通过代理的形式，为form-add表单绑定提交事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！');
                initArticleList();

                // 根据索引关闭对应的弹窗
                layer.close(indexAdd);
            }
        });
    })

    var indexEdit = null;
    // 通过代理的形式，绑定btn-edit编辑按钮的点击事件
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id');
        // 发起请求获取对应数据
        $.ajax({
            method: "GET",
            url: "/my/article/cates" + id,
            success: function(res) {
                form.val('form-edit', res.data);
            }
        });
    });

    // 通过代理的形式，给 form-edit 绑定submit提交事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('数据修改失败!');
                }
                return layer.msg('数据修改成功!');
                layer.close(indexEdit);
                initArticleList();
            }
        });
    });

    // 通过代理的形式，给 删除按钮 绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        // 提示用户是否删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败！")
                    }
                    return layer.msg("删除分类成功！")
                    layer.close(index);
                    initArticleList();
                }
            })
        });
    })
})