#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use URI;
use Path::Class;
use LWP::Simple;
use File::Path qw(make_path remove_tree);

use Index::HTML;
use Deployer;


#======================================================================================================================================================================================
# getting urls of stylesheets 

my $blib_dir        = dir("$FindBin::Bin/../blib");


my $index           = Index::HTML->new( file => $blib_dir->file('index.html'));

my @styles          = $index->get_styles;


#======================================================================================================================================================================================
# concatenating files 

my $root = Deployer->root;

my $css = "";

foreach my $style (@styles) {
    my $url     = URI->new_abs($style, $root . '/');
    
    $url =~ s/\?.*//;
    next unless $url =~ m/\.css$/;
    
    $css .= get($url) . "\n";
}


#======================================================================================================================================================================================
# writing into /blib/lib/JooseIt/static/css/concat-all.css 


my $task_file       = file($blib_dir, 'lib', 'JooseIt', 'static', 'css', 'concat-all.css');


my $fh = $task_file->openw;

print $fh $css;

$fh->close;

