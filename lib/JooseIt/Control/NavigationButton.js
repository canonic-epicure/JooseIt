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
        
        self        : null
    },
    
    
    after : {
        
        initialize : function () {
            this.src            = JooseIt.my.pathToStatic(this.src)
            
            this.checkedSrc     = this.checkedSrc || this.src.replace(/\.png$/, '-blue.png')
            
            this.width          = this.width || 223
            this.height         = this.height || 221
            
            this.self           = this.canvas.image(this.src, this.left, this.top, this.width, this.height).attr({ rotation : this.rotation })
        },
        
        
        scale   : function () {
            
        }
        
        
        
       
    }

})
