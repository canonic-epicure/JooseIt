package CSS::Embedder::MHTMLFrame;

use Moose;

use Path::Class;


has 'embedder' => (
    is => 'rw',
    
    required => 1
);


has 'images' => (
    is => 'rw',
     
    default => sub { [] }
);


has 'separator' => (
    is => 'rw',
    
    default => sub { 'IMAGE' }
);


sub add_image {
    my ($self, $file_name) = @_;
    
    push @{$self->images}, $file_name;
}


sub as_string {
    my ($self) = @_;
    
    my $separator   = $self->separator;
    my @images      = @{$self->images};
    
    my $content = "Content-Type: multipart/alternative; boundary=\"$separator\"\n\n";
    
    foreach my $image_file (@images) {
        $content .= '--' . $separator . "\n";
        $content .= "Content-Location:" . file($image_file)->basename . "\n";
        $content .= "Content-Transfer-Encoding:base64" . "\n\n";
        
        $content .= $self->embedder->get_base64_content_for($image_file) . "\n";
    }
    
    if (@images) {
        $content .= "\n";
        $content .= '--' . $separator . '--' . "\n";
    }
    
    return $content;
}


__PACKAGE__