Class('JooseIt.Widget.Header', {
    
    use : [ 'nonjoose://Raphael', 'JooseIt.Control.NavigationButton' ],
    
    
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
            
            var title           = canvas.image(JooseIt().pathToStatic('images/logo.png'), 352, 10, 276, 50)
            
            
            buttons.home        = new JooseIt.Control.NavigationButton({
//                src         : 'data:image/png;base64,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',

                src         : 'mhtml:http://catalyst-dev/JavaScript/JooseIt/blib/lib/JooseIt/static/css/buttons.css!home.png',
                activeSrc   : 'mhtml:http://catalyst-dev/JavaScript/JooseIt/blib/lib/JooseIt/static/css/buttons.css!home-color.png',
                
                
                dispatchTo  : '/home',
                
                left        : 45,
                top         : 50,
                
                rotation    : 20,
                
                canvas      : canvas
            })

            
            buttons.about       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/about.png',
                
                dispatchTo  : '/about',
                
                left        : 215,
                top         : 90,
                
                rotation    : -18,
                
                canvas      : canvas
            })            
            
            
            buttons.download    = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/download.png',
                
                dispatchTo  : '/download',
                
                left        : 385,
                top         : 110,
                
                rotation    : 0,
                
                canvas      : canvas
            })
            
            
            buttons.forum       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/forum.png',
                
                dispatchTo  : function () {
                    window.location = '/forum'
                },
                
                left        : 555,
                top         : 90,
                
                rotation    : 21,
                
                canvas      : canvas
            })
            
            
            buttons.resources       = new JooseIt.Control.NavigationButton({
                src         : 'images/navigation/resources.png',
                
                dispatchTo  : '/resources',
                
                left        : 725,
                top         : 40,
                
                rotation    : -20,
                
                canvas      : canvas
            })
            
            buttons.about.self.insertBefore(buttons.home.self)
            
            if (this.activeButton) {
                var activeButton = this.activeButton = buttons[this.activeButton]
                activeButton.activate()
            }
            

            Joose.O.each(this.buttons, function (button) {
                button.on('mouseover', this.backscaleButtonsExcept, this)
                
                button.on('mouseout', this.restoreAllScales, this)
            }, this)
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