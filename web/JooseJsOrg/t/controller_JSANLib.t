use strict;
use warnings;
use Test::More tests => 3;

BEGIN { use_ok 'Catalyst::Test', 'JooseJsOrg' }
BEGIN { use_ok 'JooseJsOrg::Controller::JSANLib' }

ok( request('/jsanlib')->is_success, 'Request should succeed' );


