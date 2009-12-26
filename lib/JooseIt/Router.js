Class('JooseIt.Router', {
    
    isa : 'Symbie.Router',
    
    does : [ 'SymbieX.History.Router', 'SymbieX.Template.Shotenjin.Router' ],
    
    routes : {
        
        mainLayout : {
            via : function (context, root) {
                var layout = root.findOrCreate('JooseIt.Layout.Site')
                
                layout.slotAndMark('content', {
                    fullScreen : false
                })
            }
        },
        
        
        home : {
            mapTo : '/home',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('content').findOrCreate('JooseIt.Widget.Home')
            } 
        },
        
        
        index : {
            mapTo : '/',
            
            via : function (context, root) {
                root.findOrCreate('JooseIt.Layout.Site').slot('content', {
                    fullScreen : true
                })
            }
        },
        
        
        'default' : {
            mapTo : '/*',
            
            via : function (context, root) {
                root.findOrCreate('JooseIt.Widget.NotFound')
            }
        }
    },
    //eof routes
    
    
    after : {
        initialize : function () {
            this.on('dispatchException', this.onDispatchException, this)
        }
    },
    
    
    methods : {
        
        onDispatchException : function (router, exception) {
            
            Ext.Msg.show({
               title    : 'Error:',
               msg      : exception,
               
               buttons  : Ext.Msg.OK,
               icon     : Ext.MessageBox.ERROR
            })
            
            return false
        }
    }
})
