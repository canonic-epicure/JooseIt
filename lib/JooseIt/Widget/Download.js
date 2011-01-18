Class('JooseIt.Widget.Download', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    has : {
        pageId                  : 'download',
        
        autoHeight              : true,
        
        template                : {
            init    : {
                /*tjfile(content/html/Download.htmltj*/
            }
        }
    }
    
})