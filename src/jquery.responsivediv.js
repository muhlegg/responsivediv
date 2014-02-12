;(function ( $, window, document, undefined ) {

    // defaults
    var pluginName = "responsiveDiv";
    var defaults = {
        className  : 'rdiv',
        breakpoints: {
            1000: 'huge',
            800 : 'wide',
            600 : 'moderate',
            450 : 'narrow',
            300 : 'tiny'
        },
        delay: 500
    };

    function Plugin(element, options) {
        this.div            = element;
        this.$div           = $(element);
        this.options        = $.extend({}, defaults, options);
        this.lastExecuted  = false;
        this.classes        = [];
        this._defaults      = defaults;
        this._name          = pluginName;
        this._width         = this.$div.width();
        this._origClasses   = element.className;
        this.init();
    }

    Plugin.prototype = {

        init: function () {

            $(window).on('resize', $.proxy(this.onResize, this));

            // run onResize on init as well
            this.onResize();
        },

        onResize: function() {

            // trigger only on width changes
            if(divWidth === this._width) return false;

            // check if delay is ok
            var timestamp = new Date().getTime();
            if((timestamp - this.lastExecuted) < this.options.delay) return false;

            var divWidth = this.$div.width();
            var _cN = this.options.className;
            var classes = [];

            $.each(this.options.breakpoints, function(width, className) {
                if(divWidth < width) classes.push(_cN+'-'+className);
            });
            if(!classes.length) classes.push(_cN+'-max');

            var width100 = Math.floor(divWidth / 100) * 100;
            var width50  = Math.floor(divWidth / 50) * 50;

            classes.push(_cN+'-'+width100);
            if(width100 !== width50) classes.push(_cN+'-'+width50);

            this.classes = classes;

            this.classes.push(this._origClasses);

            // add responsive helper classes to div
            this.$div.removeClass().addClass(classes.join(' '));

            // trigger event to enable custom functionality
            $(this.$div).trigger('responsiveDivResize', [classes, divWidth]);

            this._width = divWidth;
            this.lastExecuted = timestamp;

            return true;
        }
    };

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };

})( jQuery, window, document );
