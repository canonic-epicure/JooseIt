#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use JSON;
use Path::Class;
use Getopt::LL::Simple qw(
    --skip_png
    --fast
    --skip_min
);

use Deployer;
use CSS::Embedder;
use CSS::MHTMLFrame;


my $fast        = $ARGV{'--fast'};
my $skip_png    = $ARGV{'--skip_png'} || $fast;
my $skip_min    = $ARGV{'--skip_min'} || $fast;


my $build_id = Deployer->save_key('build_id', time);


#======================================================================================================================================================================================
# updating content 

print `script/build_pages.sh`;
print `/usr/local/lib/jsan/bin/shotenjin_embed.pl lib/`;


#======================================================================================================================================================================================
# copying files 

print `./Build clean`;

print `./Build`;

print `cp -f t/visual/index.html blib/index.html`;


#======================================================================================================================================================================================
# optimizing pngs 

print `script/optimize_png.pl` unless $skip_png;

print `script/inline_buttons.pl --libroot lib.$build_id`;


#======================================================================================================================================================================================
# concatenating/minimizing js 

print `script/concat_js.pl`;

print `java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/Task/JooseIt.js blib/lib/Task/JooseIt.js` unless $skip_min; 
    

#======================================================================================================================================================================================
# concatenating/minimizing css 

print `script/concat_css.pl`;

print `java -jar bin/yuicompressor-2.4.2.jar -o blib/lib/JooseIt/static/css/concat-all.css blib/lib/JooseIt/static/css/concat-all.css` unless $skip_min; 
    

#======================================================================================================================================================================================
# updating index.html 
    
print `script/update_index.pl`;