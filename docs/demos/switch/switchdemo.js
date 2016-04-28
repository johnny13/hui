// TODO MAKE THIS A PLUGIN
function DJ_RALPHIO_SPINS(TRACK_NUMBER){
  //SPIN UP SOME BUTTONS AND SICK BEATS
  var TRACK_MINUS = "#"+TRACK_NUMBER+"-minus";
  var TRACK_PLUS = "#"+TRACK_NUMBER+"-plus";

  //MAIN TEXT INPUT
  var TRACK_TEXT = "#"+TRACK_NUMBER+"-text";

  //REACHING THE LIMIT
  var TRACK_ALERT = "#"+TRACK_NUMBER+"-alert";
  var TRACK_INERROR = "#"+TRACK_NUMBER+"-error";

  //SELL YOUR GRANDMAS JEWELRY AND GO CLUBBING
  $(TRACK_MINUS+","+TRACK_PLUS).click(function(e){
    e.preventDefault();
    //data-limit
    if($(TRACK_INERROR).is(":visible") === true){
      $(TRACK_INERROR).hide();
      $(TRACK_TEXT).show();
    }
    if($(TRACK_ALERT).is(":visible") === true){
      $(TRACK_ALERT).hide();
    }

    var fieldName, type, dlimit;

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    dlimit      = $(TRACK_TEXT).attr('data-limit');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());

    console.debug("LIMIT"+dlimit); 
    console.debug("CURRENT"+currentVal);
    console.debug(type); 

    if (!isNaN(currentVal)) {
        if(type == 'minus') {
  
          if(currentVal > input.attr('min')) {
              input.val(currentVal - 1).change();
          }
          if(parseInt(input.val()) == input.attr('data-limit')) {
             // $(this).attr('disabled', true);
          }
  
          //ERROR MESSAGE
          if(currentVal <= dlimit){
            $(TRACK_INERROR).show();
            $(TRACK_TEXT).hide();
            $(TRACK_ALERT).show();
          }
  
        } else if(type == 'plus') {
            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }
        }
    } else {
        input.val(0);
    }
  });

  //DANCING SO HARD YOU BREAK A RIB
  $(TRACK_TEXT).focusin(function(){
   $(this).data('oldValue', $(this).val());
  });
  $(TRACK_TEXT).change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        $("#notify-text-alert").show();
        $("#notify-text-alert").text('Sorry, the minimum value was reached');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        $("#notify-text-alert").show();
        $("#notify-text-alert").text('Sorry, the maximum value was reached');
        $(this).val($(this).data('oldValue'));
    }
  });
  $(TRACK_TEXT).keydown(function (e) {
      // Allow: backspace, delete, tab, escape, enter and .
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
           // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
           // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)) {
               // let it happen, don't do anything
               return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }
  });
}