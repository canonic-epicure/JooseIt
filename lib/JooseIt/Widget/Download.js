Class('JooseIt.Widget.Downloads', {
    
    isa : 'Symbie.Widget.Container',
    

    has : {
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.Downloads')
        }
        
    }
    
})