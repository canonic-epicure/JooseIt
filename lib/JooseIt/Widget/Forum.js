Class('JooseIt.Widget.Forum', {
    
    isa : 'Symbie.Widget.Container',
    

    has : {
        pageId          : 'forum'
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.Forum')
        }
        
    }
    
})