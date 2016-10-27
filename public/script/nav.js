$(function () {
  $(document).on('mouseover', '.t_mask_hide', function () {
    const header = $('#j_header');
    const mask = $('.j_header_mask');
    mask.addClass('c_subnav');
    if (!header.hasClass('header-darker')) {
      header.addClass('header-darker').removeClass('header-brighter');
    }
  })
  .on('mouseout', '.t_mask_hide', function () {
    const header = $('#j_header');
    const mask = $('.j_header_mask');
    const cache_style = header.attr('data-class');
    mask.removeClass('c_subnav');
    header.removeClass('header-darker header-brighter').addClass(cache_style);
  })
});