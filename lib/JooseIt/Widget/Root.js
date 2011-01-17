Class('JooseIt.Widget.Root', {
    
    isa : Ext.Viewport,
    
    
    has : {
        slots           : true,
        
        app             : {
            required    : true
        },
        
        title           : 'Joose it!',
        
        activeItem      : 0,
        layout          : 'card',
        
        autoWidth       : true,
        autoHeight      : true
    }
})