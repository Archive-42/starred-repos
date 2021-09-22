(function ($) {
  function anti_spam_pro_init() {
    $(".antispam-group").hide();
    var answer = $(".antispam-group .antispam-control-a").val();
    $(".antispam-group-q .antispam-control-q").val(answer);
    $(".antispam-group-e .antispam-control-e").val("");
    var dynamic_control =
      '<input type="hidden" name="antspmpro-q-' +
      antispampro_vars.input_name_suffix +
      '" class="antispam-control antispam-control-q" value="' +
      antispampro_vars.code +
      '" />';
    $.each($("#comments form"), function (index, commentForm) {
      if ($(commentForm).find(".antispam-control-q").length == 0) {
        $(commentForm).append(dynamic_control);
      }
    });
    $.each($("#respond form"), function (index, commentForm) {
      if ($(commentForm).find(".antispam-control-q").length == 0) {
        $(commentForm).append(dynamic_control);
      }
    });
    $.each($("form#commentform"), function (index, commentForm) {
      if ($(commentForm).find(".antispam-control-q").length == 0) {
        $(commentForm).append(dynamic_control);
      }
    });
  }
  $(document).ready(function () {
    anti_spam_pro_init();
  });
  $(document).ajaxSuccess(function () {
    anti_spam_pro_init();
  });
})(jQuery);
