Class('JooseIt', {
    
    use : [ 'JooseIt.Home' ],
    
    isa : 'Symbie.Application',
    
    
    have : {
        name : 'joose-js.org'
    },
    
    
    after : {
        
        onReady : function () {
//            Ext.getBody().update('Hello world')
        }
        
    }
    
})