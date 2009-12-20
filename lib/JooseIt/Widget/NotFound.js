Class('JooseIt.Widget.NotFound', {
    
    xtype           : 'JooseIt.Widget.NotFound',
    
    isa             : 'Symbie.Widget.Container',
    
    use             : [ 'ExtX.Layout.Center' ],
    

    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'center',
                
                items : [
                    {
                        xtype : 'panel',
                        
                        width : 500,
                        height : 330,
                        
                        title : 'Sorry, this page is missed',
                        
                        buttons : [
                            {
                                text : 'Go back',
                                
                                handler : function () {
                                    history.go(-1)
                                }
                            }
                        ],
                        
                        buttonAlign : 'center'
                    }                        
                ]
            })
        }
        //eof initComponent
    }
    
})