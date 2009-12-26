Class('JooseIt.Widget.Navigation', {
    
    use : [ 'nonjoose://Raphael' ],
    
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Navigation',
    
    
    isa : Ext.Container,
    
    
    has : {
        style                   : 'position : relative',
        
        canvas                  : null,
        
        buttons                 : Joose.Object,
        
        dispatches              : {
            home        : '/home',
            about       : '/about',
            downloads   : '/downloads',
            forum       : function () {
                window.location = '/forum'
            },
            contacts    : '/contacts'
        },
        
        activeButton            : null
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons         = this.buttons
            
            var title           = canvas.image(JooseIt.my.pathToStatic('images/logo.png'), 352, 10, 276, 50)
            
            buttons.home        = canvas.image(JooseIt.my.pathToStatic('images/navigation/home.png'), 40, 50, 223, 221).attr({ rotation : 20 })
            buttons.about       = canvas.image(JooseIt.my.pathToStatic('images/navigation/about.png'), 210, 90, 223, 221).attr({ rotation : -18 })
            buttons.download    = canvas.image(JooseIt.my.pathToStatic('images/navigation/download.png'), 380, 110, 223, 221).attr({ rotation : 0 })
            buttons.forum       = canvas.image(JooseIt.my.pathToStatic('images/navigation/forum.png'), 550, 90, 223, 221).attr({ rotation : 21 })
            buttons.contacts    = canvas.image(JooseIt.my.pathToStatic('images/navigation/contacts.png'), 720, 40, 223, 221).attr({ rotation : -20 })
            
            buttons.about.insertBefore(buttons.home)
            
            Joose.O.each(buttons, this.setupButton, this)
            
            
            setTimeout(function () { canvas.safari() })
        }
        
    },
    
    
    methods : {
        
        setupButton : function (button, name) {
            var uncheckedSrc = button.attr('src')
            var checkedSrc = button.attr('src').replace(/\.png$/, '-blue.png')
            
            var me = this
            
            var scaleTime = 500
            var scaleFactor = 1.15
            var backScaleFactor = 1 / scaleFactor
            var scaleEasing = 'elastic'
            
            button.node.onmouseover = function () {
                button.attr('src', checkedSrc)
                
                button.animate({ scale : scaleFactor }, scaleTime, scaleEasing)
                
                Joose.O.each(me.buttons, function (otherButton) {
                    if (otherButton != button) otherButton.animate({ scale : backScaleFactor }, scaleTime, scaleEasing)
                })
            }
            
            button.node.onmouseout = function () {
                button.attr('src', uncheckedSrc)
                
                button.animate({ scale : 1 }, scaleTime, scaleEasing)
                
                Joose.O.each(me.buttons, function (otherButton) {
                    if (otherButton != button) otherButton.animate({ scale : 1 }, scaleTime, scaleEasing)
                })
            }
            
            button.node.onclick = function () {
//                me.buttonsSet.animate({ scale : 1.1 }, 100, 'backIn', function () {
//                    me.buttonsSet.animate({ scale : 0.9 }, 100, 'backIn')
//                })
            }
        },
        
        
        setActivePage : function (pageId) {
            this.activeButton = this.buttons[pageId]
            
            button.attr('src', checkedSrc)
        }
        
    }
    
})