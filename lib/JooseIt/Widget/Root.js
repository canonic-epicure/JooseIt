Class('JooseIt.Widget.Root', {
    
    isa : Ext.Viewport,
    
    does : 'Symbie.Widget.Root',
    
    use : [ 'JooseIt.Router' ],
    
    
    has : {
        routerClass : Joose.FutureClass('JooseIt.Router'),
        
        title : 'Joose it!',
        
        layout : 'card'
    },
    
    
    methods : {
    
        fireResize : function (w, h) {
            this.doLayout()
        }
    }
    
    
})