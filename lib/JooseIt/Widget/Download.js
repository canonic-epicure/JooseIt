Class('JooseIt.Widget.Download', {
    
    isa : 'ExtX.Shotenjin.Container',
    
    does : [ 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'download',
        
        autoHeight              : true,
        
        template                : {
            /*tjfile(content/html/Download.htmltj*/
        }
    }
    
})