Class('JooseIt.Widget.Home', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'home',
        
        autoHeight              : true,
        
        template                : {
            /*tjfile(../../../content/html/Home.html)tj*/
        }
    }
    
})