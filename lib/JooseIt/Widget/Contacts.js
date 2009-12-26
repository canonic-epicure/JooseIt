Class('JooseIt.Widget.Contacts', {
    
    isa : 'Symbie.Widget.Container',
    
    does : 'JooseIt.Widget.PageReport',
    
    

    has : {
        pageId          : 'contacts'
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            this.el.update('JooseIt.Widget.Contacts')
        }
        
    }
    
})