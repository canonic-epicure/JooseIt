Class('JooseIt.Home', {
    
    isa : Ext.Container,
    
    does : [ 'Symbie.Widget' ],
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Home')
        }
        
    }
    
})