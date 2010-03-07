#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";


use Path::Class;
use LWP::Simple;
use File::Path qw(make_path remove_tree);


#======================================================================================================================================================================================
# filtering urls 

`cat $FindBin::Bin/components.txt | grep http: > $FindBin::Bin/components.urls.txt`;

my $components = file("$FindBin::Bin/components.urls.txt")->slurp; 



#======================================================================================================================================================================================
# concatenating files 

my $js = "";

foreach my $url (split "\n", $components) {
    next unless $url;
    
    $url =~ s/\?.*//;
    
    next unless $url =~ m/\.js$/;
    
    my $component = get($url) || "";
    
    $js .= "\n;\n" . $component;
}


#======================================================================================================================================================================================
# writing into /blib 

my $blib_dir        = dir("$FindBin::Bin/../blib");

my $task_file       = file($blib_dir, 'lib', 'Task', 'JooseIt.js');

make_path($task_file->dir . "");


my $fh = $task_file->openw;

print $fh $js;

$fh->close;


