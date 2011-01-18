Class('JooseIt', {
    
    isa         : 'Symbie.Application',

    trait       : 'JooseX.Class.Singleton',
    
    plugins     : [
        'SymbieX.History',
        'SymbieX.ExtJS.Widget',
        'SymbieX.ExtJS.DomReady',
        'SymbieX.ExtJS.Shotenjin',
        'SymbieX.ExtJS.DispatchMask'
    ],
    
    
    use         : [
        'JooseIt.Widget.Root',
        'JooseIt.Widget.Home',
        'JooseIt.Layout.Site'
    ],
    
    
    has : {
        staticPrefix        : 'lib/JooseIt/static/',
        
        root                : null
    },
    
    
    after : {
        initialize : function () {
            this.on('dispatchException', this.onDispatchException, this)
        }
    },
    
    
    methods : {
        
        pathToStatic : function (file) {
            return this.staticPrefix + file
        },
        
        
        onDispatchException : function (event, exception) {
            
            Ext.Msg.show({
               title    : 'Error:',
               msg      : exception,
               
               buttons  : Ext.Msg.OK,
               icon     : Ext.MessageBox.ERROR
            })
            
            return false
        },
        
        
        createMainLayout : function (context) {
            
            context.stash.root.activate(context, { 
                xtype       : 'JooseIt.Layout.Site',
                
                slot        : 'mainLayout'
            })
        },
        
        
        ACTIVATE : function (c) {
            var root = c.stash.root = this.root
        },
        
        
        FINALIZE : function (c) {
            var root = c.stash.root
            
            root.doLayout()
        },
        
        
        onDomReady : function () {
            this.root = new JooseIt.Widget.Root({
                app   : this
            })
        }
    },
    
    
    routes : {

        
        '/' : function (context) {
            context.call('/home').now()
        },
        
        
        '/home' : {
            
            action : function (context) {
                var root = context.stash.root
                
                this.createMainLayout(context)
                
                root.slots.mainLayout.slots.center.activate(context, {
                    xtype : 'JooseIt.Widget.Home'
                })
                
                this.CONTINUE()
            } 
        },
        
        
        '/about' : {
            use     : 'JooseIt.Widget.About',
            
            action  : function (context) {
                var root = context.stash.root
                
                this.createMainLayout(context)
                
                root.slots.mainLayout.slots.center.activate(context, {
                    xtype : 'JooseIt.Widget.About'
                })
                
                this.CONTINUE()
            } 
        },
        
        
        '/resources' : {
            use     : 'JooseIt.Widget.Resources',
            
            action  : function (context) {
                var root = context.stash.root
                
                this.createMainLayout(context)
                
                root.slots.mainLayout.slots.center.activate(context, {
                    xtype : 'JooseIt.Widget.Resources'
                })
                
                this.CONTINUE()
            } 
        },
        
        
        '/download' : {
            use     : 'JooseIt.Widget.Download',
            
            action  : function (context) {
                var root = context.stash.root
                
                this.createMainLayout(context)
                
                root.slots.mainLayout.slots.center.activate(context, {
                    xtype : 'JooseIt.Widget.Download'
                })
                
                this.CONTINUE()
            } 
        },
        
        
        '/*' : {
            use     : 'JooseIt.Widget.NotFound',
            
            action  : function (context) {
                var root = context.stash.root
                
                root.activate(context, { 
                    xtype       : 'JooseIt.Widget.NotFound'
                })
                
                this.CONTINUE()
            }
        }
    }
})

