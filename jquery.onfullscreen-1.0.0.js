/**
 * Fires a fullscreen event when the browser enters or leaves native fullscreen mode
 * @author Horia Dragomir horia@horia.me
 */

(function($){
    
    $.onfullscreen = function(){return $.onfullscreen.prototype.was_fullscreen}
    
    
    $.onfullscreen.prototype.is_fullscreen = function(){
        return window.innerHeight == screen.height && window.innerWidth == screen.width;
    }
    
    $.browser.mozilla && ($.onfullscreen.prototype.is_fullscreen = function(){
        var wih = window.innerHeight, sh = screen.height
        return (wih == sh || wih + 5 == sh ) && window.innerWidth == screen.width;
    });
    
    
    $.browser.msie && ('9' == $.browser.version.toString()[0]) && ($.onfullscreen.prototype.is_fullscreen = function(){
        var wih = window.innerHeight, sh = screen.height
        return (wih == sh || wih + 1 == sh || wih + 2 == sh) && window.innerWidth == screen.width;
    });
    
    
    $.onfullscreen.prototype.was_fullscreen = $.onfullscreen.prototype.did_resize = false;
    
    
    $.onfullscreen.prototype.check_resize_interval = setInterval(function(){
        if($.onfullscreen.prototype.did_resize){
            $.onfullscreen.prototype.did_resize = false;
            var check_against = $.onfullscreen.prototype.is_fullscreen();
            if($.onfullscreen.prototype.was_fullscreen != check_against)
                $(window).trigger('fullscreen', $.onfullscreen.prototype.was_fullscreen = check_against);
        }
    }, 250);
    
    
    $(window).bind('resize', function(){
        $.onfullscreen.prototype.did_resize = true;
    }).resize();

})(jQuery);
