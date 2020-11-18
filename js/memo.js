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

    // //2.clear クリックイベント
    // $('#clear').on('click', function () {
    //     localStorage.removeItem(name);
    //     $('#name').val(''),
    //         $('#area').val(''),
    //         $('#pnumber').val(''),
    //         $('#evaluation').val(''),
    //         $('#category').val(''),
    //         $('#freetext').val('');
    // });


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
        return false;
    });
    //表示画面：保存されたデータをすべて表示
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const jsonData = localStorage.getItem(key);
        const data = JSON.parse(jsonData);
        console.log(data);
        // data.nameをid属性付与して追加するデータをappenditemに格納
        const appenditem = '<div class = "listitem" id = ' + data.name + '><p>保存日</p><input type="text" class= "listgetday" ><p>店名</P><input type="text" class="listkname"><p>エリア</P> <input type="text" class="listkarea"><p>連絡先</p><input type="tel" class= "listpnumber"><p>カテゴリー</P><input type="text" class= "listcategory" ><p>評価</P> <input type="text" class="listevaluation"><p>メモ</P><textarea class = "listfreetext" ></textarea ></div >'
        
        $('#list').append(appenditem);
        $('.listkname').eq(i).val(data.name);
        $('.listkarea').eq(i).val(data.area);
        $('.listcategory').eq(i).val(data.category);
        $('.listpnumber').eq(i).val(data.pnumber);
        $('.listgetday').eq(i).val(data.getday);
        $('.listevaluation').eq(i).val(data.evaluation);
        $('.listfreetext').eq(i).val(data.freetext);
    };
    //ページトップボタン
    // const pagetop = $('.scroll');
    $('#scroll').hide();      //ボタン非表示
    //100pxスクロールしたらボタン表示
    $(window).scroll(function () {
        if($(this).scrollTop() > 300) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });

});

