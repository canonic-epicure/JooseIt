ExtClass('JooseJsOrg.Home', {
    
    isa : Ext.Container,
    
    does : [ 'Symbie.Widget' ],
    
    
    id : [ 'yo1', 'yo2' ],
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseJsOrg.Home')
        }
        
    }
    
})