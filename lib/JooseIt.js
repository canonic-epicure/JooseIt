Class('JooseIt', {
    
    trait : 'JooseX.Class.Singleton',
    
    isa : 'Symbie.Application',
    
    use : [ 'JooseIt.Widget.Root' ],
    
    
    has : {
        ID                  : 'JooseIt',
        
        staticPrefix        : 'lib/JooseIt/static/'
    },
    
    
    methods : {
        
        seed : function () {
            this.root = new JooseIt.Widget.Root({
                owner : this
            })
        },
        
        
        pathToStatic : function (file) {
            return this.staticPrefix + file
        }
    }
})

