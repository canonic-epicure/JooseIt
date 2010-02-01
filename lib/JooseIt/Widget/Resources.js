Class('JooseIt.Widget.Resources', {
    
    isa : 'Symbie.Widget.Container',
    
    does : 'JooseIt.Widget.PageReport',
    
    

    has : {
        pageId          : 'contacts'
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.Resources')
        }
        
    }
    
})