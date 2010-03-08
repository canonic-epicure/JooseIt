package Index::HTML;

use Moose;


use Path::Class;



has 'file' => (
    is => 'rw',
     
    required => 1
);

has 'content' => (
    is => 'rw'
);


sub BUILD {
    my ($self) = @_;
    
    
    $self->content(scalar($self->file->slurp));
}


sub get_scripts {
    my ($self) = @_;
    
    my @scripts     = $self->content =~ m!<script\s+.*?src=["'](.+)["'].*?>!ig;
    
    return @scripts;
}


sub get_styles {
    my ($self) = @_;
    
    my @styles      = $self->content =~ m!<link\s+.*?href=["'](.+)["'].*?>!ig;
    
    return @styles;
}


sub remove_script {
    my ($self, $url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!^\s*<script\s+.*?src=["']$url["'].*?>(</script>(\s*\n)?)?!!im;
    
    $self->content($content);
    
    return $self;
}


sub replace_script {
    my ($self, $url, $new_url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!<script\s+.*?src=["']$url["'].*?>(</script>(\s*\n)?)?!<script type="text/javascript" src="$new_url">$1!i;
    
    $self->content($content);
    
    return $self;
}


sub remove_stylesheet {
    my ($self, $url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!^\s*<link\s+.*?href=["']$url["'].*?>!!im;
    
    $self->content($content);
    
    return $self;
}


sub replace_stylesheet {
    my ($self, $url, $new_url) = @_;
    
    
    my $content     = $self->content;
    $url            = quotemeta $url;
    
    $content =~ s!<link\s+.*?href=["']$url["'].*?>!<link rel="stylesheet" type="text/css" href="$new_url">!i;
    
    $self->content($content);
    
    return $self;
}


__PACKAGE__