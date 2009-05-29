ExtClass('JooseJsOrg.Home', {
    
    isa : Ext.Container,
    
    does : [ 'Symbie.Widget' ],
    
    
    id : [ 'yo1', 'yo2' ],
    
    
    after : {
        
        onReady : function () {
            Ext.getBody().update('Hello world')
        }
        
    }
    
})