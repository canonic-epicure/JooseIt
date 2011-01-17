Class('JooseIt.Widget.Home', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'home',
        
        autoHeight              : true,
        
        template                : {
            /*tjfile(content/html/Home.html)tj*/
        }
    }
    
})