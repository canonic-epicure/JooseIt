Class('JooseIt.Layout.Site', {
    
    isa : 'Symbie.Widget.Container',
    
    use : [ 'ExtX.Layout.RowFit', 'ExtX.Layout.ColumnFit', 'ExtX.Layout.NBSP', 'JooseIt.Widget.Content' ],
    
    
    has : {
        slots : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                items : [
                    {
                        //generally unneeded with CenterHorizontally layout, can be merged directly to layout
                        xtype : 'JooseIt.Widget.Content',
                        slot : 'content'
                    }
                ]
            })
        }
        //eof initComponent
    }
})


