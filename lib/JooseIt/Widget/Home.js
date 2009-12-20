Class('JooseIt.Widget.Home', {
    
    isa : 'Symbie.Widget.Container',
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Home')
        }
        
    }
    
})