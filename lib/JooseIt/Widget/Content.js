Class('JooseIt.Widget.Content', {
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Content',
    
    
    
    isa : 'Symbie.Widget.Container',
    
    
    use : [ 'JooseIt.Widget.Navigation' ],
    
    
    has : {
        style                   : 'position : relative',
        
        navigation              : null,
        
        fullScreen              : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                layout : 'card',
                
                activeItem : 0
            })
        }
    },    
    
    
    after : {
        
        onRender : function (ct, position) {
            this.navigation = new JooseIt.Widget.Navigation({
                renderTo : this.el
            })
        }
        
    },
    
    
    methods : {
        
        touch : function (contextStep) {
            var config      = contextStep.config
            var fullScreen  = config.fullScreen
            
            
            if (this.fullScreen != fullScreen) {
                
                
                
                this.fullScreen = fullScreen
            }
        },
        
        
        doLayout : function () {
            this.SUPERARG(arguments)
        }
        
    }
    
})

