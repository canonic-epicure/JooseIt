Class('JooseIt.Layout.Site', {
    
    isa : Ext.Container,
    
    does : 'Symbie.Widget',
    
    use : [ 'JooseIt.Widget.Header', 'JooseIt.Widget.Footer', 'ExtX.Layout.NBSP', 'ExtX.Layout.CenterHorizontally' ],
    
    
    has : {
        slots                   : true,
        
        autoWidth               : true,
        autoHeight              : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                style : 'position : relative',
                
                items : [
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Header',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Header',
                                slot : 'header',
                                
                                width : 990,
                                
                                height : 360
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Center',
                        
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
                        
                        cls : 'JooseIt-Content-Footer',
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Footer',
                                
                                cls : 'JooseIt-Content'
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
            var header = this.slots.header
            
            header.setActivePage.defer(100, header, [ page.pageId ])
        },
        
        
        touch : function () {
            Ext.getBody().addClass('grayed')
        }
    },
    
    
    after : {
        onRender : function () {
            var wrapper = Ext.get(document.createElement('div'))
            
            wrapper.update('<a href="http://github.com/Joose/Joose"><img style="position: absolute; top: 0; right: 0; border: 0;" src="http://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub" /></a>')
            
            this.el.appendChild(wrapper.child('a'))
        }
    }
    
})

