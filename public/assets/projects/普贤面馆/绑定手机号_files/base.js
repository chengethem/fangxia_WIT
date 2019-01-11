var searches = location.search && location.search.split('?')[1].split('&');
var query = {};
var temp;
for (var i in searches) {
  temp = searches[i].split('=');
  query[temp[0]] = temp[1];
}

function render(tpl, data) {
  var i, pattern;
  for (i in data) {
    pattern = new RegExp('\\{' + i + '\\}', 'ig');
    tpl = tpl.replace(pattern, data[i]);
  }
  return tpl;
}

function reload() {
  var href = location.href;
  var new_href = '';
  var now = Date.now();
  var query_str = '';
  var searches = location.search && location.search.split('?')[1].split('&');
  var query = {};
  var temp;
  //return console.info('**', searches);
  for (var i in searches) {
    temp = searches[i].split('=');
    if (!temp[1]) {
      continue;
    }
    query[temp[0]] = temp[1];
  }
  if (href.indexOf('?') === -1) {
    new_href += '?refresh=' + now;
  } else {
    query.refresh = now;
    for (var i in query) {
      if ({}.hasOwnProperty.call(query, i)) {
        query_str += '&' + i + '=' + query[i];
      }
    }
    new_href = href.split('?')[0] + '?' + query_str;
  }
  location.href = new_href;
}

function addLoadMore(el, params, url) {
  var me = $(el);
  var target = me.hasClass('ios-scroll') ? me : me.closest('.ios-scroll');
  var load_btn = me.find('.t_loadmore');

  target.on('scroll', function (e) {
    if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
      loadmore(url, params, load_btn);
    }
  });
}

function loadmore(url, params, el) {
  var that = $(el);
  if (that.hasClass('pending')) {
    return
  } else {
    that.addClass('pending');
  }
  var page_no = +(that.attr('data-page') || 2);
  var page_size = +(that.attr('data-size') || 0);
  var pages = that.attr('data-pages') || 0;

  if (pages < page_no) {
    $('.j_end_pad').addClass('hide');
    that.addClass('hide');
    return
  }
  that.removeClass('hide');
  params.page_no = page_no;
  params.page_size = page_size;
  $.post(url, params, function (data) {
    if (typeof data == 'string') {
      that.removeClass('pending').addClass('hide');
      page_no = page_no + 1;
      that.before(data).attr('data-page', page_no);
    }
  });
}


$(function () {
  FastClick.attach(document.body);

  //prevent ios safari default drag
  var selScrollable = '.ios-scroll';
  // Uses document because document will be topmost level in bubbling
  if (!$('body').find('.no_scroll_wraper')[0]) {
    $(document).on('touchmove', function (e) {
      e.preventDefault();
    });
    // Uses body because jQuery on events are called off of the element they are
    // added to, so bubbling would not work if we used document instead.
    $('body').on('touchstart', selScrollable, function (e) {
      //if ($(e.target).hasClass('item-container') || $(e.target).parents('.item-container')[0]) {
      //  return
      //}
      //alert($(e.target).attr('class'));//todo
      if ($(e.currentTarget).hasClass('scroll-hack')) {
        return;
      }
      //alert(e.currentTarget.scrollTop);
      if (e.currentTarget.scrollTop <= 0) {
        e.currentTarget.scrollTop = 1;
        //console.info('e.currentTarget.scrollTop', e.currentTarget.scrollTop);
        //alert(e.currentTarget.scrollTop);
      } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
        e.currentTarget.scrollTop -= 1;
      }
    })
      // Stops preventDefault from being called on document if it sees a scrollable div
    .on('touchmove', selScrollable, function (e) {
      if ($(this)[0].scrollHeight > $(this).height()) {
        e.stopPropagation();
      }
      //e.stopPropagation();
    });
  }

  $('.j_close').on('click', function () {
    WeixinJSBridge.call('closeWindow');
  });
});


