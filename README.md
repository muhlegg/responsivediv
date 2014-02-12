#Responsive DIV

Javascript helper to enable media-query styling approach for elements unaware of their DOM environment. 

##Why?
Developed to use with CORS where the response content should be able to react based on it's environment, not screen size. If you for example include a widget on a site using CORS, the widget should be styled based on how the target site handles responsive design and breakpoints. 

##How?
```html
<body>

  <div id="widget"></div>
  
  <!-- include jQuery here... -->
  <script src="/assets/lib/jquery.responsivediv.min.js"></script>
  
  <script type="text/javascript">
    $('#widget').responsiveDiv();  
  </script>
  
</body>
```

###Options
The plugin accepts following parameters
* className: Base className to use for the generated classes.
* breakpoints: Object with breakpoints.
* delay: time to wait between resize events in milliseconds
```javascript
// Default options
{ 
    className  : 'rdiv',
    breakpoints: {
        1000: 'huge',
        800 : 'wide',
        600 : 'moderate',
        450 : 'narrow',
        300 : 'tiny'
    },
    delay: 500
}
```

###Events
<strong>responsiveDivResize(e, breakpointClasses, width):</strong> Fired on each element width change.
```javascript
$("#widget")

    // attach custom functionality
    .on('responsiveDivResize', function(e, breakpointClasses, width) {
        console.log('Current classes: '+breakpointClasses.join(', '));
        console.log('Current widget width: '+width);
    })
    
    // init plugin
    .responsiveDiv();
```

