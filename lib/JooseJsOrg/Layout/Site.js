Class('JooseJsOrg.Layout.Site', {
    
    isa : Ext.Container,
    
    does : [ 'Symbie.Widget' ],
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'column',
                
                items : [
                    {
                        columnWidth : 0.5,
                        slot : 'left'
                    },
                    
                    {
                        width : 980,
                        slot : 'center'
                    },
                    
                    {
                        columnWidth : 0.5,
                        slot : 'right'
                    }
                ]
            })
        }
        //eof initComponent
    }
})