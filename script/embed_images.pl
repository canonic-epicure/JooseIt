#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use File::Find::Rule;
use Path::Class;
use Deployer;
use CSS::Embedder;
use CSS::StyleSheet;


my $blib_dir        = dir("$FindBin::Bin/../blib");
my $css_dir         = $blib_dir->subdir('lib', 'JooseIt', 'static', 'css');


my $embedder        = CSS::Embedder->new();


my @css_files = File::Find::Rule->or(
    File::Find::Rule->file->name('*.css')
)->in($css_dir);


$, = "\n";

foreach my $file (@css_files) {
    
    my $stylesheet = CSS::StyleSheet->new({
        filename        => $file,
        embedder        => $embedder
    });
    
    my @background_urls     = $stylesheet->get_background_images_urls;
    
    print @background_urls;
    
    
    foreach my $url (@background_urls) {
        $stylesheet->replace_image_with_data_uri($url);
    }
    
    $stylesheet->save();
}




