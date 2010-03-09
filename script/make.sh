#======================================================================================================================================================================================
# updating content 

script/build_pages.sh

/usr/local/lib/jsan/bin/shotenjin_embed.pl lib/


#======================================================================================================================================================================================
# copying files 

./Build clean

./Build

cp -f t/visual/index.html blib/index.html


#======================================================================================================================================================================================
# optimizing pngs 

script/optimize_png.pl

script/inline_buttons.pl


#======================================================================================================================================================================================
# concatenating/minimizing js 

script/concat_js.pl

java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/Task/JooseIt.js blib/lib/Task/JooseIt.js 
    
# gzip blib/lib/Task/JooseIt.js


#======================================================================================================================================================================================
# concatenating/minimizing css 

script/concat_css.pl

java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/JooseIt/static/css/concat-all.css blib/lib/JooseIt/static/css/concat-all.css 
    
# gzip blib/lib/Task/JooseIt.js


#======================================================================================================================================================================================
# updating index.html 
    
script/update_index.pl