Class('JooseIt.Router', {
    
    isa : 'Symbie.Router',
    
    does : [ 'SymbieX.History.Router', 'SymbieX.Template.Shotenjin.Router', 'SymbieX.LoadIndicator' ],
    
    routes : {
        
        mainLayout : {
            via : function (context, root) {
                var layout = root.findOrCreate('JooseIt.Layout.Site')
                
                layout.slotAndMark('center')
            }
        },
        
        
        home : {
            mapTo : '/home',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Home')
            } 
        },
        
        
        about : {
            mapTo : '/about',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.About')
            } 
        },
        
        
        resources : {
            mapTo : '/resources',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Resources')
            } 
        },
        
        
        download : {
            mapTo : '/download',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Download')
            } 
        },
        
        
        index : {
            mapTo : '/',
            
            via : function (context, root) {
                root.collectFrom('home')
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
