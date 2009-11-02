Class('JooseJsOrg.Router', {
    
    isa : 'Symbie.Router',
    
    connect : {
        
        '/home' : {
            
            use : [ 'JooseJsOrg.Layout.Site', 'JooseJsOrg.Home' ],
            
            realize : function (route) {
                var params  = route.getParams()
                var root    = route.getRoot()
                
                root.activate('JooseJsOrg.Layout.Site').slot('.center').activate('JooseJsOrg.Home')
            } 
        
        },
        
        
        '/pictures/all/:fromDate/:toDate' : {
            
            use : [ 'JooseJsOrg.Layout.Site', 'JooseJsOrg.Pictures.All' ],
            
            realize : function (route) {
                var params  = route.getParams()
                var root    = route.getRoot()
                
                root.activate('JooseJsOrg.Layout.Site').slot('.center').activate('JooseJsOrg.Pictures.All', {
                    fromDate : params.fromDate,
                    toDate : params.toDate
                })
            }
        }
        
            
//        '/pictures/all/:fromDate/:toDate' :
//            function (route) {
//                var root = context.root
//                
//                var params = context.params
//                
//                root.activate('JooseJsOrg.Layout.Site').slot('center').ensure({
//                    meta : 'JooseJsOrg.Pictures.All',
//                    config : {
//                        registeredOnly : registeredFlag
//                    }
//                })
//                '/JooseJsOrg.Layout.Site/.center/JooseJsOrg.Pictures.All($params)'
//            }
//            
//            
//        router.defaultRoute('/JooseJsOrg.Layout.Site/JooseJsOrg.Home')
//        
////        router.root('/JooseJsOrg.Layout.Site/JooseJsOrg.Home')
//        
//        '/JooseJsOrg.Layout.Site,1.01/.center/JooseJsOrg.Pictures.All,0.02({startDate : "1.1.1"})'
//        '/JooseJsOrg.Layout.Site{1.01}/.center/JooseJsOrg.Pictures.All{0.02}({startDate : "1.1.1"})'
    },
    
    
    root : {
        
        realize : function (route) {
            route.dispatchTo('/home')
        }
    },
    
    
    defaultRoute : {
            
        use : [ 'JooseJsOrg.Layout.Site' ],
        
        realize : function (route) {
            var params  = route.getParams()
            var root    = route.getRoot()
            
            root.activate('JooseJsOrg.Layout.Site').slot('.center').activate('JooseJsOrg.NotFound')
        }
    }
       
})


