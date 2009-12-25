Class('JooseIt.Layout.Site', {
    
    isa : 'Symbie.Widget.Container',
    
    use : [ 'ExtX.Layout.RowFit', 'ExtX.Layout.ColumnFit', 'ExtX.Layout.NBSP', 'JooseIt.Widget.Navigation' ],
    
    
    has : {
        slots : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'columnfit',
                
                items : [
                    {
                        xtype : 'nbsp',
                        slot : 'left',
                        
                        columnWidth : 0.5
                    },
                    
                    {
                        xtype : 'container',
                        slot : 'content',
                        
                        width : 980,
                        
                        layout : 'card',
                        
                        activeItem : 0,
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Navigation'
                            }
                        ]
                    },
                    
                    {
                        xtype : 'nbsp',
                        slot : 'right',
                        
                        columnWidth : 0.5
                    }
                ]
            })
        }
        //eof initComponent
    }
})


