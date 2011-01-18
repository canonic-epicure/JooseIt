Class('JooseIt.Widget.Resources', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    has : {
        pageId                  : 'resources',
        
        autoHeight              : true,
        
        template                : {
            init    : {
                /*tjfile(content/html/Resources.htmltj*/
            }
        }
    }
})