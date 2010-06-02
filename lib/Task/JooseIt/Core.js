Class('JooseIt.Control.NavigationButton', {
    meta : Joose.Meta.Class,
    
    isa : Ext.util.Observable,
    
    
    has : {
        
        src         : null,
        activeSrc   : null,
        
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
        
        hasMouse    : false,
        
        
        
        scaleTime        : 500,
        scaleFactor      : 1.15,
        scaleEasing      : 'elastic'
    },
    
    
    after : {
        
        initialize : function () {
            this.addEvents('mouseover', 'mouseout')
            
            if (!this.isDataUri(this.src)) this.src = JooseIt().pathToStatic(this.src)
            
            this.activeSrc      = this.activeSrc || this.src.replace(/\.png$/, '-color.png')
            
            this.width          = this.width || 223
            this.height         = this.height || 221
            
            var self = this.self = this.canvas.image(this.src, this.left, this.top, this.width, this.height).attr({ rotation : this.rotation })
            
            Ext.fly(self.node).on('mouseover', this.onMouseOver, this)
            Ext.fly(self.node).on('mouseout', this.onMouseOut, this)
            Ext.fly(self.node).on('click', this.onClick, this)
        }
    },
    
    
    methods : {
        
        isDataUri : function (src) {
            return /^data:image/.test(src) || /^mhtml:http/.test(src)
        },
        
        
        onClick : function () {
            if (typeof this.dispatchTo == 'string') 
                JooseIt().dispatch(this.dispatchTo).now()
            else
                this.dispatchTo.call(this)
        },
        
        
        onMouseOver : function () {
            this.hasMouse = true
            
            this.fireEvent('mouseover', this)
        },
        
        
        onMouseOut : function () {
            this.hasMouse = false
            
            this.fireEvent('mouseout', this)
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
        
        
        resetScale : function () {
            this.self.scale(1, 1)
        },
        
        
        activate : function () {
            this.self.attr('src', this.activeSrc)
            
            var me = this
            
            if (!this.hasMouse) this.scale(null, 100, 'backIn', function () {
                me.restoreScale(null, 100, 'backIn')
            })
        },
        
        
        deactivate : function () {
            this.self.attr('src', this.src)
        }
       
    }

})
;
Role('JooseIt.Widget.PageReport', {
    
    has : {
        pageId      : null
    },
    

    before : {
        initComponent : function () {
            this.addEvents('currentPage')
            this.enableBubble('currentPage')
        }
    },
    
    
    after : {
        
        touch : function () {
            this.fireEvent('currentPage', this)
        }
    }
    
});
Class('JooseIt.Widget.About', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'about',
        
        autoHeight              : true,
        
        templateSources         : {
            /*tj:../../../content/html/About.html
<h1 id="versions">VERSIONS</h1>

<p>Joose is currently presented with 2 major releases: Joose 2 and Joose 3</p>

<h2 id="joose2">Joose 2</h2>

<p>Joose 2 is a stable, feature-rich and proven-to-work system. It is in production on several multi M$ sites (in both visitors and revenue), like:</p>

<p><a href="http://www.tuifly.com/en/">http://www.tuifly.com/en/</a></p>

<p><a href="http://www.mirapodo.de/">http://www.mirapodo.de/</a></p>

<h2 id="joose3">Joose 3</h2>

<p>Joose 3 is currently under very active development. It is already stable with about 600 unit tests, though it may miss some features, 
presented in Joose 2 (like type system, serialization and Google Gears support). </p>

<p>On top of the Joose 2 feature set Joose 3 offers a more to-the-spec implementation of roles based on 
<a href="http://www.iam.unibe.ch/~scg/Research/Traits/">original traits spec</a>, improved namespaces, better meta-roles support and <a href="http://openjsan.org/go/?l=Joose.Manual.Mutability">mutability</a>.</p>

<p>Joose 3 is being distributed via the OpenJSAN platform, which establishes a distribution standard and provides installation tools.</p>
tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '<h1 id="versions">VERSIONS</h1>\n\n<p>Joose is currently presented with 2 major releases: Joose 2 and Joose 3</p>\n\n<h2 id="joose2">Joose 2</h2>\n\n<p>Joose 2 is a stable, feature-rich and proven-to-work system. It is in production on several multi M$ sites (in both visitors and revenue), like:</p>\n\n<p><a href="http://www.tuifly.com/en/">http://www.tuifly.com/en/</a></p>\n\n<p><a href="http://www.mirapodo.de/">http://www.mirapodo.de/</a></p>\n\n<h2 id="joose3">Joose 3</h2>\n\n<p>Joose 3 is currently under very active development. It is already stable with about 600 unit tests, though it may miss some features, \npresented in Joose 2 (like type system, serialization and Google Gears support). </p>\n\n<p>On top of the Joose 2 feature set Joose 3 offers a more to-the-spec implementation of roles based on \n<a href="http://www.iam.unibe.ch/~scg/Research/Traits/">original traits spec</a>, improved namespaces, better meta-roles support and <a href="http://openjsan.org/go/?l=Joose.Manual.Mutability">mutability</a>.</p>\n\n<p>Joose 3 is being distributed via the OpenJSAN platform, which establishes a distribution standard and provides installation tools.</p>\n'
        }
    }
    
});
Class('JooseIt.Widget.Download', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'download',
        
        autoHeight              : true,
        
        templateSources         : {
            /*tj:../../../content/html/Download.html
<h1 id="download">Download</h1>

<h2 id="joose2">Joose 2</h2>

<p>The latest release in 2.x series is available here: </p>

<p><a href="http://code.google.com/p/joose-js/downloads/list">http://code.google.com/p/joose-js/downloads/list</a></p>

<h2 id="joose3">Joose 3</h2>

<p>The recommended installation procedure for Joose 3 is described here: <a href="http://openjsan.org/go/?l=Joose.Manual.Installation">http://openjsan.org/go/?l=Joose.Manual.Installation</a></p>

<p>Alternatively, the complete list of releases is available for download here: <a href="http://openjsan.org/go?d=Joose">http://openjsan.org/go?d=Joose</a></p>

<h1 id="gitrepository">Git Repository</h1>

<p>To obtain the latest sources, grab a copy of the Joose <a href="http://github.com/Joose/Joose">repository at github</a></p>
tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '<h1 id="download">Download</h1>\n\n<h2 id="joose2">Joose 2</h2>\n\n<p>The latest release in 2.x series is available here: </p>\n\n<p><a href="http://code.google.com/p/joose-js/downloads/list">http://code.google.com/p/joose-js/downloads/list</a></p>\n\n<h2 id="joose3">Joose 3</h2>\n\n<p>The recommended installation procedure for Joose 3 is described here: <a href="http://openjsan.org/go/?l=Joose.Manual.Installation">http://openjsan.org/go/?l=Joose.Manual.Installation</a></p>\n\n<p>Alternatively, the complete list of releases is available for download here: <a href="http://openjsan.org/go?d=Joose">http://openjsan.org/go?d=Joose</a></p>\n\n<h1 id="gitrepository">Git Repository</h1>\n\n<p>To obtain the latest sources, grab a copy of the Joose <a href="http://github.com/Joose/Joose">repository at github</a></p>\n'
        }
    }
    
});
Class('JooseIt.Widget.Footer', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    
    have : {
        templateSources         : {
            /*tj:../../../templates/footer.tj.html
&copy;2009-2010 <a href="mailto:nickolay8@gmail.com">Nickolay Platonov</a>
<span style="float: right">Powered by <a href="http://symbie.org">Symbie</a></span>tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '&copy;2009-2010 <a href="mailto:nickolay8@gmail.com">Nickolay Platonov</a>\n<span style="float: right">Powered by <a href="http://symbie.org">Symbie</a></span>'
        }
    }
    
});
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
            var urls            = JOOSE_IT_BUTTONS
            
            var title           = canvas.image(urls.logo.src, 352, 10, 276, 50)
            
            
            buttons.home        = new JooseIt.Control.NavigationButton({
                src         : urls.home.src,
                activeSrc   : urls.home.activeSrc,
                
                dispatchTo  : '/home',
                
                left        : 45,
                top         : 50,
                
                rotation    : 20,
                
                canvas      : canvas
            })

            
            buttons.about       = new JooseIt.Control.NavigationButton({
                src         : urls.about.src,
                activeSrc   : urls.about.activeSrc,
                
                dispatchTo  : '/about',
                
                left        : 215,
                top         : 90,
                
                rotation    : -18,
                
                canvas      : canvas
            })            
            
            
            buttons.download    = new JooseIt.Control.NavigationButton({
                src         : urls.download.src,
                activeSrc   : urls.download.activeSrc,
                
                dispatchTo  : '/download',
                
                left        : 385,
                top         : 110,
                
                rotation    : 0,
                
                canvas      : canvas
            })
            
            
            buttons.forum       = new JooseIt.Control.NavigationButton({
                src         : urls.forum.src,
                activeSrc   : urls.forum.activeSrc,
                
                dispatchTo  : function () {
                    window.location = '/forum'
                },
                
                left        : 555,
                top         : 90,
                
                rotation    : 21,
                
                canvas      : canvas
            })
            
            
            buttons.resources       = new JooseIt.Control.NavigationButton({
                src         : urls.resources.src,
                activeSrc   : urls.resources.activeSrc,
                
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
                button.on('mouseover', button.scale.createDelegate(button, []))
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
    
});
Class('JooseIt.Widget.Home', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'home',
        
        autoHeight              : true,
        
        templateSources         : {
            /*tj:../../../content/html/Home.html
<h1 id="whatisjoose">WHAT IS Joose?</h1>

<p>Joose is a complete modern object system for JavaScript based on concepts from many programming languages such as Ruby, Smalltalk, Perl and, well, JavaScript. 
It provides "keywords" or "syntactic sugar" for class declaration, object construction, inheritance and more. These keywords feel like they become a part of the language and you don't have to care about the implementation details of all these concepts. </p>

<p>With Joose, you can concentrate on the logical structure of your code, focusing on "what" rather than "how". A class definition with Joose reads like a list of very concise English sentences.</p>

<p>Joose provides complete introspection for all Joose-using classes. This means you can ask classes about their attributes, parents, children, methods, etc., all using a well-defined API.</p>

<p>Joose is based in large part on the <a href="http://search.cpan.org/dist/Moose/lib/Moose.pm">Moose</a> system, which in turn borrows a lot of from Perl 6 object system, as well as drawing on the best ideas from CLOS, Smalltalk, and many other languages.</p>

<h1 id="whatjooseisnot">WHAT Joose is not?</h1>

<p>Joose isn't a new language or sources preprocessor. The code written in Joose, executes like regular JavaScript, and can be run in any modern JavaScript engine.</p>

<h1 id="whyjoose">WHY Joose?</h1>

<p>Joose makes JavaScript OO both simpler and more powerful. It encapsulates JavaScript power tools in high-level declarative APIs which are easy to use. 
Best of all, you don't need to be a wizard to use it. Here's the example of Joose class: </p>

<pre><code>Class('Person', {

    methods : {
        eat : function (food) {
            console.log('yummy')

            return 'yummy'
        }
    }
})
</code></pre>

<p>This is a complete and usable class definition! Another example:</p>

<pre><code>Class('Person.Tidy', {
    isa : Person,

    before : {
        eat : function (food) {
            this.washHands()
        }
    },

    after : {
        eat : function (food) {
            this.brushTeeth()
        }
    },

    methods : {

        washHands : function (food) {
            console.log('washing hands')
        },

        brushTeeth : function (food) {
            console.log('brushing teeth')
        },

        eat : function (food) {
            this.SUPER(food)
        }
    }
})
</code></pre>

<p>Joose makes every attempt to provide as much convenience as possible during class construction/definition, but still stay out of your way if you want it to.
In the same time, if you want to digg about in the guts, Joose lets you do that too, by using and extending its powerful introspection API (aka reflection) 
or by providing your own meta class implementation.</p>
tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '<h1 id="whatisjoose">WHAT IS Joose?</h1>\n\n<p>Joose is a complete modern object system for JavaScript based on concepts from many programming languages such as Ruby, Smalltalk, Perl and, well, JavaScript. \nIt provides "keywords" or "syntactic sugar" for class declaration, object construction, inheritance and more. These keywords feel like they become a part of the language and you don\'t have to care about the implementation details of all these concepts. </p>\n\n<p>With Joose, you can concentrate on the logical structure of your code, focusing on "what" rather than "how". A class definition with Joose reads like a list of very concise English sentences.</p>\n\n<p>Joose provides complete introspection for all Joose-using classes. This means you can ask classes about their attributes, parents, children, methods, etc., all using a well-defined API.</p>\n\n<p>Joose is based in large part on the <a href="http://search.cpan.org/dist/Moose/lib/Moose.pm">Moose</a> system, which in turn borrows a lot of from Perl 6 object system, as well as drawing on the best ideas from CLOS, Smalltalk, and many other languages.</p>\n\n<h1 id="whatjooseisnot">WHAT Joose is not?</h1>\n\n<p>Joose isn\'t a new language or sources preprocessor. The code written in Joose, executes like regular JavaScript, and can be run in any modern JavaScript engine.</p>\n\n<h1 id="whyjoose">WHY Joose?</h1>\n\n<p>Joose makes JavaScript OO both simpler and more powerful. It encapsulates JavaScript power tools in high-level declarative APIs which are easy to use. \nBest of all, you don\'t need to be a wizard to use it. Here\'s the example of Joose class: </p>\n\n<pre><code>Class(\'Person\', {\n\n    methods : {\n        eat : function (food) {\n            console.log(\'yummy\')\n\n            return \'yummy\'\n        }\n    }\n})\n</code></pre>\n\n<p>This is a complete and usable class definition! Another example:</p>\n\n<pre><code>Class(\'Person.Tidy\', {\n    isa : Person,\n\n    before : {\n        eat : function (food) {\n            this.washHands()\n        }\n    },\n\n    after : {\n        eat : function (food) {\n            this.brushTeeth()\n        }\n    },\n\n    methods : {\n\n        washHands : function (food) {\n            console.log(\'washing hands\')\n        },\n\n        brushTeeth : function (food) {\n            console.log(\'brushing teeth\')\n        },\n\n        eat : function (food) {\n            this.SUPER(food)\n        }\n    }\n})\n</code></pre>\n\n<p>Joose makes every attempt to provide as much convenience as possible during class construction/definition, but still stay out of your way if you want it to.\nIn the same time, if you want to digg about in the guts, Joose lets you do that too, by using and extending its powerful introspection API (aka reflection) \nor by providing your own meta class implementation.</p>\n'
        }
    }
    
});
Class('JooseIt.Widget.NotFound', {
    
    use : [ 'nonjoose://Raphael', 'JooseIt.Control.NavigationButton' ],
    
    
    isa             : 'SymbieX.Template.Shotenjin.Container',
    
    does            : 'Symbie.Widget',
    

    have : {
        templateSources         : {
            /*tj
                <div>Sorry, this page is missing</div>
                <div class="jit_nav_button"></div>
            tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '\n                <div>Sorry, this page is missing</div>\n                <div class="jit_nav_button"></div>\n            '
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
    
    
});
Class('JooseIt.Widget.Resources', {
    
    isa : 'SymbieX.Template.Shotenjin.Container',
    
    does : [ 'Symbie.Widget', 'JooseIt.Widget.PageReport' ],

    
    have : {
        pageId                  : 'resources',
        
        autoHeight              : true,
        
        templateSources         : {
            /*tj:../../../content/html/Resources.html
<h1 id="resources">RESOURCES</h1>

<h2 id="documentation">Documentation</h2>

<h3 id="joose2">Joose 2</h3>

<p>Manual &amp; Cookbook: <a href="http://code.google.com/p/joose-js/">http://code.google.com/p/joose-js/</a></p>

<h3 id="joose3">Joose 3</h3>

<p>Manual: <a href="http://openjsan.org/go/?l=Joose.Manual">http://openjsan.org/go/?l=Joose.Manual</a></p>

<p>Cookbook: <a href="http://openjsan.org/go/?l=Joose.Cookbook">http://openjsan.org/go/?l=Joose.Cookbook</a></p>

<h2 id="community">Community</h2>

<p>Mailing list: <a href="http://groups.google.com/group/joose-js">http://groups.google.com/group/joose-js</a></p>

<p>Forum: <a href="http://joose.it/forum">http://joose.it/forum</a></p>

<p>IRC: <a href="http://webchat.freenode.net/?randomnick=1&amp;channels=joose&amp;prompt=1">#joose</a> on freenode </p>

<h2 id="blogs">Blogs</h2>

<p>Malte Ubl: <a href="http://www.nonblocking.io/">http://www.nonblocking.io/</a></p>

<h2 id="coreextensions">Core extensions</h2>

<p>Singleton pattern: <a href="http://openjsan.org/go/?l=JooseX.Class.Singleton">http://openjsan.org/go/?l=JooseX.Class.Singleton</a></p>

<p>Additional features for attributes: <a href="http://openjsan.org/go/?l=JooseX.Attribute">http://openjsan.org/go/?l=JooseX.Attribute</a></p>

<p>Dependencies (browser oriented): <a href="http://openjsan.org/go/?l=JooseX.Namespace.Depended">http://openjsan.org/go/?l=JooseX.Namespace.Depended</a></p>
tj*/

            /* GENERATED BY SHOTENJIN.JOOSED HELPER, DO NOT MODIFY DIRECTLY */
            sources : '<h1 id="resources">RESOURCES</h1>\n\n<h2 id="documentation">Documentation</h2>\n\n<h3 id="joose2">Joose 2</h3>\n\n<p>Manual &amp; Cookbook: <a href="http://code.google.com/p/joose-js/">http://code.google.com/p/joose-js/</a></p>\n\n<h3 id="joose3">Joose 3</h3>\n\n<p>Manual: <a href="http://openjsan.org/go/?l=Joose.Manual">http://openjsan.org/go/?l=Joose.Manual</a></p>\n\n<p>Cookbook: <a href="http://openjsan.org/go/?l=Joose.Cookbook">http://openjsan.org/go/?l=Joose.Cookbook</a></p>\n\n<h2 id="community">Community</h2>\n\n<p>Mailing list: <a href="http://groups.google.com/group/joose-js">http://groups.google.com/group/joose-js</a></p>\n\n<p>Forum: <a href="http://joose.it/forum">http://joose.it/forum</a></p>\n\n<p>IRC: <a href="http://webchat.freenode.net/?randomnick=1&amp;channels=joose&amp;prompt=1">#joose</a> on freenode </p>\n\n<h2 id="blogs">Blogs</h2>\n\n<p>Malte Ubl: <a href="http://www.nonblocking.io/">http://www.nonblocking.io/</a></p>\n\n<h2 id="coreextensions">Core extensions</h2>\n\n<p>Singleton pattern: <a href="http://openjsan.org/go/?l=JooseX.Class.Singleton">http://openjsan.org/go/?l=JooseX.Class.Singleton</a></p>\n\n<p>Additional features for attributes: <a href="http://openjsan.org/go/?l=JooseX.Attribute">http://openjsan.org/go/?l=JooseX.Attribute</a></p>\n\n<p>Dependencies (browser oriented): <a href="http://openjsan.org/go/?l=JooseX.Namespace.Depended">http://openjsan.org/go/?l=JooseX.Namespace.Depended</a></p>\n'
        }
    }
    
});
Class('JooseIt.Router', {
    
    isa : 'Symbie.Router',
    
    does : [ 'SymbieX.History.Router', 'SymbieX.Template.Shotenjin.Router' ],
    
    routes : {
        
        mainLayout : {
            via : function (context, root) {
                var layout = root.findOrCreate('JooseIt.Layout.Site')
                
                layout.slotAndMark('center')
            }
        },
        
        
        home : {
            mapTo : '/home',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Home')
            } 
        },
        
        
        about : {
            mapTo : '/about',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.About')
            } 
        },
        
        
        resources : {
            mapTo : '/resources',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Resources')
            } 
        },
        
        
        download : {
            mapTo : '/download',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('JooseIt.Widget.Download')
            } 
        },
        
        
        index : {
            mapTo : '/',
            
            via : function (context, root) {
                root.collectFrom('home')
            }
        },
        
        
        'default' : {
            mapTo : '/*',
            
            via : function (context, root) {
                root.findOrCreate('JooseIt.Layout.Centered').findOrCreate('JooseIt.Widget.NotFound')
            }
        }
    },
    //eof routes
    
    
    after : {
        initialize : function () {
            this.on('dispatchException', this.onDispatchException, this)
        }
    },
    
    
    methods : {
        
        onDispatchException : function (router, exception) {
            
            Ext.Msg.show({
               title    : 'Error:',
               msg      : exception,
               
               buttons  : Ext.Msg.OK,
               icon     : Ext.MessageBox.ERROR
            })
            
            return false
        }
    },
    
    
    continued : {
    
        override : {
            
            dispatch : function () {
                
                Ext.getBody().mask()
                
                this.SUPERARG(arguments).FINALLY(function () {
                    Ext.getBody().unmask()
                    
                    this.CONTINUE()
                }).NOW()
            }
            
        }
    }
    
})
;
Class('JooseIt.Widget.Root', {
    
    isa : Ext.Container,
    
    does : 'Symbie.Widget.Root',
    
    use : [ 'JooseIt.Router' ],
    
    
    has : {
        routerClass : Joose.I.FutureClass('JooseIt.Router'),
        
        title : 'Joose it!',
        
        layout : 'card',
        
        autoWidth       : true,
        autoHeight      : true
    },
    
    
    after : {
        initComponent : function () {
            this.renderTo = this.el = Ext.getBody()
            
            this.allowDomMove = false
            
            Ext.EventManager.onWindowResize(this.doLayout, this)
        }
    }
    
});
Class('JooseIt.Layout.Centered', {
    
    isa             : 'Symbie.Widget.Container',
    
    use             : [ 'ExtX.Layout.CenterBoth' ],
    

    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'center-both'
            })
        }
        //eof initComponent
    },
    
    
    methods : {
        
        touch : function () {
            Ext.getBody().removeClass('grayed')
        }
    }
    
    
});
Class('JooseIt.Layout.Site', {
    
    isa             : 'Symbie.Widget.Container',
    
    
    use : [ 'JooseIt.Widget.Header', 'JooseIt.Widget.Footer', 'ExtX.Layout.NBSP', 'ExtX.Layout.CenterHorizontally' ],
    
    
    has : {
        slots                   : true,
        
        autoWidth               : true,
        autoHeight              : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                style : 'position : relative',
                
                items : [
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Header',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Header',
                                slot : 'header',
                                
                                width : 990,
                                
                                height : 360
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Center',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'container',
                                slot : 'center',
                                
                                cls : 'JooseIt-Content',
                                
                                layout : 'card'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        cls : 'JooseIt-Content-Footer',
                        
                        items : [
                            {
                                xtype : 'JooseIt.Widget.Footer',
                                
                                cls : 'JooseIt-Content'
                            }
                        ]
                    }
                ]
            })
            
            this.on('currentPage', this.onCurrentPageReport, this)
        }
    },
    
    
    methods : {
        
        onCurrentPageReport : function (page) {
            var header = this.slots.header
            
            header.setActivePage.defer(100, header, [ page.pageId ])
        },
        
        
        touch : function () {
            Ext.getBody().addClass('grayed')
        }
    },
    
    
    after : {
        onRender : function () {
            var wrapper = Ext.get(document.createElement('div'))
            
            wrapper.update('<a href="http://github.com/Joose/Joose" alt="Fork me on GitHub"><div class="JooseIt-GitHub"></div></a>')
            
            this.el.appendChild(wrapper.child('a'))
        }
    }
    
})

;
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

;
