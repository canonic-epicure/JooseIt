#!/usr/bin/perl

use strict;
use warnings;

use FindBin;
use lib "$FindBin::Bin/lib";

use Path::Class;


use CSS::Embedder;

my $embedder = CSS::Embedder->new;


my $buttons_dir = dir("$FindBin::Bin/../blib/lib/JooseIt/static/images/navigation");

my $buttons = [ 'about', 'download', 'forum', 'home', 'resources', 'go-back' ];


foreach my $button (@$buttons) {
    my $button_file         = $buttons_dir->file($button . ".png");
    my $button_color_file   = $buttons_dir->file($button . "-color.png");
    
    
    $embedder->add_image($button_file);
    $embedder->add_image($button_color_file);
}


my $buttons_txt_file = file("$FindBin::Bin/../blib/lib/JooseIt/static/buttons.txt");

my $fh = $buttons_txt_file->openw;

print $fh $embedder->mhtml_as_string;

$fh->close;



__END__

ROOT=http://catalyst-dev/JavaScript/JooseIt/blib/lib/JooseIt/static/css/buttons.css
CSS_FILE=blib/lib/JooseIt/static/css/buttons.css


chmod 664 $CSS_FILE

java -jar bin/cssembed-0.3.2.jar --mhtml --mhtmlroot $ROOT $CSS_FILE > $CSS_FILE.mhtml

mv $CSS_FILE.mhtml $CSS_FILE