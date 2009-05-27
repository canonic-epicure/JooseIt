package JooseJsOrg::Controller::Root;

use strict;
use warnings;
use parent 'Catalyst::Controller';

#
# Sets the actions in this controller to be registered with no prefix
# so they function identically to actions created in MyApp.pm
#
__PACKAGE__->config->{namespace} = '';


#================================================================================================================================================================================================================================================
sub index :Path :Args(0) {
    my ( $self, $c ) = @_;

#    $c->stash->{displayPath} = $c->req->parameters->{displayPath};

    $c->stash->{template} = 'seed.tt2';
    $c->detach('View::TT');
}



#================================================================================================================================================================================================================================================
sub default :Path {
    my ( $self, $c ) = @_;

    $c->response->body( 'Page not found' );
    $c->response->status(404);
}



#================================================================================================================================================================================================================================================
sub end : ActionClass('RenderView') {}


=head1 NAME

JooseJsOrg::Controller::Root - Root Controller for JooseJsOrg

=head1 DESCRIPTION

[enter your description here]

=head1 METHODS

=cut

=head2 index

=cut


=head2 end

Attempt to render a view, if needed.

=cut 


=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
