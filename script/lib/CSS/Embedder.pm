package CSS::Embedder;

use Moose;


use Path::Class;
use MIME::Base64;
use MIME::Types;


use CSS::Embedder::MHTMLFrame;


has 'mime' => (
    is => 'rw',
     
    default => sub {
        return MIME::Types->new(only_complete => 1);
    }
);


sub get_base64_content_for {
    my ($self, $file_name) = @_;
    
    my $file = file($file_name);
    
    if ($file->stat->size > 32*1024) {
        die "File [$file_name] is more than 32Kb in size, not supported by IE8\n";
    }
    
    my $content = encode_base64(scalar( $file->slurp ));
    
    # encode_base64 outputs the result splitted in nice 60-symbols lines
    $content =~ s/\n//g;
    
    return $content;
}


sub get_data_uri_for {
    my ($self, $file_name) = @_;
    
    return "data:" . $self->mime->mimeTypeOf($file_name)->type . ";base64," . $self->get_base64_content_for($file_name);
}


__PACKAGE__