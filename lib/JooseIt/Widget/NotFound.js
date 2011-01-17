Class('JooseIt.Widget.NotFound', {
    
    isa             : 'ExtX.Shotenjin.Container',
    
    
    use : [ 
        {
            type        : 'javascript',
            token       : 'JooseIt/static/deps/raphael-min-1.5.0.js',
            presence    : function () { return Raphael }
        }, 
        'JooseIt.Control.NavigationButton' 
    ],
    

    have : {
        template                : {
            /*tj
                <div>Sorry, this page is missing</div>
                <div class="jit_nav_button"></div>
            tj*/
        },
        
        canvas                  : null,
        
        ignoreMouse             : false
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                cls : 'JooseIt-Widget-NotFound',
                
                width : 500,
                height : 350,
                
                style : 'position : relative'
            })
        }
        //eof initComponent
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.child('.jit_nav_button').dom, 500, 350)
            
            var urls            = JOOSE_IT_BUTTONS
            var me              = this
            
            var button = new JooseIt.Control.NavigationButton({
                src         : urls['go-back'].src,
                activeSrc   : urls['go-back'].activeSrc,
                
                dispatchTo  : function () {
                    me.ignoreMouse = true
                    
                    button.resetScale()
                    button.deactivate()
                    
                    ;(function () {
                        history.go(-1)
                    }).defer(1)
                },
                
                left        : 140,
                top         : 10,
                
                rotation    : 5,
                
                canvas      : canvas
            })
            
            button.on('mouseover', this.onButtonMouseOver, this)
            button.on('mouseout', this.onButtonMouseOut, this)
        }
    },
    
    
    methods : {
        onButtonMouseOver : function (button) {
            if (this.ignoreMouse) return
            
            button.scale()
            button.activate()
        },
        
        
        onButtonMouseOut : function (button) {
            if (this.ignoreMouse) {
                this.ignoreMouse = false
                
//                button.resetScale()
//                button.deactivate()
                
                return
            }
            
            button.restoreScale()
            button.deactivate()
        }
    }
    
    
})