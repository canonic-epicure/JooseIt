Class('JooseIt.Widget.About', {
    
    isa : 'Symbie.Widget.Container',
    
    does : 'JooseIt.Widget.PageReport',
    
    

    has : {
        pageId          : 'about'
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.About')
        }
        
    }
    
})