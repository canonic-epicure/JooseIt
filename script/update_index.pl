#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use Path::Class;
use Deployer;
use Index::HTML;


my $blib_dir        = dir("$FindBin::Bin/../blib");

my $index           = Index::HTML->new({ 
    file => $blib_dir->file('index.html')
});


#======================================================================================================================================================================================
# taking the build time 

my $now = time;


#======================================================================================================================================================================================
# extracting urls of all scripts and styles

my @scripts     = $index->get_scripts;
my @styles      = $index->get_styles;


#======================================================================================================================================================================================
# replacing first script with concatenated one and removing others

`cp blib/lib/Task/JooseIt.js blib/lib/Task/JooseIt.$now.js`;
# `gzip -n -9 blib/lib/Task/JooseIt.$now.js`;

$index->replace_script(shift @scripts, "lib/Task/JooseIt.$now.js");

foreach (@scripts) {
    $index->remove_script($_);
}


#======================================================================================================================================================================================
# replacing first stylesheet link with concatenated one and removing others

`cp blib/lib/JooseIt/static/css/concat-all.css blib/lib/JooseIt/static/css/concat-all.$now.css`;
# `gzip -n -9 blib/lib/JooseIt/static/css/concat-all.$now.css`;

$index->replace_stylesheet(shift @styles, "lib/JooseIt/static/css/concat-all.$now.css");

foreach (@styles) {
    $index->remove_stylesheet($_);
}


#======================================================================================================================================================================================
# writing result


my $fh = $blib_dir->file("index.html")->openw;

print $fh $index->content;

$fh->close;