//reset font-size on android
//(function () {
//  if (typeof(WeixinJSBridge) == "undefined") {
//    document.addEventListener("WeixinJSBridgeReady", function (e) {
//      setTimeout(function () {
//        WeixinJSBridge.invoke('setFontSizeCallback', {"fontSize": 0}, function (res) {
//          alert(JSON.stringify(res));
//        });
//      }, 0);
//    });
//  } else {
//    setTimeout(function () {
//      WeixinJSBridge.invoke('setFontSizeCallback', {"fontSize": 0}, function (res) {
//        alert(JSON.stringify(res));
//      });
//    }, 0);
//  }
//})();
$(function () {
  if ($('body').find('.num-keyboard')[0]) {
    var default_pattern = /^-?\d+\.?\d*$/;
    var flag = false;
    $('.num-keyboard .j_keyboard').on('touchstart', function (e) {
      e.preventDefault();
      if (flag) return;
      flag = true;
      tap(e, 750);
    });
    $('.num-keyboard .j_keyboard').on('touchend', function (e) {
      flag = false;
      clearTimeout(handle);
    });
    var handle;

    function tap(e, time) {
      if (flag) {
        keyboardClick(e);
        handle = setTimeout(function () {
          tap(e, time > 10 ? time * 0.4 : time * 0.2)
        }, time)
      }
    }

    function keyboardClick(e) {
      var pattern = $('.num-keyboard .j_pattern').val();
      var reg = pattern ? new RegExp(pattern) : default_pattern;
      var input_value = e.srcElement.attributes.data.value;
      var now_value = $('.num-keyboard .j_input').text();
      var value = '';
      if (input_value == 'del') {
        if (now_value.length == 1) {
          value = '0';
        }
        else {
          value = now_value.substring(0, now_value.length - 1);
        }
        $('.num-keyboard .j_input').text(value)
      } else {
        if (now_value.length > 30) return;
        if (now_value == '0' && input_value == '.') {
          value = '0.';
        }
        else if (now_value == '0') {
          value = input_value;
        }
        else {
          value = now_value + input_value;
        }
        if (reg.test(value)) {
          $('.num-keyboard .j_input').text(value)
        }
      }
    }
  }
});
/**
 * 绑定数字键盘
 * @param listen_selector 监听选择器 如 '#sub','.aa'
 * @param target_selector 值目标选择器
 * @param label 标签
 * @param reg 校验表达式
 * @param cb 输入完成回调事件, 如果有callback,不自动赋值
 */
function bindNumKeyboard(listen_selector, target_selector, label, reg, cb) {
  $(listen_selector).click(function (e) {
    $(this).blur();
    e.preventDefault();
    $('.j_label').text(label);
    var value = $(target_selector).val() || $(target_selector).text();
    value = value == '00' ? 0 : value;
    $('.num-keyboard .j_input').text(+value || 0);
    if (reg instanceof RegExp) {
      reg = reg.source.replace(/\\/g, '\\\\');
    }
    $('.num-keyboard .j_pattern').val(reg);
    $('.num-keyboard').removeClass('hide');
    window.setTimeout(function () {
      $('.num-keyboard .normal').addClass('keyboard-show');
    }, 10);
    $('.num-keyboard .j_ok').off('click');

    $('.num-keyboard .j_ok').click(function () {
      var value = +$('.num-keyboard .j_input').text();
      if (!cb) {
        $('.j_site_number_set').val() == undefined ? $(target_selector).text(value) : $(target_selector).val(value);
      }
      $(target_selector).blur();
      $('.num-keyboard .normal').removeClass('keyboard-show');
      window.setTimeout(function () {
        $('.num-keyboard').addClass('hide');
      }, 500);
      $('.num-keyboard .j_pattern').val('');
      $('.num-keyboard .j_input').text('0');
      if (cb) {
        cb(value);
      }
    })
  })
}
