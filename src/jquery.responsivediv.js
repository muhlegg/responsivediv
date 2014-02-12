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
        }
    };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.div = element;
        this.$div = $(element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.classes = [];
        this._origClasses = this.div.className;
        this.init();
    }

    Plugin.prototype = {

        init: function () {

            $(window).on('resize', $.proxy(this.onResize, this));

            // run onResize on init as well
            this.onResize();
        },

        onResize: function() {
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
