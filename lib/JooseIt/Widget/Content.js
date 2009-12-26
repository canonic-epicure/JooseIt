Class('JooseIt.Widget.Content', {
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Content',
    
    isa : Ext.Container,
    
    
    use : [ 'JooseIt.Widget.Navigation', 'ExtX.Layout.NBSP' ],
    
    
    has : {
        slots                   : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                items : [
                    {
                        xtype : 'JooseIt.Widget.Navigation',
                        slot : 'navigation',
                        
                        height : 360
                    },
                    
                    {
                        xtype : 'container',
                        slot : 'center'
                    },
                    
                    {
                        xtype : 'nbsp',
                        height : 100
                    }
                ]
            })
            
            this.on('currentPage', this.onCurrentPageReport, this)
        }
    },
    
    
    methods : {
        
        onCurrentPageReport : function (page) {
            this.slots.navigation.setActivePage(page.pageId)
        }
        
    }
    
})

