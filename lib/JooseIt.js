Class('JooseIt', {
    
    my : {
    
        isa : 'Symbie.Application',
        
        use : [ 'JooseIt.Widget.Root' ],
        
        
        has : {
            ID                  : 'JooseIt'
            
        },
        
        
        methods : {
            
            seed : function () {
                this.root = new JooseIt.Widget.Root({
                    owner : this
                })
            }
        }
    }
})