use lib "$ENV{HOME}/Workspace/EclipseWorkspace/JSAN/module-build-jsan/lib";

use Module::Build::JSAN;

my $build = Module::Build::JSAN->new(

	module_name    => 'Symbie',
	create_makefile_pl => 'passthrough',
	dist_version   => 0.01,
	dist_author   => 'SamuraiJack',
	dist_abstract  => 'Framework for web-applications which looks like web-sites',
	license        => 'perl'
);

$build->create_build_script;


