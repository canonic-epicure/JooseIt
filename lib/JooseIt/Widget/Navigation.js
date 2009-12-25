Class('JooseIt.Widget.Navigation', {
    
    use : 'nonjoose://Raphael',
    
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Navigation',
    
    
    
    isa : 'Symbie.Widget.Container',
    
    
    has : {
        style : 'position : relative',
        
        fullScreen              : true,
        
        canvas                  : null,
        
        buttons                 : Joose.Object
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons = this.buttons
            
            buttons.home        = canvas.image(JooseIt.my.pathToStatic('images/navigation/home.png'), 0, 220, 223, 221).attr({ rotation : 20 })
            buttons.about       = canvas.image(JooseIt.my.pathToStatic('images/navigation/about.png'), 150, 220, 223, 221).attr({ rotation : -18 })
            buttons.download    = canvas.image(JooseIt.my.pathToStatic('images/navigation/download.png'), 300, 220, 223, 221).attr({ rotation : 0 })
            buttons.forum       = canvas.image(JooseIt.my.pathToStatic('images/navigation/forum.png'), 450, 220, 223, 221).attr({ rotation : 31 })
            buttons.contacts    = canvas.image(JooseIt.my.pathToStatic('images/navigation/contacts.png'), 600, 220, 223, 221).attr({ rotation : -25 })
            
            Joose.O.each(buttons, this.addButtonOnMouseOver, this)
            
            
            setTimeout(function () { canvas.safari() })
        }
        
    },
    
    
    methods : {
        
        addButtonOnMouseOver : function (button) {
            var uncheckedSrc = button.attr('src')
            var checkedSrc = button.attr('src').replace(/\.png$/, '-blue.png')
            
            button.node.onmouseover = function () {
                button.attr('src', checkedSrc)
            }
            
            button.node.onmouseout = function () {
                button.attr('src', uncheckedSrc)
            }
            
        },
        
        
        touch : function (contextStep) {
//            var config = contextStep.config
//            
//            if (config.fullScreen)
        }
    }
    
})