//declare( 'Symbie::Dispatcher', function (use,checkState,__PACKAGE__) {
//
//    use(['Ext::ux::layout::Coolcard', 'Symbie::LoadMask'], function(use) {
//
//        Symbie.Dispatcher = Ext.apply(new Ext.util.Observable, {
//            
//			dispatch : function (displayPath, c) {
//                c = this.decodeDisplayPath(displayPath,c);
//				
////				if (!c.dispatchResolver) {
//////                    var chain = c.displayChain.shift();
//////					if (/^\./.test(chain.segment)) throw "cant use slot modifier as 1st chain";
//////					
//////					c.dispatchResolver = Ext.getCmp(this.getWidgetId(chain));
////                } else 
//				if (typeof c.dispatchResolver == 'string') {
//                    c.dispatchResolver = Ext.getCmp(c.dispatchResolver);
//                }
//                if (!c.dispatchResolver) throw 'relative displayPath with empty Resolver, displayPath=' + displayPath;        
//
//				var displayChain = c.displayChain.slice();
//                
//                
//				if (!c.disableMasking) Symbie.LoadMask.applyMask(c.dispatchResolver);
//                
//                this.constructDisplayPath(c.dispatchResolver,displayChain,c,function(){
////                    if (!c.disableMasking) Symbie.LoadMask.releaseMask();
//                    
//                    displayChain = c.displayChain.slice();
//                    
//                    this.activateDisplayPath(c.dispatchResolver, displayChain, c, function(){
//                        
//                        Symbie.LoadMask.releaseMask();
//                        
//                        c.callback.call(c.scope);
//                        
//                    }, this);
//                },this);
//        
//                
//            },
//			
//			decodeDisplayPath : function (displayPath, c) {
//				c = c || {};
//                c.callback = c.callback || Ext.emptyFn;
//                c.scope = c.scope || this;
//                
//                //не забываем про c.dispatchResolver        
//                //не забываем про c.dispatchSource
//                //не забываем про c.disableNavigation 
//                //не забываем про c.disableBookmarking
//                //не забываем про c.disableMasking
//                
//                var displayChain = [];
//                
//                if (typeof displayPath == 'string') {
//                    displayPath = [].concat(displayPath);
//                } 
//				
//				if (Ext.isArray(displayPath)){
//					var afterConfig = false;
//					
//					for (var i = 0; i < displayPath.length; i++) {
//						if (typeof displayPath[i] == 'object' && i == 0) throw "Cant use config as 1st value in displayChain";
//						
//						if (typeof displayPath[i] == 'string' && i == 0 && /^\//.test(displayPath[i])) {
//	                        afterConfig = false;
//							
//							if (c.dispatchResolver) throw "Absolute displayPath was used with dispatchResolver defined";
//							
//							displayPath[i] = displayPath[i].replace(/^\//,'');
//	                        c.dispatchResolver = Ext.getCmp('Symbie::Widget::Root');
//							
//							if (!displayPath[i]) continue;
//	                    }
//						
//						if (typeof displayPath[i] == 'object' && afterConfig) {
//							
//							Ext.applyIf(c,displayPath[i]); 
//							
//	                    } else if (typeof displayPath[i] == 'string') {
//							afterConfig = false;
//							
//							var res = this.decodeChunk(displayPath[i]);
//							
//							displayChain = displayChain.concat(res[0]);
//							Ext.applyIf(c,res[1]);
//							 
//						} else if (typeof displayPath[i] == 'object') {
//							afterConfig = true;
//							
//							var has_properties = false;
//							for (var z in displayPath[i]) {
//								has_properties = true;
//								break;
//							}
//							
//							if (has_properties) {
//								var apply_to;
//								for (var j = displayChain.length - 1; j >= 0; j--) {
//									if (!/^\./.test(displayChain[j].segment)) {
//										apply_to = displayChain[j];
//										break;
//									}
//								}
//								if (!apply_to) throw "Cant use config object with only slot modifiers";
//								
//								Ext.apply(apply_to.arguments,displayPath[i]); 
//							}
//						} 
//                    }
//                } else {
//					throw "Cant process displayPath=" + displayPath + " should be array";
//				}
//				
//				if (!displayChain.length) throw ("Empty displayChain for displayPath=" + displayPath);
//				c.displayChain = displayChain;
//				
//				return c;
//			},
//			
//			
//			getHrefForDisplayChain : function (displayChain) {
//				return '/navigate?' + Ext.urlEncode({ displayPath : this.normalizeDisplayChain(displayChain) });
//			},
//			
//			normalizeDisplayChain : function (displayChain) {
//				return this.encodeDisplayPath(this.decodeDisplayPath(displayChain));
//			},
//			
//			
//			encodeDisplayPath : function (c) {
//				if (c.dispatchResolver) {
//					if (typeof c.dispatchResolver == 'string') {
//						c.dispatchResolver = Ext.getCmp(c.dispatchResolver);
//					}
//					
//					c.displayChain = this.buildDisplayChainTo(c.dispatchResolver).concat(c.displayChain); 
//				}
//				
//				var displayPath = ''; 
//				
//				var encodableContextArguments = ['disableNavigation', 'disableBookmarking'];
//				
//				for (var i = 0; i < c.displayChain.length; i++) {
//					displayPath += (displayPath && displayPath != '/') ? '/' : '';
//					displayPath += this.encodeChain(c.displayChain[i]);
//				}
//				
//				var context_arguments = {};
//				for (i = 0; i < encodableContextArguments.length; i++) {
//					if (typeof c[encodableContextArguments[i]] != 'undefined') {
//						context_arguments[encodableContextArguments[i]] = c[encodableContextArguments[i]];
//					}
//				}
//				var str = Ext.urlEncode(context_arguments);
//				displayPath += (str ? '?' + str : '');
//				
//				return displayPath;
//			}, 
//            
//            
//			encodeChain : function (chain) {
//				var args = Ext.urlEncode(chain.arguments);
//				
//				return (chain.segment == 'Symbie::Widget::Root' ? '/' : chain.segment) + (args ? ';' + args : '');
//			},
//			
//			
//			decodeChunk : function (str) {
//				var chains = [];
//				var context_arguments = {}; 
//				
//				str = str.replace(/\/$/,'');
//				str = str.replace(/^\//,'');
//				var chunks = str.split('/');
//				for (var i = 0; i < chunks.length; i++) {
//					var res = this.decodeChain(chunks[i]);
//					
//					chains = chains.concat(res[0]);
//					Ext.apply(context_arguments, res[1]);
//				}
//				
//				return [chains, context_arguments];
//			},
//			
//			
//			decodeChain : function (str) {
//				var chains = [];
//				
//				var chain_arguments = {};
//				var context_arguments = {}; 
//				
//				var args = /(.*?)\;(.*)/.exec(str);                    
//                if (args) {
//					str = args[1];
//					
//					var chain_args = args[2];
//					
//					var args = /(.*?)\?(.*)/.exec(chain_args);                    
//	                if (args) {
//						chain_args = args[1];
//						Ext.apply(context_arguments, Ext.urlDecode(args[2]));
//					}
//					
//					Ext.apply(chain_arguments, Ext.urlDecode(chain_args));
//				} else {
//					var args = /(.*?)\?(.*)/.exec(str);                    
//	                if (args) {
//	                	str = args[1];
//						Ext.apply(context_arguments, Ext.urlDecode(args[2]));
//					}
//				}
//				
//				var seg_with_childs = str.split('.');
//				for (var j = 0; j < seg_with_childs.length; j++) {
//					if (j == 0 && seg_with_childs[j] != '') {
//						chains.push({
//							segment : seg_with_childs[j],
//							arguments : chain_arguments
//						});
//					} else if (j > 0) {
//						chains.push({
//							segment : '.' + seg_with_childs[j],
//							arguments : {}
//						});
//					}
//				}
//				
//				return [chains, context_arguments];
//			},
//			
//			
//			buildDisplayChainTo : function (component) {
//				if (component == Symbie.Widget.Root || !component.ownerCt) {
//					return [ Symbie.Widget.constructWidgetChain(component) ]; 
//				} else {
//					var parent_widget = component.__SLOT__ ? component.__COLLECTOR__ : component.ownerCt;
//					return Symbie.Dispatcher.buildDisplayChainTo(parent_widget).concat(Symbie.Widget.constructWidgetChain(component));
//				}
//			},
//			
//			
//            getWidgetId : function (chain) {
//				var widget_class;
//				
//				try {
//		            widget_class = eval(chain.segment.replace(/::/g,'.'));
//					if (typeof widget_class != 'function') {
//						return widget_class.id;
//					} 
//		        }
//		        catch(e) {
//					return '';
//				}
//				
//				return Symbie.Widget.constructWidgetId( chain.segment, widget_class.prototype.ID, chain.arguments );
//            },
//            
//            
//            isPackageLoaded : function (packageName) {
//				try {
//		            return eval(packageName.replace(/::/g,'.'));
//		        }
//		        catch(e) {
//					return false;
//				}
//            },
//
//            
//            constructDisplayPath : function (resolver, displayChain, c, callback, scope) {
//                callback = callback || Ext.emptyFn;
//                
//                var chain = displayChain.shift();
//				var widgetId, packageName;
//				
//                if (/^\./.test(chain.segment)) {
//					packageName = 'Symbie::Widget::Root';
//				} else {
//                	packageName = chain.segment;
//				}
//                
////				if (!this.isPackageLoaded(packageName) && !c.disableMasking) {
////					Symbie.LoadMask.applyMask(resolver);
////				}
//				
//                use(packageName, function(){
//                    var widget;
//					
//					if (/^\./.test(chain.segment)) {
//						if (!resolver.slots) throw "Resolver doesnt has slots defined";
//						widget = resolver.slots[chain.segment.replace(/^\./,'')];
//						if (!widget) throw "slot " + chain.segment + "is empty";
//						widgetId = widget.id;
//					} else {
//	                	widgetId = this.getWidgetId(chain);
//						widget = Ext.getCmp(widgetId);
//					}
//                    
//                    if (!widget) {
//						var widget_class = eval(chain.segment.replace(/::/g,'.'));
//						if (!widget_class) throw "Widget class not found, segment=" + chain.segment + " widgetId=" + widgetId;
//						var auth_req = typeof widget_class == 'function' ? widget_class.prototype.authorizationRequired : widget_class.constructor.prototype.authorizationRequired;
//						
//						if (auth_req && !Symbie.Authentication.user_exists()) {
//                            displayChain.unshift(chain);
//                            
//                            this.subscribe('follow_authenticated',function () {                                    
//                                this.constructDisplayPath(resolver, displayChain, c, callback, scope);
//								
//								//sign, that this event was processed, needed for registration window
//								return false;
//                            }, this, { single: true } );
//                            
//                            this.dispatch('/SymbieOrg::Auth::LoginOrRegister.login', { 
//                            	dispatchSource : c.dispatchSource, 
//                            	disableMasking : true,
//                            	disableNavigation : true,
//                            	disableBookmarking : true
//                            });
//                            
//                            return;
//                        } else {
//							
//                            if (typeof widget_class == 'function') {
//								
//								var config = {};
//								Ext.apply(config, chain.arguments);
//
//								if (widget_class.prototype.PREFETCH) {
//									
//									var handlerReady = Symbie.DataManager.isReady(widget_class.prototype.PREFETCH, { widgetParams : config });
//									if (!handlerReady) {
////										Symbie.LoadMask.applyMask(resolver);
//										
//			                            displayChain.unshift(chain);
//			                            
//			                            Symbie.DataManager.prefetch(widget_class.prototype.PREFETCH, { 
//			                            	widgetParams : config,
//			                            	callback : function (handler) {                                    
//												this.constructDisplayPath(resolver, displayChain, c, callback, scope);
////												return false;
//				                            },
//				                            scope : this
//			                            });
//			                            
//			                            return;
//									} 
////									else {
////										config.DATA = handlerReady.DATA;
////										config.STORE = handlerReady.STORE;
////									} 
//								}
//
//								//deprecated feature								
////								if (widget_class.prototype.prefetch) Symbie.LoadMask.applyMask(resolver);
//								
//								widget = new widget_class(config);
//							} else {
//								widget = widget_class;
//							}
//                        }
//                    }
//                    
//                    if (!widget.rendered) {
//                        var wrp = Ext.DomHelper.append(resolver.getEl(),{ tag : 'div', id : widgetId + '_wrp' },true);
//                        
//                        resolver.add(widget);
//						widget.applyToMarkup(wrp);                        
//	                    widget.doLayout();
////	                    resolver.doLayout();
//                    }
////                    widget.doLayout();
////                    resolver.doLayout();
//                    
//                    
//                    if (displayChain.length) {
//                        this.constructDisplayPath(widget,displayChain, c, callback, scope);
//                    } else {
//                        callback.call(scope || window);
//                    }
//                    
//                },this); //eof use
//            },
//            
//            
//            activateDisplayPath : function (resolver, displayChain, c, callback, scope) {
//                callback = callback || Ext.emptyFn;        
//        
//                var chain = displayChain.shift();
//				var widget,widgetId;
//				
//                if (/^\./.test(chain.segment)) {
//					widget = resolver.slots[chain.segment.replace(/^\./,'')];
//					widgetId = widget.id;
//				} else {
//					widgetId = this.getWidgetId(chain);
//                	widget = Ext.getCmp(widgetId);
//				}
//                
//                this.activateChild(resolver, widget, c, !displayChain.length);
//                
//                if (displayChain.length) {
//                    this.activateDisplayPath(widget, displayChain, c, callback, scope)
//                } else {
//                    callback.call(scope || window);
//                }
//                
//            },
//            
//            
//            activateChild : function (parentCmp, childCmp, c, lastInChain) {
//                
//				if (parentCmp.getComponent(childCmp.id)) {
//				
//					if ( childCmp instanceof Ext.Window ) {
//	                    childCmp.show(Ext.get(c.dispatchSource));
////	                    childCmp.doLayout();
//	                    if (lastInChain) this.onLastActivate(parentCmp, childCmp, c);
//	                } /*else if (parentCmp instanceof Ext.TabPanel) {
//	                	childCmp.show();
//	                	if (lastInChain) this.onLastActivate(parentCmp, childCmp, c);
//	                }*/ else {                    
//	                    var layout = parentCmp.getLayout();
//	                    
//	                    if ( (layout instanceof Ext.layout.CardLayout) || (layout instanceof Ext.ux.layout.Coolcard) ) {
//	                        
//	                        if (layout.activeItem != childCmp) {
//	                            
//	                            layout.setActiveItem(childCmp);                    
//
//	                            if (lastInChain) this.onLastActivate(parentCmp, childCmp, c);
//	                            
//	                        } else if (lastInChain) {
//	                            childCmp.getEl().frame("999966", 1, { duration: 0.8 });
//	                            //widgetCmp.getEl().highlight();
//	                        }                
//	                    }
//	                }
//				} else {
////					XXX activate if indirect child?
//				}
//            },
//            
//            
//            onLastActivate : function (parentCmp, childCmp, c) {
//                
//                if (typeof childCmp.displayName == 'function') {
//                	docTitle = I18n.site.title_prefix + childCmp.displayName();
//                } else if (childCmp.displayName) {
//                	docTitle = I18n.site.title_prefix + childCmp.displayName;
//                } else {
//                	docTitle = I18n.site.default_title;
//                }
//                
//                document.title = docTitle;
//                
//                if (!c.disableNavigation && !childCmp.disableNavigation) {
//                    this.publish('navigate',childCmp,c);
//                }
//        
//                if (!c.disableBookmarking && !childCmp.disableBookmarking) {
//                    this.publish('bookmark',childCmp,c);
//                }
//                
//                this.publish('dispatch', childCmp, c);
//            },
//            
//            
//            onAClick : function (dom, event) {
//                if (event.preventDefault) {
//                    event.preventDefault();
//                    event.stopPropagation();
//                } else {
//                    event.returnValue = false;
//                    event.cancelBubble = true;
//                }
//                
//                var c = /(.*?)\?(.*)/.exec(dom.href);                    
//				c = Ext.urlDecode(c[2]);
//				var displayPath = c.displayPath;
//				delete c.displayPath;
//				
//				c.dispatchSource = dom;
//                
//                this.dispatch(displayPath, c);
//            },
//            
////            findContainerFor : function (dom) {
////                
////                var containMe = Symbie.Widget.Root.findBy(function (comp, container) {
////                    return comp.getEl() ? comp.getEl().contains(dom) : false;
////                });
////                
////                if (containMe.length) return containMe.pop();        
////                
////                return undefined;
////            }
//            
//            onPrepareDisauthenticated : function (){
//            	Symbie.Dispatcher.dispatch('/SymbieOrg::MainLayout.center/SymbieOrg::Home', {
//            		scope : this,
//            		callback : function (){
//            			this.disauthHomeDispatched = true;
//            			
//            			this.removeAuthorizedComponents();
//            		}
//            	})
//            },
//            
//            
//            onDisauthenticated : function (){
//            	this.disauthDisauthed = true;
//            	
//            	this.removeAuthorizedComponents();
//            },
//            
//            
//            removeAuthorizedComponents : function () {
//            	if (this.disauthHomeDispatched && this.disauthDisauthed) {
//	    			this.disauthHomeDispatched = this.disauthDisauthed = false;
//	    			
//	    			var removeProtectedChild = function (cont){
//	    				if (cont instanceof Ext.Container && cont.items) {
//	    					var for_destroy = [];
//	    					
//	    					for (var i = 0; i < cont.items.getCount(); i++) {
//	    						var comp = cont.items.itemAt(i);
//	    						if (comp.authorizationRequired) for_destroy.push(comp);
//	    					}
//	    					
//	    					for (var i = 0; i < for_destroy.length; i++) {
//	    						cont.remove(for_destroy[i]);
//	    					}
//	    					
//	    				}
//	    				
//	    				return true;
//	    			}	    			
//	    			Symbie.Widget.Root.cascade(removeProtectedChild);
//	    			
////	    			this.__removeAuthorizedComponents(Symbie.Widget.Root);
//	    			
//	    			Symbie.Widget.Root.doLayout();
//            	}
//            }
//            
////            __removeAuthorizedComponents : function (cont) {
////            	var i = 0;
////            	
////            	if (cont.items) {
////	            	while ( i < cont.items.getCount() ) {
////	            		var comp = cont.items.itemAt(i);
////	            		if (comp.authorizationRequired) {
////	            			comp.destroy();
////	            		} else {
////	            			this.__removeAuthorizedComponents(comp);
////	            			i++;
////	            		}
////	            	}
////            	}
////            }
//            
//            
//            
//        }); //eof apply
//        
//        Symbie.Dispatcher.subscribe('prepare_disauthenticated', Symbie.Dispatcher.onPrepareDisauthenticated, Symbie.Dispatcher);
//        Symbie.Dispatcher.subscribe('disauthenticated', Symbie.Dispatcher.onDisauthenticated, Symbie.Dispatcher);
//        
//        Symbie.Dispatcher.subscribe('login_close',function () {                                    
//            if (this.hasSubscription('follow_authenticated')) {
//            	Symbie.LoadMask.releaseMask();
//            	this.removeSubscriptionsFor('follow_authenticated');
//            }
//        }, Symbie.Dispatcher);
//        
//		Symbie.dispatch = Symbie.Dispatcher.dispatch.createDelegate(Symbie.Dispatcher);
//        
//    }); //eof use
//    
//}); //eof declare