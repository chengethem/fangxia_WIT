$(function () {
  $('.j_close').on('click', function () {//base
    WeixinJSBridge.call('closeWindow');
  });


  var searchs = location.search && location.search.split('?')[1].split('&');
  var query = {};
  var temp;
  for (var i in searchs) {
    temp = searchs[i].split('=');
    query[temp[0]] = temp[1];
  }

  var mobile = $('#j_login-mobile');
  var verify_code = $('#j_login-verify');
  var mobile_reg = /^(0|86|17951)?(13[0-9]|15[0-35-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/g;
  var bindcode_reg = /^\d{4}$/;
  var mail_reg = /^[\w-]+(?:\.[\w-]+)*@((?:[\w-]+\.)*\w[\w-]{0,66}\.[a-z]{2,6}(?:\.[a-z]{2})?)$/i;


  function trim(str) {
    return str || ''.replace(/\s/g, '');
  }

  function hint(results) {
    var fish = $(results['el']);
    var hint = $(results['el']).siblings('.j_hint');

    hint.addClass('hint-' + fish['state']).removeClass('hide');
    hint.find('.j_msg').html(results['msg']);
  }

  function review(els) {
    var el;
    var val;
    var results = {
      el: null,
      state: '',
      msg: ''
    };
    for (var i in els) {
      el = $(els[i]);
      el.val(trim(el.val()));
      val = el.val();
      if (val == '') {
        results['el'] = el;
        results['state'] = 'error';
        results['msg'] = '不能为空';
      } else {
        switch (el.attr('data-type')) {
          case 'mobile':
            if (!val.match(mobile_reg)) {//验证手机号格式
              results['el'] = el;
              results['state'] = 'error';
              results['msg'] = '手机号有误';
            } else {
              el.siblings('.j_hint').addClass('hide');
            }
            break;
          case 'bindcode':
            if (!val.match(bindcode_reg)) {
              results['el'] = el;
              results['state'] = 'error';
              results['msg'] = '验证码有误';
            } else {
              el.siblings('.j_hint').addClass('hide');
            }
            break;
          case 'mail':
            if (!val.match(mail_reg)) {
              results['el'] = el;
              results['state'] = 'error';
              results['msg'] = '邮箱格式错误';
            } else {
              results['data'] = val.match(mail_reg);
              el.siblings('.j_hint').addClass('hide');
            }
            break;
          default:
            el.siblings('.j_hint').addClass('hide');
        }
      }
    }

    if (results['state'] && results['el']) {
      var fish = $(results['el']);
      var hint = $(results['el']).siblings('.j_hint');

      hint.addClass('hint-' + fish['state']).removeClass('hide');
      hint.find('.j_msg').html(results['msg']);
      return false;
    } else {
      return results;
    }
  }

  function count(el, second) {
    var me = $(el);
    var word = '剩余' + second + '秒';
    var normal = '获取验证码';
    me.html(word);
    if (second >= 1) {
      me.addClass('counting lock');
      setTimeout(function () {
        count(el, second - 1);
      }, 1000);
    } else {
      me.removeClass('counting lock');
      me.html(normal);
    }
  }

  $('#t_get_code').on('click', function () {
    if (!review([mobile])) {
      return;
    }
    var me = $(this);
    if (me.hasClass('counting')) {
      return;
    }

    var params;
    var url;

    url = prefix + '/weixin/api/send_code';
    params = {
      gz_id: $('#j_gz_id').val(),
      wechat_openid: $('#j_wechat_openid').val(),
      mobile: mobile.val()
    };
    if (query.user_id) {
      params.user_id = query.user_id;
    }
    count(me, 60);
    $.post(url, params, function (data) {
      if (data['error_code']) {
        $('.j_bind_mobile').find('.j_hint').addClass('hint-error').removeClass('hide').find('.j_msg').html(data['message']);
      }
    });
  });

  $('#t_login_submit').on('click', function () {
    if (!review([mobile, verify_code])) {
      return;
    }
    var params;
    var url = prefix + '/weixin/api/bind';
    var redirect = '/weixin/user/tied?';
    var token = $('#j_token').val();
    var hint;

    params = {
      gzid: $('#j_gz_id').val() || '',
      mobile: mobile.val(),
      code: verify_code.val(),
      token: token
    };

    if (query.back_event) {
      params.back_event = query.back_event;
      params.gzid = query.gzid;
    }
    $.post(url, params, function (resp) {
      if (resp['error_code']) {
        $('.j_bind_verify').find('.j_hint').addClass('hint-error').removeClass('hide').find('.j_msg').html(resp['message'] || '验证码有误');
      } else {
        if (query['back_url']) {
          redirect = decodeURIComponent(query['back_url']);
        }
        if (resp.mobile && query.retie) {
          redirect += '&mobile=' + resp.mobile;
          redirect += '&retie=1';
        }
        history.replaceState({}, '', '/weixin/user/tiephone');
        location.href = redirect;
      }
    });
  });

  //mail auth page
  $('#t_send_auth_mail').on('click', function () {
    if ($(this).hasClass('pending'))
      return;
    else {
      $(this).addClass('pending');
    }
    var mail_obj = $('#j_auth_mail');
    var check_mail = review([mail_obj])['data'];
    var mail;
    var mail_suffix;

    if (!check_mail) {
      $(this).removeClass('pending');
      return;
    } else {
      mail = check_mail[0];
      mail_suffix = check_mail[1];
    }
    var url = prefix + '/weixin/api/auth_mail';
    var merchant_id = query['merchant_id'];
    var user_id = query['user_id'];
    var enterprise_id = query['enterprise_id'] || '';
    var gzid = query['gzid'];
    var joined = query['joined'] || false;
    var parmas = {
      user_id: user_id,
      merchant_id: merchant_id,
      mail: mail,
      mail_suffix: mail_suffix,
      enterprise_id: enterprise_id,
      gzid: gzid,
      joined: joined
    };

    $.post(url, parmas, function (data) {
      //console.info(arguments);
      if (data['error_code'] == 1) {
        alert('您输入的邮箱地址不在可享受企业折扣的范围内，请确认您输入的是企业邮箱，或与店员联系。');
      } else if (data['error_code'] == 2) {
        alert('您输入您所在企业的企业邮箱。');
      } else {
        location.href = prefix + '/weixin/enterprise/mail_sended?mail=' + mail;
      }
      $('#t_send_auth_mail').removeClass('pending');
    });

  });
});