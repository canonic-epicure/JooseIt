package JooseJsOrg::Controller::JSANLib;

use strict;
use warnings;
use parent 'Catalyst::Controller';


use Module::Build::JSAN;
use Path::Class;



__PACKAGE__->config->{namespace} = 'inc';

__PACKAGE__->config->{JSANLIB} = Module::Build::JSAN::get_jsan_libroot();

#================================================================================================================================================================================================================================================
sub index :Path {
    my ( $self, $c, @captures ) = @_;

    $c->serve_static_file( file(__PACKAGE__->config->{JSANLIB}, 'lib', @captures) ); 
}




=head1 NAME

JooseJsOrg::Controller::JSANLib - Catalyst Controller

=head1 DESCRIPTION

Catalyst Controller.

=head1 METHODS

=cut


=head2 index 

=cut


=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
