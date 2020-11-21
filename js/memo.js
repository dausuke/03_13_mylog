$(function () {
    //画面の切り替え
    $('.tab a').on('click', function () {
        $(this).parent().addClass('active').siblings('.active').removeClass('active');
        const content = $(this).attr('href');
        $(content).addClass('active').siblings('.active').removeClass('active');
        return false;
    });
    //保存画面：保存するボタンクリックイベント
    $('#save').on('click', function () {
        const data = {
            name: $('#name').val(),
            area: $('#area').val(),
            pnumber: $('#pnumber').val(),
            evaluation: $('#evaluation').val(),
            category: $('#category').val(),
            freetext: $('#freetext').val(),
            getday: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
        };
        console.log(data);
        const jsonData = JSON.stringify(data);
        localStorage.setItem(data.name, jsonData);
        console.log(jsonData);
    });
    //表示画面：保存されたデータをすべて表示
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const jsonData = localStorage.getItem(key);
        const data = JSON.parse(jsonData);

        // data.nameをid属性付与して追加するデータをappenditemに格納
        const appenditem = '<div class = "listitem" id = ' + data.name + '><p>保存日</p><input type="text" class= "listgetday" ><p>店名</P><input type="text" class="listkname"><p >エリア</P> <input type="text" class="listkarea"><p >連絡先</p > <input type="tel" class="listpnumber"><p >カテゴリー</P><input type = "text" class="listcategory" ><p >評価</P> <input type="text" class="listevaluation" ><p >メモ</P><textarea class="listfreetext" ></textarea ><span class="clear" >消去</span ></div >'

        //#listに.lsititemを追加
        //localStorageに保存したデータを表示
        $('#list').append(appenditem);
        $('.listkname').eq(i).val(data.name);
        $('.listgetday').eq(i).val(data.getday);
        $('.listkarea').eq(i).val(data.area);
        $('.listcategory').eq(i).val(data.category);
        $('.listpnumber').eq(i).val(data.pnumber);
        $('.listevaluation').eq(i).val(data.evaluation);
        $('.listfreetext').eq(i).val(data.freetext);
    };
    //消去ボタンクリック時の処理
    $('.clear').on('click', function () {
        //クリックされた.clearの兄弟要素から.liatknameのvalue値取得し、変数clearnameに格納
        const clearname = $(this).siblings('.listkname').val();
        console.log(clearname);
        $(this).parents('.listitem').append('<div class= modal ></div >')
        $(this).parents('.listitem').find('.modal').append('<div class = modal-content></div>')
        $(this).parents('.listitem').find('.modal-content').append('<p>消去</p>');
        $('.modal p').addClass("modal-close")
        $('modal').fadeIn();
        // モーダルウィンドウ表示・非表示(消去の確認画面)
        $('.modal-close').text(clearname + 'を消去しますか？')
        return false;
    });
    //.modal-closeクリック時、該当のlocalStorageのデータを消去
    $(document).on('click', '.modal-close', function () {
        //.modalの兄弟要素にあたる.listitemを取得し、その子要素.listknameを再取得して変数removenameに格納
        const removename = $(this).parents('.listitem').find('.listkname').val();
        console.log(removename);
        localStorage.removeItem(removename);
        $(this).parents('.listitem').find('.listkname').val('');
        $(this).parents('.listitem').find('.listgetday').val('');
        $(this).parents('.listitem').find('.listkarea').val('');
        $(this).parents('.listitem').find('.listcategory').val('');
        $(this).parents('.listitem').find('.listpnumber').val('');
        $(this).parents('.listitem').find('.listevaluation').val('')
        $(this).parents('.listitem').find('.listfreetext').val('');
        $('.modal').fadeOut();
        return false;
    });
    //ページトップボタン
    // const pagetop = $('.scroll');
    $('#scroll').hide();      //ボタン非表示
    //300pxスクロールしたらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    //検索画面：検索時保存データ取得表示
    $('#searchbutton').on('click', function () {
        const search = $('#search').val();
        console.log(search);
        const jsonData = localStorage.getItem(search);
        const data = JSON.parse(jsonData);
        $('#kname').val(data.name);
        $('#karea').val(data.area);
        $('#kcategory').val(data.category);
        $('#kpnumber').val(data.pnumber);
        $('#getday').val(data.getday);
        $('.listjump').attr("href", '#' + data.name);
    });
    // 「リストへ」ボタンクリック時の処理
    $('span a').on('click', function () {
        $(this).parent().addClass('active').siblings('.active').removeClass('active');
        const content = $(this).attr('href');
        $(content).parent().addClass('active').siblings('.active').removeClass('active');
        const href = $('.listjump').attr("href");
        location.href = href;
        return false;
    });
    

});

