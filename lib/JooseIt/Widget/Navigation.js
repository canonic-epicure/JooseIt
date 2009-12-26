Class('JooseIt.Widget.Navigation', {
    
    use : 'nonjoose://Raphael',
    
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Navigation',
    
    
    
    isa : 'Symbie.Widget.Container',
    
    
    has : {
        style                   : 'width : 100%; height : 100%; position : absolute; left : 0px; top : 0px',
        
//        fullScreen              : true,
        
        canvas                  : null,
        
        buttons                 : Joose.Object
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons = this.buttons
            
            buttons.home        = canvas.image(JooseIt.my.pathToStatic('images/navigation/home.png'), 20, 220, 223, 221).attr({ rotation : 20 })
            buttons.about       = canvas.image(JooseIt.my.pathToStatic('images/navigation/about.png'), 190, 200, 223, 221).attr({ rotation : -18 })
            buttons.download    = canvas.image(JooseIt.my.pathToStatic('images/navigation/download.png'), 360, 220, 223, 221).attr({ rotation : 0 })
            buttons.forum       = canvas.image(JooseIt.my.pathToStatic('images/navigation/forum.png'), 540, 200, 223, 221).attr({ rotation : 31 })
            buttons.contacts    = canvas.image(JooseIt.my.pathToStatic('images/navigation/contacts.png'), 700, 250, 223, 221).attr({ rotation : -20 })
            
            buttons.about.insertBefore(buttons.home)
            
            Joose.O.each(buttons, this.addButtonOnMouseOver, this)
            
            
            setTimeout(function () { canvas.safari() })
        }
        
    },
    
    
    methods : {
        
        addButtonOnMouseOver : function (button) {
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
            
//            button.node.onclick = function () {
//                button.animate({ scale : 1.1 }, scaleTime, scaleEasing, function () {
//                    button.animate({ scale : 0.9 }, scaleTime, scaleEasing)
//                })
//            }
        },
        
        
        touch : function (contextStep) {
//            var config = contextStep.config
//            
//            if (config.fullScreen)
        }
    }
    
})