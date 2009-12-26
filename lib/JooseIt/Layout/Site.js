Class('JooseIt.Layout.Site', {
    
    isa : 'Symbie.Widget.Container',
    
    use : [ 'ExtX.Layout.RowFit', 'ExtX.Layout.ColumnFit', 'ExtX.Layout.NBSP', 'JooseIt.Widget.Content' ],
    
    
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
                        xtype : 'JooseIt.Widget.Content',
                        slot : 'content',
                        
                        width : 980
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


