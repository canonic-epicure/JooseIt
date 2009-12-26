Class('JooseIt.Control.NavigationButton', {
    
    has : {
        
        src         : null,
        checkedSrc  : null,
        
        left        : null,
        top         : null,
        
        width       : null,
        height      : null,
        
        rotation    : 0,
        
        dispatchTo  : null,
        
        canvas      : {
            required    : true
        },
        
        self        : null,
        owner       : null,
        
        isActive    : null,
        
        hasMouse    : false,
        
        
        scaleTime        : 500,
        scaleFactor      : 1.15,
        scaleEasing      : 'elastic'
    },
    
    
    after : {
        
        initialize : function () {
            this.src            = JooseIt.my.pathToStatic(this.src)
            
            this.checkedSrc     = this.checkedSrc || this.src.replace(/\.png$/, '-blue.png')
            
            this.width          = this.width || 223
            this.height         = this.height || 221
            
            var self = this.self = this.canvas.image(this.src, this.left, this.top, this.width, this.height).attr({ rotation : this.rotation })
            
            Ext.fly(self.node).on('mouseover', this.onMouseOver, this)
            Ext.fly(self.node).on('mouseout', this.onMouseOut, this)
            Ext.fly(self.node).on('click', this.onClick, this)
        }
    },
    
    
    methods : {
        
        onClick : function () {
            if (typeof this.dispatchTo == 'string') 
                JooseIt.my.dispatch(this.dispatchTo).now()
            else
                this.dispatchTo.call(this)
        },
        
        
        onMouseOver : function () {
            this.hasMouse = true
            
            this.self.attr('src', this.checkedSrc)
            
            this.scale()
            
            this.owner.backscaleButtonsExcept(this)
        },
        
        
        onMouseOut : function () {
            this.hasMouse = false
            
            if (!this.isActive) this.self.attr('src', this.src)
            
            this.owner.restoreAllScales()
        },
        
        
        scale   : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : scaleFactor || this.scaleFactor }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        backscale : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : scaleFactor || 1 / this.scaleFactor }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        restoreScale : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : 1 }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        activate : function () {
            this.isActive = true
            
            this.self.attr('src', this.checkedSrc)
            
            var me = this
            
            if (!this.hasMouse) this.scale(null, 100, 'backIn', function () {
                me.restoreScale(null, 100, 'backIn')
            })
        },
        
        
        deactivate : function () {
            this.isActive = false
            
            this.self.attr('src', this.src)
        }
       
    }

})
