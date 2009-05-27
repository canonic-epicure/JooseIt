package JooseJsOrg;

use strict;
use warnings;

use Catalyst::Runtime '5.70';

use parent qw/Catalyst/;

use Catalyst qw/
    -Debug
    ConfigLoader
    Static::Simple
/;


our $VERSION = '0.01';

__PACKAGE__->config(
 
    name => 'JooseJsOrg',
    
    default_view => 'View::JSON',
    
    'View::TT' => {
        CATALYST_VAR => 'Catalyst',
        INCLUDE_PATH => [        
            __PACKAGE__->path_to( 'root', 'tt' )
        ],
    },
    
    'View::JSON' => {      
        expose_stash => qr/^(?:js_|metaData)/
    }
    
);

# Start the application
__PACKAGE__->setup();



# Set flags and add plugins for the application
#
#         -Debug: activates the debug mode for very useful log messages
#   ConfigLoader: will load the configuration from a Config::General file in the
#                 application's home directory
# Static::Simple: will serve static files from the application's root 
#                 directory

# Configure the application. 
#
# Note that settings in joosejsorg.conf (or other external
# configuration file that you set up manually) take precedence
# over this when using ConfigLoader. Thus configuration
# details given here can function as a default configuration,
# with a external configuration file acting as an override for
# local deployment.



=head1 NAME

JooseJsOrg - Catalyst based application

=head1 SYNOPSIS

    script/joosejsorg_server.pl

=head1 DESCRIPTION

[enter your description here]

=head1 SEE ALSO

L<JooseJsOrg::Controller::Root>, L<Catalyst>

=head1 AUTHOR

SamuraiJack

=head1 LICENSE

This library is free software, you can redistribute it and/or modify
it under the same terms as Perl itself.

=cut

1;
