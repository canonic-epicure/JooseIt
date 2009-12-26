Class('JooseIt.Widget.Download', {
    
    isa : 'Symbie.Widget.Container',
    
    does : 'JooseIt.Widget.PageReport',
    
    

    has : {
        pageId          : 'download'
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.Download')
        }
        
    }
    
})