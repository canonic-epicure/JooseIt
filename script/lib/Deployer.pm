package Deployer;

use strict;
use warnings;

use FindBin;
use Path::Class;
use JSON;


sub config {
    return JSON->new->relaxed->decode(scalar(file("$FindBin::Bin/config.json")->slurp));
}


sub root {
    my ($self) = @_;
    
    my $root = $self->config->{root};
    
    $root =~ s!/$!!;
    
    return $root;
}

__PACKAGE__