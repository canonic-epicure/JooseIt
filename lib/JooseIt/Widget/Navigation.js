Class('JooseIt.Widget.Navigation', {
    
    use : [ 'nonjoose://Raphael', 'JooseIt.Control.NavigationButton' ],
    
    
    //XXX register the same xtype as class name automatically
    xtype : 'JooseIt.Widget.Navigation',
    
    
    isa : Ext.Container,
    
    
    has : {
        style                   : 'position : relative',
        
        canvas                  : null,
        
        buttons                 : Joose.I.Object,
        
        activeButton            : null
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons         = this.buttons
            
            var title           = canvas.image(JooseIt.my.pathToStatic('images/logo.png'), 352, 10, 276, 50)
            
            
            buttons.home        = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/home.png',
                
                dispatchTo  : '/home',
                
                left        : 40,
                top         : 50,
                
                rotation    : 20,
                
                canvas      : canvas,
                owner       : this
            })

            
            buttons.about       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/about.png',
                
                dispatchTo  : '/about',
                
                left        : 210,
                top         : 90,
                
                rotation    : -18,
                
                canvas      : canvas,
                owner       : this
            })            
            
            
            buttons.download    = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/download.png',
                
                dispatchTo  : '/download',
                
                left        : 380,
                top         : 110,
                
                rotation    : 0,
                
                canvas      : canvas,
                owner       : this
            })
            
            
            buttons.forum       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/forum.png',
                
                dispatchTo  : function () {
                    window.location = '/forum'
                },
                
                left        : 550,
                top         : 90,
                
                rotation    : 21,
                
                canvas      : canvas,
                owner       : this
            })
            
            
            buttons.contacts       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/contacts.png',
                
                dispatchTo  : '/contacts',
                
                left        : 720,
                top         : 40,
                
                rotation    : -20,
                
                canvas      : canvas,
                owner       : this
            })
            
            buttons.about.self.insertBefore(buttons.home.self)
            
            if (this.activeButton) {
                var activeButton = this.activeButton = buttons[this.activeButton]
                activeButton.activate()
            }
        }
        
    },
    
    
    methods : {
        
        backscaleButtonsExcept : function (button) {
            Joose.O.each(this.buttons, function (otherButton) {
                if (otherButton != button) otherButton.backscale()
            })
        },
        
        
        restoreAllScales : function () {
            Joose.O.each(this.buttons, function (button) {
                button.restoreScale()
            })
        },
        
        
        setActivePage : function (pageId) {
            if (!this.rendered) {
                this.activeButton = pageId
                
                return
            }
            
            if (this.activeButton) this.activeButton.deactivate()
            
            this.activeButton = this.buttons[pageId]
            
            this.activeButton.activate()
        }
        
    }
    
})