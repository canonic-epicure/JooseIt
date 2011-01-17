Class('JooseIt.Widget.About', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'about',
        
        autoHeight              : true,
        
        template                : {
            /*tjfile(content/html/About.html)tj*/
        }
    }
})

