Class('JooseIt.Widget.Home', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    has : {
        pageId                  : 'home',
        
        autoHeight              : true,
        
        template                : {
            init    : {
                /*tjfile(content/html/Home.html)tj*/
            }
        }
    }
    
})