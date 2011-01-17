Class('JooseIt.Widget.Resources', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'resources',
        
        autoHeight              : true,
        
        template                : {
            /*tjfile(content/html/Resources.htmltj*/
        }
    }
    
})