#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use Path::Class;
use Deployer;
use Index::HTML;


`cp -f t/visual/index.html blib/index.html`;



my $blib_dir        = dir("$FindBin::Bin/../blib");

my $index           = Index::HTML->new({ 
    filename => $blib_dir->file('index.html')
});


#======================================================================================================================================================================================
# taking the build time 

my $now = Deployer->config->{ build_id };


#======================================================================================================================================================================================
# extracting urls of all scripts and styles

my @scripts     = $index->get_scripts(1);
my @styles      = $index->get_styles(1);


#======================================================================================================================================================================================
# replacing first script with concatenated one and removing others


$index->replace_script(shift @scripts, "lib.$now/Task/JooseIt.js");

foreach (@scripts) {
    $index->remove_script($_);
}


#======================================================================================================================================================================================
# replacing first stylesheet link with concatenated one and removing others


$index->replace_stylesheet(shift @styles, "lib.$now/JooseIt/static/css/concat-all.css");

foreach (@styles) {
    $index->remove_stylesheet($_);
}

#======================================================================================================================================================================================
# creating new lib

`mv blib/lib blib/lib.$now`;

my $content = $index->content;

$content =~ s!\[ '/jsan', 'lib' \]![ 'lib.$now', '/jsan' ]!;

$content =~ s!lib/JooseIt/static/images/navigation/buttons.ie.js!lib.$now/JooseIt/static/images/navigation/buttons.ie.js!;
$content =~ s!lib/JooseIt/static/images/navigation/buttons.nonie.js!lib.$now/JooseIt/static/images/navigation/buttons.nonie.js!;

$index->content($content);


#======================================================================================================================================================================================
# writing result

$index->save();

