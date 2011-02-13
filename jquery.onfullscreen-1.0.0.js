/**
 * Fires a fullscreen event when the browser enters or leaves native fullscreen mode
 * @author Horia Dragomir horia@horia.me
 */

(function($){
    
    $.onfullscreen = function(){return $.onfullscreen.was_fullscreen}
    
    
    $.onfullscreen.is_fullscreen = function(){
        return window.innerHeight == screen.height && window.innerWidth == screen.width;
    };
    
    ( $.browser.mozilla || ( $.browser.msie && ('9' == $.browser.version.toString()[0]) )) && ($.onfullscreen.is_fullscreen = function(){
        var wih = window.innerHeight, sh = screen.height
        return ( wih >= (sh - 5) ) && window.innerWidth == screen.width;
    });
    
        
    $.onfullscreen.was_fullscreen = $.onfullscreen.did_resize = false;
    
    
    $.onfullscreen.prototype.check_resize_interval = setInterval(function(){
        if($.onfullscreen.did_resize){
            $.onfullscreen.did_resize = false;
            var check_against = $.onfullscreen.is_fullscreen();
            if($.onfullscreen.was_fullscreen != check_against)
                $(window).trigger('fullscreen', $.onfullscreen.was_fullscreen = check_against);
        }
    }, 250);
    
    
    $(window).bind('resize', function(){
        $.onfullscreen.did_resize = true;
    }).resize();

})(jQuery);
