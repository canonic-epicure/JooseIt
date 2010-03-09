#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use JSON;
use Path::Class;
use Getopt::LL::Simple qw(
    --mhtmlroot=s
);

use Deployer;
use CSS::Embedder;
use CSS::MHTMLFrame;

my $root = Deployer->root;


my $mhtml_root = $ARGV{'--mhtmlroot'} || '$root/lib/JooseIt/static/images/navigation/buttons.txt';



my $embedder = CSS::Embedder->new;


my $blib_dir        = dir("$FindBin::Bin/../blib");
my $buttons_dir     = $blib_dir->subdir("lib/JooseIt/static/images/navigation");

my $buttons = [ 'about', 'download', 'forum', 'home', 'resources', 'go-back' ];


#======================================================================================================================================================================================
# generating mhtml frame

my $frame = CSS::MHTMLFrame->new(embedder => $embedder);

foreach my $button (@$buttons) {
    my $button_file         = $buttons_dir->file($button . ".png");
    my $button_color_file   = $buttons_dir->file($button . "-color.png");
    
    $frame->add_image($button_file);
    $frame->add_image($button_color_file);
}



my $fh = $blib_dir->file("lib/JooseIt/static/images/navigation/buttons.txt")->openw;

print $fh $frame->as_string;

$fh->close;


#======================================================================================================================================================================================
# generating data uris and JSON structure for app

my $buttons_uris = {};

foreach my $button (@$buttons) {
    my $button_file         = $buttons_dir->file($button . ".png");
    my $button_color_file   = $buttons_dir->file($button . "-color.png");
    
    
    $buttons_uris->{MHTML}->{$button} = {
        src         => "mhtml:$mhtml_root!" . $button_file->basename,
        activeSrc   => "mhtml:$mhtml_root!" . $button_color_file->basename
    };
    
    $buttons_uris->{DATAURI}->{$button} = {
        src         => $embedder->get_data_uri_for($button_file),
        activeSrc   => $embedder->get_data_uri_for($button_color_file)
    }
}


my $json = JSON->new->pretty;


$fh = $blib_dir->file("lib/JooseIt/static/images/navigation/buttons.js")->openw;

print $fh "JOOSE_IT_BUTTONS = " . $json->encode($buttons_uris);

$fh->close;


