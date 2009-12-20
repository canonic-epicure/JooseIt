Class('JooseIt.Layout.Site', {
    
    isa : 'Symbie.Widget.Container',
    
    use : [ 'ExtX.Layout.RowFit', 'ExtX.Layout.ColumnFit', 'ExtX.Layout.NBSP' ],
    
    
    has : {
        slots : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'column',
                
                items : [
                    {
                        xtype : 'nbsp',
                        slot : 'left',
                        
                        columnWidth : 0.5
                    },
                    
                    {
                        xtype : 'container',
                        width : 980,
                        slot : 'center'
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


