Class('JooseIt.Widget.Content', {
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Content',
    
    isa : Ext.Container,
    
    
    use : [ 'JooseIt.Widget.Navigation', 'ExtX.Layout.NBSP', 'ExtX.Layout.CenterHorizontally' ],
    
    
    has : {
        slots                   : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                items : [
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Header',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Navigation',
                                slot : 'navigation',
                                
                                cls : 'JooseIt-Content',
                                
                                height : 360
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'container',
                                slot : 'center',
                                
                                cls : 'JooseIt-Content',
                                
                                layout : 'card'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'nbsp',
                                
                                cls : 'JooseIt-Content',
                                
                                height : 100
                            }
                        ]
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

