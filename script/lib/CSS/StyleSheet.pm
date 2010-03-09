package CSS::StyleSheet;

use Moose;

use Path::Class;


has 'embedder' => (
    is => 'rw',
    
    required => 1
);


has 'filename' => (
    is => 'rw',
     
    required => 1
);


has 'content' => (
    is => 'rw'
);


sub BUILD {
    my ($self) = @_;
    
    $self->content(scalar(file($self->filename)->slurp));
}


sub save {
    my ($self, $filename) = @_;
    
    my $file = file($filename || $self->filename);
    
    
    my $fh = $file->openw;
    
    print $fh $self->content;
    
    $fh->close;
}


sub get_background_images_urls {
    my ($self) = @_;
    
    my @scripts     = $self->content =~ m!background-image\s*:\s*url\(["']?(.+?)["']?\)!g;
    
    return @scripts;
}


sub replace_image_with_data_uri {
    my ($self, $url) = @_;
    
    my $image_file  = file($url)->absolute($self->filename);
#    print "$url\n";
    
    my $data_uri    = $self->embedder->get_data_uri_for($image_file);
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!background-image\s*:\s*url\(["']?$url["']?\)!background-image : url($data_uri)!i;
    
    $self->content($content);
    
    return $self;
}


__PACKAGE__