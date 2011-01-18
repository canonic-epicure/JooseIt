Class('JooseIt.Widget.About', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    has : {
        pageId                  : 'about',
        
        autoHeight              : true,
        
        template                : {
            init    : {
                /*tjfile(content/html/About.html)tj*/
            }
        }
    }
})

